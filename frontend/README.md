# Distribución

## Ficheros externos

1. .env : enviroment
2. .eslintrrc y .prettierrc: fichero de configuración de eslint y prettier respectivamente para lograr un código de Typescript limpio y pautado
3. nest-cli.json : configuración de Nest
4. tsconfig.json y tsconfig.build.json: ficheros de configuración de Typescript para el build

## Módulos

- app (./src): Módulo raíz o inicial y contiene las apis REST y los servicios principales
  - kafka (./src/kafka): Módulo kafka que controla todos los providers y consumers utilizados así como su configuración.

## Pruebas

La carpeta ./test es la ubicación donde se ubicarían las pruebas a realizar.
