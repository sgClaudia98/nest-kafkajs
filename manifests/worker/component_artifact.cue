package component

#Artifact: {
  ref: name:  "worker"

  description: {

     srv: {
      client: {
        kafkaclient: { protocol: "tcp" }
      }
    }

    // Applies to the whole role
    size: {
      bandwidth: { size: 10, unit: "M" }
    }

    code: {

      worker: {
        name: "worker"

        image: {
          hub: { name: "", secret: "" }
          tag: "sgclaudia98/worker_api_dev"
        }

        mapping: {
          // Filesystem mapping: map the configuration into the JSON file
          // expected by the component
          
          env: {
            NODE_ENV: dev
            KAKFA_API_CONNECT: "kafka_sad:9092"
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
