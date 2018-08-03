# redux-route-middleware

A redux middleware allowing you to route through redux actions. If you also have the [redux-axios-middleware](https://www.npmjs.com/package/redux-axios-middleware) you can route based on the success or failure of axios requests.

## Install

`npm i -S redux-route-middleware`


## Setup
To set up this middleware you will have to instantiate your own [history](https://www.npmjs.com/package/history) object. Keep in mind that history is a dependency of React Router, so you likely already have it included in your project.

```javascript
import { createStore, applyMiddleware } from 'redux'; 
import createHistory from 'history/createBrowserHistory';
import createRouteMiddleware from 'redux-route-middleware';

let history = createHistory();

let store = createStore(
	reducers, // custom reducers
	initialState, // initial state
	applyMiddleware(
	... //other middleware
	createRouteMiddleware(history),
	...)
);

```

### Use With React Router
If you are using [react-router-dom](https://www.npmjs.com/package/react-router-dom), then instead of using \<BrowserRouter>, \<HashRouter>, or \<MemoryRouter>, you will need to use \<Router> and pass it the history object you created in the initial setup.

```javascript
import { Router } from 'react-router-dom';
...
<Router history = {history}>
...
</Router>

```

## Creating Actions

This middleware will handle any objects found under the `route` object in an action. The structure of `route` closely mimics the function calls to the history object:

`history.push('/Home');`

```javascript
route: {
	history: {
		push: '/Home'
	}
}
```

`history.replace('/Home');`

```javascript
route: {
	history: {
		replace: '/Home'
	}
}
```

`history.go(-1);`

```javascript
route: {
	history: {
		go: -1
	}
}
```

### Immediate Routing
If you would like to dispatch a history action that will be immediately carried out, simply include a route object in your dispatch action with either push, go, or replace:

```javascript
{
	type: 'ANY_ACTION',
	route: {
		history: {
			push: '/Home'
		}
	}
}
```
### Async routing with redux-axios-middleware

If you are also using the redux-axios-middlware you can also route based on the success or failure of axios requests in addition to the immediate routing:

```javascript
{
	type: 'TRY_LOGIN',
	payload: {
	 //...payload object as documented in redux-axios-middleware
	}
	route: {
		history: {
			push: '/Loading'
		},
		success: {
			history: {
				replace: '/Home'
				}
		},
		fail: {
			history: {
				push: '/Error',
			}
		}
	}
}
```
## License
This project is licensed under the MIT license, Copyright (c) 2018 Richard Fornario. For more information see `LICENSE`.

## Acknowledgements

Michal Svrcek for redux-axios-middleware


