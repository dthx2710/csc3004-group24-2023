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
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	flag.Parse()
	defer glog.Flush()

	fmt.Printf("Starting HTTP/1.1 gateway on port 8080")
	// Start HTTP server (and proxy calls to gRPC server endpoint)
	if err := Run(":8080"); err != nil {
		glog.Fatal(err)
	}
}

type UserServer struct {
	gw.UnimplementedUserServer
}

func newGateway(ctx context.Context, opts ...runtime.ServeMuxOption) (http.Handler, error) {
	userEndpoint := flag.String("user_endpoint", os.Getenv("USER_SERVICE_URL"), "endpoint of User Service")
	pollEndpoint := flag.String("poll_endpoint", os.Getenv("POLL_SERVICE_URL"), "endpoint of Poll Service")
	resultEndpoint := flag.String("result_endpoint", os.Getenv("RESULT_SERVICE_URL"), "endpoint of Result Service")
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
