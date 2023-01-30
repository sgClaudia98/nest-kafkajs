# Estructura de Proyecto

1. frontend: aplicación NodeJs (NestJS) encargada de recibir las peticiones REST del cliente y comunica con kafkajs
2. temp: carpeta de configuraciones temporales
3. worker: aplicacion NodeJs () encargada de realizar los trabajos que solicita el karka, escucha los mensajes, ejecuta lo solicitado y retorna una respuesta.
4. docker-compose: además de los contenedores de las 2 aplicaciones definidas anteriormente se declara el keycloak para la authenticación, el kafka y el zookeeper.

# Run

`docker-compose up --build`

# docker frontend cronjob

30 \* \* \* _ sudo find /my/folder/_ -type f -mmin +30 -delete
