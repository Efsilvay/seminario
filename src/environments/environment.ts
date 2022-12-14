// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rest: {
    usuarios: "http://localhost:3000/usuarios",
    departamentos: "http://localhost:3000/departamentos",
    tours: "http://localhost:3000/tours",
    carrito: "http://localhost:3000/carrito",
    ventas: "http://localhost:3000/ventas"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
