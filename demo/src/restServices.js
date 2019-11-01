import makeRestServices, { crudActionsDeclarations } from 'src/'

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
      name: 'todoList',
      url: 'https://redux-rest-services.firebaseio.com/todo/:id.json',
      transformer : mapObjectToArray,
      actionsDeclarations: crudActionsDeclarations,
    },
  ]
)

export default restServices