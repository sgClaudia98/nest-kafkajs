package component

#Artifact: {
  ref: name:  "frontend"

  description: {

    srv: {
      server: {
        restapi: { protocol: "http", port: 3000 }
      }
      client: {
        keycloakclient: { protocol: "http" }
        kafkaclient: { protocol: "tcp" }
      }
    }


    // Applies to the whole role
    size: {
      bandwidth: { size: 10, unit: "M" }
    }

    code: {

      frontend: {
        name: "frontend"

        image: {
          hub: { name: "", secret: "" }
          tag: "sgclaudia98/frontend_api_dev"
        }

        mapping: {
          // Filesystem mapping: map the configuration into the JSON file
          // expected by the component
          env: {
            NODE_ENV: dev
            SECRET: "hello shake"
            KAKFA_API_CONNECT: "kafka_sad:9092"
            KEYCLOAK_API_CONNECT: "http://keycloak_sad:8080"
            KEYCLOAK_REALM: testing_realm
            KEYCLOAK_CLIENT_ID: rest-api-client
            KEYCLOAK_SECRET: ZMSMQL8qdlHzZ47ne4uAu9tCADIwMbiV
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
