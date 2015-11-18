# Sample browser application based on Angular 2.0 alpha and Bootstrap 3

This is an Angular 2.0 / Bootstrap 3 browser application to be used as a front-end for this GitHub back-end project: ["JEE Kickstart 1  Web Application"](https://github.com/giraone/pms-sample-jee-01).

## Status: NOT READY! (only cost center form is working)

## Requirements
* [NodeJS](http://nodejs.org) *v4.x.x*
* [NPM](https://www.npmjs.com/) *npm 3.x.x.*
* Git-Client (GitHub for Desktop)
* WebStorm 10+ or any other suitable IDE 

## Setup
* Download and install *node.js* and *npm*
* Download and install an editor of your choice (free: [Visual Studio Code](https://code.visualstudio.com/); commercial: [WebStorm](https://www.jetbrains.com/webstorm/))

## Building
The gulp task will build the browser app. To get it working, please do the following:

* Only after cloning the repo: `npm install` within the root folder of this repository. Use `npm run reinstall`, if you get an error.
* Run `gulp run`.

## Usage
* If you don't want to use the REST API hosted on *Open Shift*, you can run the server in [src/app/services/ProjectConstants.ts](src/app/services/ProjectConstants.ts#L8).

## Supported platforms
* Any modern web browser (Chrome, Firefox, IE11, Edge, Safari)

## Third-Party Libraries
### JavaScript, CSS
```
    "angular2": "2.0.0-alpha.45",       // Root JavaScript SPA framework.
    "bootstrap": "^3.3.5",              // Responsive layout framework.
    "es6-module-loader": "^0.17.8",     // Module loader for ES6.
    "es6-shim": "^0.33.6",              // Module loader for non ES6 (e.g. IE11).
    "systemjs": "^0.19.5",              // Universal loader to hide ES6 and AMD. Works with both Traceur and Babel.
    "ng2-translate": "^0.1.5"           // An implementation of angular translate for Angular 2.
```
* [Angular2](https://angular.io/), New Angular 2.0 JavaScript framework — *2.0.0-alpha.46*
* [SystemJS](https://github.com/systemjs/), Module loader for ES6 and AMD. Works with both Traceur and Babel. *0.19.5*

## What does this sample show, when ready?
* How to call REST (GET, POST, PUT) services using ...
* Basic layout (Bootstrap) and input validation (Angular2) for input forms.
* Basic routing scenarios (no child routes or dialogs yet!).
* The use of [ocombe/ng2-translate](https://github.com/ocombe/ng2-translate).
* Basic usage of directives for e.g. date input (`<date>`).
* Drop down boxes with values fetch via REST services.
* ...

## Convention and design decisions

### file and folder structure

*t.b.d.*
