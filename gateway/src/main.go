package main

import (
	"context"
	gw "csc3004-group24-2023/gateway/proto"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/golang/glog"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	flag.Parse()
	defer glog.Flush()

	// Use environment variables to retrieve the hostname and port
	host, ok := os.LookupEnv("GATEWAY_HOST")
	if !ok {
		host = "0.0.0.0" // Default value if GATEWAY_HOST environment variable is not set
	}

	port, ok := os.LookupEnv("GATEWAY_PORT")
	if !ok {
		port = "8080" // Default value if GATEWAY_PORT environment variable is not set
	}

	addr := host + ":" + port

	fmt.Printf("Starting HTTP/1.1 gateway on port " + port)
	// Start HTTP server (and proxy calls to gRPC server endpoint)
	if err := Run(addr); err != nil {
		glog.Fatal(err)
	}
}

func newGateway(ctx context.Context, opts ...runtime.ServeMuxOption) (http.Handler, error) {
	user_service_url, ok := os.LookupEnv("USER_SERVICE_URL")
	if !ok {
		user_service_url = "localhost:50051"
	}
	poll_service_url, ok := os.LookupEnv("POLL_SERVICE_URL")
	if !ok {
		poll_service_url = "localhost:50052"
	}
	result_service_url, ok := os.LookupEnv("RESULT_SERVICE_URL")
	if !ok {
		result_service_url = "localhost:50053"
	}
	vote_service_url, ok := os.LookupEnv("VOTE_SERVICE_URL")
	if !ok {
		vote_service_url = "localhost:50054"
	}

	userEndpoint := flag.String("user_endpoint", user_service_url, "endpoint of User Service")
	pollEndpoint := flag.String("poll_endpoint", poll_service_url, "endpoint of Poll Service")
	resultEndpoint := flag.String("result_endpoint", result_service_url, "endpoint of Result Service")
	voteEndpoint := flag.String("vote_endpoint", vote_service_url, "endpoint of Vote Service")
	mux := runtime.NewServeMux(opts...)
	dialOpts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	err := gw.RegisterUserHandlerFromEndpoint(ctx, mux, *userEndpoint, dialOpts) // register user service
	if err != nil {
		return nil, err
	}
	err = gw.RegisterPollHandlerFromEndpoint(ctx, mux, *pollEndpoint, dialOpts) // register poll service
	if err != nil {
		return nil, err
	}
	err = gw.RegisterResultHandlerFromEndpoint(ctx, mux, *resultEndpoint, dialOpts) // register result service
	if err != nil {
		return nil, err
	}
	err = gw.RegisterVoteHandlerFromEndpoint(ctx, mux, *voteEndpoint, dialOpts) // register vote service
	if err != nil {
		return nil, err
	}
	return mux, nil
}

// allowCORS allows Cross Origin Resoruce Sharing from any origin.
// Don't do this without consideration in production systems.
func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

func preflightHandler(w http.ResponseWriter, r *http.Request) {
	headers := []string{"Content-Type", "Accept"}
	w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
	methods := []string{"GET", "HEAD", "POST", "PUT", "DELETE"}
	w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
	glog.Infof("preflight request for %s", r.URL.Path)
	return
}

// Run starts a HTTP server and blocks forever if successful.
func Run(address string, opts ...runtime.ServeMuxOption) error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := http.NewServeMux()

	gw, err := newGateway(ctx, opts...)
	if err != nil {
		log.Fatalf("Failed to register gateway: %v", err)
		return err
	}
	mux.Handle("/", gw)

	return http.ListenAndServe(address, allowCORS(mux))
}
