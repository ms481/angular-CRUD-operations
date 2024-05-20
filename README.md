# AngularCRUDOperations

Angular 17 project showing CRUD operations (Add, delete, update) a book. Filter book table by different criteria. Using Angular Material.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

1. Start the server. Json-server is used to create a fake Rest Api.

To run Json server, use this command: `npx json-server db.json`
Server is available under `http://localhost:3000/`.

If you are facing CORS error, run `node server.js` to start the Node.js server [work in progress]
Server is available under `http://localhost:3000/`. Node.js server is required to configure CORS, to avoid CORS error when using Json-server.

2. Start the UI
   Run `ng serve` for an Angular dev server. Navigate to `http://localhost:4200/`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
