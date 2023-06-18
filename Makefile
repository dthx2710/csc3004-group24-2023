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

gke-export:
	gcloud container clusters get-credentials voting-system --zone asia-southeast1 --project csc3004-group24-voting-system
	# deployments
	kubectl get deployment frontend -n default -o yaml > kubernetes/deployments/frontend.yaml
	kubectl get deployment gateway -n default -o yaml > kubernetes/deployments/gateway.yaml
	kubectl get deployment user-service -n default -o yaml > kubernetes/deployments/user-service.yaml
	kubectl get deployment poll-service -n default -o yaml > kubernetes/deployments/poll-service.yaml
	kubectl get deployment result-service -n default -o yaml > kubernetes/deployments/result-service.yaml
	kubectl get deployment vote-consumer -n default -o yaml > kubernetes/deployments/vote-consumer.yaml
	kubectl get deployment vote-producer -n default -o yaml > kubernetes/deployments/vote-producer.yaml
	kubectl get deployment nginx -n default -o yaml > kubernetes/deployments/nginx.yaml
	kubectl get deployment kafka -n default -o yaml > kubernetes/deployments/kafka.yaml
	kubectl get deployment zookeeper -n default -o yaml > kubernetes/deployments/zookeeper.yaml
	# services
	kubectl get service frontend -n default -o yaml > kubernetes/services/frontend.yaml
	kubectl get service gateway -n default -o yaml > kubernetes/services/gateway.yaml
	kubectl get service user-service -n default -o yaml > kubernetes/services/user-service.yaml
	kubectl get service poll-service -n default -o yaml > kubernetes/services/poll-service.yaml
	kubectl get service result-service -n default -o yaml > kubernetes/services/result-service.yaml
	kubectl get service vote-producer -n default -o yaml > kubernetes/services/vote-producer.yaml
	kubectl get service nginx -n default -o yaml > kubernetes/services/nginx.yaml
	kubectl get service kafka -n default -o yaml > kubernetes/services/kafka.yaml
	kubectl get service zookeeper -n default -o yaml > kubernetes/services/zookeeper.yaml
	# configmaps
	kubectl get configmap gateway-config-glp7 -n default -o yaml > kubernetes/configmaps/gateway-config-glp7.yaml
	kubectl get configmap user-service-config-rj9f -n default -o yaml > kubernetes/configmaps/user-service-config-rj9f.yaml
	kubectl get configmap poll-service-config-hkvp -n default -o yaml > kubernetes/configmaps/poll-service-config-hkvp.yaml
	kubectl get configmap result-service-config-lhkv -n default -o yaml > kubernetes/configmaps/result-service-config-lhkv.yaml
	kubectl get configmap vote-producer-config-aqr7 -n default -o yaml > kubernetes/configmaps/vote-producer-config-aqr7.yaml
	kubectl get configmap vote-consumer-config-8jc4 -n default -o yaml > kubernetes/configmaps/vote-consumer-config-8jc4.yaml
	kubectl get configmap nginx-config -n default -o yaml > kubernetes/configmaps/nginx-config.yaml
	kubectl get configmap nginx-configmap -n default -o yaml > kubernetes/configmaps/nginx-configmap.yaml
	kubectl get configmap kafka-config-tfdl -n default -o yaml > kubernetes/configmaps/kafka-config-tfdl.yaml
	kubectl get configmap zookeeper-config-xffn -n default -o yaml > kubernetes/configmaps/zookeeper-config-xffn.yaml
