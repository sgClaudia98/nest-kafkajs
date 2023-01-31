package deployment

import (
  s ".../service:service"
)

#Deployment: {
  name: "calcdep"
  artifact: s.#Artifact
  config: {
    // Assign the values to the service configuration parameters
    parameter: {
      language: "en"
    }
    resource: {}
    scale: detail: {
      kafka: 1
      keycloal: 1
      frontend: hsize: 1
      worker: hsize: 2
    }
    resilience: 0
  }
}

