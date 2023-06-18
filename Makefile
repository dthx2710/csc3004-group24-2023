tag:
	docker tag csc3004-group24-2023-frontend asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/frontend
	docker tag csc3004-group24-2023-gateway asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/gateway
	docker tag csc3004-group24-2023-poll-service asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/poll-service
	docker tag csc3004-group24-2023-result-service asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/result-service
	docker tag csc3004-group24-2023-user-service asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/user-service
	docker tag csc3004-group24-2023-vote-consumer asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/vote-consumer
	docker tag csc3004-group24-2023-vote-producer asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/vote-producer
	docker tag csc3004-group24-2023-nginx asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/nginx
	docker tag docker.io/bitnami/kafka asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/kafka
	docker tag docker.io/bitnami/zookeeper asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/zookeeper

push:
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/frontend
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/gateway
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/poll-service
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/result-service
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/user-service
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/vote-consumer
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/vote-producer
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/nginx
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/kafka
	docker push asia-southeast1-docker.pkg.dev/csc3004-group24-voting-system/voting-system-repo/zookeeper

start:
	docker-compose rm -svf
	docker-compose up