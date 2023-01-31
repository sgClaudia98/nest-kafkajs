package service

import (
  f ".../frontend:component"
  w ".../worker:component"
  k ".../kafka:component"
  e ".../keycloak:component"
)

#Artifact: {
  ref: name: "nestjs_kafka"

  description: {

    //
    // Kumori Component roles and configuration
    //

    // Configuration (parameters and resources) to be provided to the Kumori
    // Service Application.
    config: {
      parameter: {
        language: string
      }
      resource: {}
    }

    // List of Kumori Components of the Kumori Service Application.
    role: {
      frontend: artifact: f.#Artifact
      worker: artifact: w.#Artifact
      kafka: artifact: k.#Artifact
      keycloak: artifact: e.#Artifact
    }

    //
    // Kumori Service topology: how roles are interconnected
    //

    // Connectivity of a service application: the set of channels it exposes.
    srv: {
      server: {
        calc: { protocol: "http", port: 80 }
      }
    }

    // Connectors, providing specific patterns of communication among channels
    // and specifying the topology graph.
    connect: {
      // Outside -> FrontEnd (LB connector)
      serviceconnector: {
        as: "lb"
  			from: self: "calc"
        to: frontend: "restapi": _
      }
      // FrontEnd -> Keycloak (LB connector)
      keycloakconnector: {
        as: "lb"
        from: frontend: "keycloakclient"
        to: keycloak: "restapi": _
      }
      // FrontEnd -> Kafka (LB connector)
      kafkaFconnector: {
        as: "lb"
        from: frontend: "kafkaclient"
        to: kafka: "tcpapi": _
      }
      // Kafka -> Frontend (LB connector)
      fKafkaconnector: {
        as: "lb"
        from: kafka: "tcpapi"
        to: frontend: "kafkaclient": _
      }
      
      // Kafka -> Worker (LB connector)
      kafkaWconnector: {
        as: "lb"
        from: kafka: "tcpapi"
        to: worker: "kafkaclient": _
      }

      // Worker -> Kafka (LB connector)
      wKafkaconnector: {
        as: "lb"
        from: worker: "kafkaclient"
        to: kafka: "tcpapi": _
      }

    }

  }
}
