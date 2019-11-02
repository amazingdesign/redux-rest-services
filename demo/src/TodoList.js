import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import restServices from './restServices'

const TodoList = (props) => {
  const [newTaskText, setNewTaskText] = useState('')

  const { find } = props

  useEffect(() => {
    find()
  }, [find])

  return (
    <div>
      <div className="field has-addons">
        <div className="control">
          <input
            className={'input'}
            placeholder={'New task name'}
            type="text"
            value={newTaskText}
            onChange={e => setNewTaskText(e.target.value)}
          />
        </div>
        <div className="control">
          <button
            className={'button is-info'}
            onClick={() => {
              setNewTaskText('')

              props.create({ text: newTaskText })
                .then(() => props.find())
            }}
          >
            Add task
          </button>
        </div>
        <div className="control">
          <button
            className={'button is-danger'}
            onClick={() => {
              setNewTaskText('')

              props.create()
            }}
          >
            Make error (call create without body)
          </button>
        </div>
      </div>
      <ul>
        {
          props.todoList.find.data &&
          props.todoList.find.data.map(todo => (
            <li key={todo.key}>
              <button
                className={'button'}
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
)(TodoList)