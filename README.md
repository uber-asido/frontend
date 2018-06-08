# SF Movies frontend

### Disclaimer

This is the frontend side of the SM Movies project. However, the development emphasis is on the backend. For more information visit the [backend repository](https://github.com/uber-asido/backend).

---

The purpose of the client is to fetch data from the [backend](https://github.com/uber-asido/backend) service and visually present it on a map. The client uses [Angular framework](https://angular.io/) and is written in [TypeScript](https://www.typescriptlang.org/). Among the features it includes:
* Show all filming locations at once.
* Map point clustering.
* Show movie details on map point click.
* Search with autocompletion.
* Admin page with ability to upload files with more data.

## Source code structure

The source code follows [Angular suggested structure and coding style](https://angular.io/guide/styleguide). Below are the highlights:

Directory | Description
--- | ---
src/main.ts | The main entry point.
src/app/ | App components.
src/app/modules/ | Each standalone section with routing has it's own module defined here. Section modules are lazy-loaded.
src/app/modules/shared/ | Modules used by sections, that aren't standalone and have no routing.

## Development server

### Prerequisites

Install Angular CLI. Make sure to check Angular CLI [prerequisites](https://github.com/angular/angular-cli#prerequisites) first.
```
npm install -g @angular/cli
```

Install frontend dependencies.
```
npm install
```

### Run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Available routes:

Route | Description
--- | ---
/ | Map section.
/admin | Admin section containing upload management.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Docker

Create a docker image: `docker build -t uber-frontend .`
Run docker image: `docker run -p 4200:80 uber-frontend`

### Monitoring

The project has [Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) integrated, which collects various runtime information, such as page load time, API response times, unhandled exceptions, etc.

## Related projects

[SF Movies backend](https://github.com/uber-asido/backend)
