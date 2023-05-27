protoc:
	protoc -I ../../proto \
	--go_out proto \
	--go_opt paths=source_relative \
	--go-grpc_out proto \
	--go-grpc_opt paths=source_relative \
	--grpc-gateway_out proto \
	--grpc-gateway_opt paths=source_relative \
	--grpc-gateway_opt logtostderr=true \
	--grpc-gateway_opt generate_unbound_methods=true \
	../../proto/*_gw.proto

protoc-gateway-only:
	protoc -I ../../proto \
	--grpc-gateway_out proto \
	--grpc-gateway_opt paths=source_relative \
	--grpc-gateway_opt logtostderr=true \
	--grpc-gateway_opt generate_unbound_methods=true \
	../../proto/*_gw.proto

clean-proto:
	rm proto/*.go

install-gateway:
	$ go install \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 \
    google.golang.org/protobuf/cmd/protoc-gen-go \
    google.golang.org/grpc/cmd/protoc-gen-go-grpc

install-google-api-annotations:
	mkdir -p proto/google/api
	curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto -o proto/google/api/annotations.proto
	curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/field_behavior.proto -o proto/google/api/field_behavior.proto
	curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto -o proto/google/api/http.proto
	curl https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/httpbody.proto -o proto/google/api/httpbody.proto

run:
	go run .

build:
	go build -o ../dist/gateway

clean-modules:
	rm -rf go.mod go.sum

clean-dist:
	rm -rf ../dist/gateway

tidy:
	go mod tidy

