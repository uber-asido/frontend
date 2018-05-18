# SF Movies frontend

The purpose of the client is to fetch the data from the [backend](https://github.com/uber-asido/backend) and visually present it on a map. The client uses Angular framework and is written in TypeScript. Among the features it includes:
* Map point clustering
* Show movie details on map point click
* Search with autocompletion
* Admin page with ability to upload files with more data

## Source code structure

The source code follows [Angular suggested structure and coding style](https://angular.io/guide/styleguide). It is a long read, so here are the highlights:

Directory | Description
--- | ---
src/main.ts | The main entry point
src/app/ | App components
src/app/modules/ | Each standalone section with routing has it's own module defined here. Section modules are lazy-loaded.
src/app/modules/shared/ | Modules used by sections, that aren't standalone and have no routing. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Available routes:

Route | Description
--- | ---
/ | Map section.
/admin | Admin section currently containing upload management.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

To create a docker image run `docker build -t uber-frontend .`

## Related projects
[SF Movies backend](https://github.com/uber-asido/backend)
