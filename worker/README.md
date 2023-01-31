# Distribución

## Ficheros externos

1. .env : enviroment
2. .eslintrrc y .prettierrc: fichero de configuración de eslint y prettier respectivamente para lograr un código de Typescript limpio y pautado
3. nest-cli.json : configuración de Nest
4. tsconfig.json y tsconfig.build.json: ficheros de configuración de Typescript para el build

## Módulos

- app (./src): Módulo raíz o inicial y contiene las apis REST y los servicios principales
  - kafka (./src/kafka): Módulo kafka que controla todos los providers y consumers utilizados así como su configuración.

### Explicación de tipos de ficheros

1. .module.ts : fichero de definición de un módulo, aquí se declaran los servicios como proveedores (providers) y los controladores (controllers). Además si el módulo depende de otro módulo se importa (imports) y si existe algún servicio que el módulo comparte se exporta (exports)
2. .service.ts : fichero de servicio se encarga de un tipo de tarea y contiene el código grueso de cada funcionalidad, son inyectados en los controladores o servicios que los utilizan.
3. .interfaces.ts : son definiciones de interfaces utilizadas
4. .consumer.ts : son consumers de kafka
