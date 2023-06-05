create-topic:
	docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --create \
    --bootstrap-server localhost:9092 \
    --replication-factor 1 \
    --partitions 1 \
    --topic votes

push-topic-messages:
	docker exec -it kafka /opt/bitnami/kafka/bin/kafka-console-producer.sh \
    --broker-list localhost:9092 \
    --topic votes

start-kafka:
	docker-compose rm -svf
	docker-compose up

view-topic-messages:
	docker exec -it kafka /opt/bitnami/kafka/bin/kafka-console-consumer.sh \
	--bootstrap-server localhost:9092 \
	--topic votes \
	--from-beginning