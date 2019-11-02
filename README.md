# redux-rest-services

## What for?

To minimize boilerplate code with redux async HTTP request, but preserve elastic possibilities of use.

## What it does?

- allows you to declare your services (endpoints) and actions (find, update etc.) that will be called on endpoint
- you can write your onw action declarations or use default REST API CRUD actions
- then `redux-rest-services` will generate object with actionTypes, syncActions, actions & reducers
- you can bring your own fetch function (to provide eg. token auth) or use built in ([isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch))
- you can build your own reducers based on generated action types
- you can create callbacks on each action call to dispatch another actions (eg. firing notifications on errors)

## Installation

`npm i redux-rest-services`

It has two peer dependencies - `"redux": "4.x"` and  `"redux-thunk": "2.x"`.

## Usage

Just import default function from the package and call it with an array of services (endpoints) declarations as first param.

Service declaration is an object with properties listed below.

```js
import makeRestServices, { crudActionsDeclarations } from 'redux-rest-services'

// this function maps an object into array of objects
// and puts object keys into key property of array items
const mapObjectToArray = (obj) => (
  Object.entries(obj || {})
    .map(([key, value]) => (
      typeof value === 'object' ?
        {...value, key}
        :
        {key, value}
    ))
)


const restServices = makeRestServices(
  [
    {
      name: 'todoList', // required
      url: 'https://redux-rest-services.firebaseio.com/todo/:id.json',  // required - can contain URL params
      transformer : mapObjectToArray,  
      onError: (...all) => console.log('I am onError callback!', ...all), // optional
      onStartFetching: (...all) => console.log('I am onStartFetching callback!', ...all), // optional
      onStopFetching: (...all) => console.log('I am onStopFetching callback!', ...all), // optional
      onReceivesData: (...all) => console.log('I am onReceivesData callback!', ...all), // optional
      actionsDeclarations: crudActionsDeclarations, // required - you need to import it or decare own
    },
  ]
)

export default restServices
```

`restServices` is an object with properties:

- actions - all async actions creators for all action declarations
- syncActions - all sync actions for all action declarations
- reducers - all reducers for all action declarations
- actionTypes - all action types for all action declarations

`makeRestServices` can be called with second parameter - fetch function. It can be any function that takes two parameters - `url` and `options` and returns a promise.

As default we use [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) with checks on response status code. But you can use axios or whatever http client you want, by wrapping it into function described above.

## Action declarations

They are names and params to make http requests. Technically it is an array of objects with at least `name` and `method` properties.

All props but `name` will be passed to fetch function as options, merged with data passed when action is dispatched.

So you can define here all kind of options like headers etc.

Below they are default action declarations (`crudActionsDeclarations`):

```js
export default [
  {
    name: 'create',
    method: 'POST',
  },
  {
    name: 'get',
    method: 'GET',
  },
  {
    name: 'find',
    method: 'GET',
  },
  {
    name: 'update',
    method: 'PUT',
  },
  {
    name: 'delete',
    method: 'DELETE',
  },
]
```

As you can see, by default, there are two almost identical actions with `GET` method. There are coded that way to provide two separate places in store for getting lists of data and single items (`get` and `find`).

## Dispatching an action

All async action creators are in `actions` property of object returned from calling `makeRestServices`.
That property is also an object, and have declared action names as a key.

So to get all todos in above example we must dispatch:

```js
restServices.actions.todoList.find()
```

To get specific one by id:

```js
restServices.actions.todoList.find({ id: '-LsceA0pakWjfnTA6hDY'})
```

And for create new one:

```js
restServices.actions.todoList.create({}, { body: JSON.stringify(newTaskText) })
```

All actions irrespectively of http method, can be called same way. First argument is object with params and second is data to bi merged with action declaration (without name) and passed as options to fetch function (thats the place for request body/data ;)).

## Parameters and query strings

Parameters and query strings are handled together in params object when action is dispatched.

URL parameters (if they are in URL and param object) are pasted into URL. If the URL param is missing in param object the param is deleted form URL.

The rest are stringified by [qs](https://github.com/ljharb/qs) and append as query string.

## State structure

`redux-rest-services` prepare state for each declared service. The state will include "global" variables for all actions in service, and action-specyfic variables.

So YES, you can call `GET` to obtain data and then `POST` to add new, and you will have these two responses in two separate places in store!

```js
[serviceName]: {
  isLoading: false,
  isError: false,
  touched: null,
  [actionName]: {
    isLoading: false,
    isError: false,
    error: null,
    touched: null,
    data: null,
    rawData: null,
  }
}
```
