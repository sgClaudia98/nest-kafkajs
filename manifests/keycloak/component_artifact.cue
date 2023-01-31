package component

#Artifact: {
  ref: name:  "keycloak"

  description: {

    srv: {
      server: {
        restapi: { protocol: "http", port: 8080 }
      }
    }

    // Applies to the whole role
    size: {
      bandwidth: { size: 10, unit: "M" }
    }

    code: {

      keycloak: {
        name: "keycloak"

        image: {
          hub: { name: "", secret: "" }
          tag: "quay.io/keycloak/keycloak:20.0.1"
        }

        mapping: {
          // Filesystem mapping: map the configuration into the JSON file
          // expected by the component
          env: {
            KEYCLOAK_ADMIN: admin
            KEYCLOAK_ADMIN_PASSWORD: admin
            DB_VENDOR: h2
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
