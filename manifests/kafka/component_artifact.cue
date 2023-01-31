package component

#Artifact: {
  ref: name:  "kafka"

  description: {

     srv: {
      server: {
        tcpapi: { protocol: "tcp", port: 9092 }
      }
    }
    // Applies to the whole role
    size: {
      bandwidth: { size: 10, unit: "M" }
    }

    code: {

      worker: {
        name: "worker_api_dev"

        image: {
          hub: { name: "", secret: "" }
          tag: "sgclaudia98/worker_api_dev"
        }

        mapping: {
          // Filesystem mapping: map the configuration into the JSON file
          // expected by the component
          env: {
              KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'
              KAFKA_DELETE_TOPIC_ENABLE: 'true'
              KAFKA_CREATE_TOPICS: "test,test_response"
              KAFKA_BROKER_ID: 1
              KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
              KAFKA_LISTENERS: "PLAINTEXT://:9092"
              KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://kafka:9092"
          }
        }

        // Applies to each containr
        size: {
          memory: { size: 100, unit: "M" }
          mincpu: 100
          cpu: { size: 200, unit: "m" }
        }
      }
    }

  }
}
