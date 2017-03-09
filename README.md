## Serverside rendering with React, Express and Silex

This prototype shows how React pages can be rendered on the server. It depends on php7.0-cli and nodejs. To install run these commands:

- `composer install`
- `npm install`

The following commands are available to run the prototype:

- `npm run start` build js, starts Express, starts Silex
- `npm run start_twig` build js, starts Express, starts Silex and uses Twig for rendering
- `npm run watch` watches and build the javascript files when changed
- `npm run build` builds the javascript into a single bundle and sourcemaps
- `npm run build_min` builds and uglifies the javascript into a single bundle and sourcemaps
- `npm run express` start Express, outputs rendered page as html
- `npm run express_twig` start Express, outputs rendered page as json
- `npm run silex` starts Silex, forwards the rendered html from Express
- `npm run silex_twig` starts Silex, renders the page using a Twig template and the json data rendered by Express


#### The application

The application is a simple tree that represents the classification of animals:

![](classification-of-animals.png =250x)

You can click through the categories and access specific categories directly via the breadcrumb trail or by using a direct url, see below.


#### How it works

The frontend is a React application using Flux and Flux reducers for state management and Router5 for updating the history entries as the user clicks through the categories.

In the file `src/js/misc/data.js` you see a json representation of the diagram in the image shown above. The file `src/js/misc/api.js` creates an API which is an object that exposes handy functions to access that json data. For instance `getBreadCrumbLinks()` returns an array containing the consecutive links that make up the breadcrumb trial to a certain category.

The application is url-driven, which means that the url in the address bar sets the state. When the API object initializes, it also creates routes for every category. A route is a pojo that contains a key for path, name and label. The route objects are distributed throughout the application by the state.

The only actual view of the application is `src/js/components/page.js`, it shows the breadcrumb trail, some information about the current category and dependent on whether the category has subcategories, a list of links to its subcategories or a list of examples of animals belonging to the category.

So the page component contains quite some links and every link gets hydrated by a route object from the state. By clicking a link we tell the router to navigate to that route and because every state of the page has its own unique url we can easily infer the new state from the route.


#### Rendering on the server

Rendering a React application on the server is done by using the function `renderToString` which is part of the `react-dom/server` module. The input is the same app as you would use for client side rendering and the output is a string that you can send to a browser as the body of a http response message.

The only restriction is that your app can not use browser APIs that don't have a Nodejs implementation, such as for instance the Audio API.

This prototype uses an Express server to render the page with React and a Silex server to eventually serve the page to the client. At first sight this might look like overkill, but is actually is a very easy way to mix php generated content with React generated content.

An example of such a mix is when you run `npm run start_twig`: now the page served to the client is a Twig template that will be rendered using the json data that is generated by the Express server.

Because our app is url-driven, we set the initial state of the application by forwarding the browser url
