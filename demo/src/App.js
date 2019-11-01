import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import restServices from './restServices'

const App = (props) => {
  const [newTaskText, setNewTaskText] = useState('')

  useEffect(() => {
    props.find()
  }, [])

  return (
    <div>
      <div>
        <p>
          Global loading: {props.todoList.isLoading ? 'true' : 'false'}
        </p>
        <p>
          "find" loading: {props.todoList.find.isLoading ? 'true' : 'false'}
        </p>
        <p>
          "create" loading: {props.todoList.create.isLoading ? 'true' : 'false'}
        </p>
        <p>
          "delete" loading: {props.todoList.delete.isLoading ? 'true' : 'false'}
        </p>
      </div>
      <input
        type="text"
        value={newTaskText}
        onChange={e => setNewTaskText(e.target.value)}
      />
      <button
        onClick={() => {
          setNewTaskText('')

          props.create({ text: newTaskText })
            .then(() => props.find())
        }}
      >
        Add!
      </button>
      <ul>
        {
          props.todoList.find.data &&
          props.todoList.find.data.map(todo => (
            <li key={todo.key}>
              <button
                onClick={() => {
                  props.delete({ id: todo.key })
                    .then(() => props.find())
                }}
              >
                X
              </button>
              {' '}
              {todo.text}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  todoList: state.todoList,
})

const mapDispatchToProps = dispatch => ({
  find: () => dispatch(restServices.actions.todoList.find()),
  delete: (params) => dispatch(restServices.actions.todoList.delete(params)),
  create: (newTaskText) => dispatch(restServices.actions.todoList.create({}, { body: JSON.stringify(newTaskText) }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)