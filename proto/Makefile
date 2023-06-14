protoc-all:
	# gateway
	protoc -I ./ \
	--go_out ../gateway/src/proto/ \
	--go_opt paths=source_relative \
	--go-grpc_out ../gateway/src/proto/ \
	--go-grpc_opt paths=source_relative \
	--grpc-gateway_out ../gateway/src/proto/ \
	--grpc-gateway_opt paths=source_relative \
	--grpc-gateway_opt logtostderr=true \
	--grpc-gateway_opt generate_unbound_methods=true \
	./*_gw.proto

	# types
	protoc -I ./ \
	--go_out ../gateway/src/proto/ \
	--go_opt paths=source_relative \
	--go-grpc_out ../gateway/src/proto/ \
	--go-grpc_opt paths=source_relative \
	 ./types.proto

	# user-service
	cp user-service.proto ../user-service/proto/
	cp ../proto/types.proto ../user-service/proto/

	# result-service
	cp result-service.proto ../result-service/proto/
	cp types.proto ../result-service/proto/

	# poll-service
	cp poll-service.proto ../poll-service/proto/
	cp types.proto ../poll-service/proto/

	# vote-service
	cp vote-service.proto ../vote-service/producer/proto/
	cp types.proto ../vote-service/producer/proto/