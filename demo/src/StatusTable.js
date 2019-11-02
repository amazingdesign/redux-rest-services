import React from 'react'

import { connect } from 'react-redux'

import { crudActionsDeclarations } from 'redux-rest-services'

const actionNames = crudActionsDeclarations.map(declaration => declaration.name)

const StatusTable = ({ actionState }) => (
  <div>
    <table className={'table is-bordered is-striped is-narrow is-hoverable is-fullwidth'}>
      <thead>
        <tr>
          <th></th>
          <th>isLoading</th>
          <th>isError</th>
          <th>touched</th>
          <th>data</th>
          <th>rawData</th>
          <th>error</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>GLOBAL</th>
          <td>{actionState.isLoading ? 'true' : 'false'}</td>
          <td>{actionState.isError ? 'true' : 'false'}</td>
          <td>{actionState.touched}</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
        {
          actionNames.map((actionName, index) => (
            <tr key={index}>
              <th>{actionName}</th>
              <td>{actionState[actionName].isLoading ? 'true' : 'false'}</td>
              <td>{actionState[actionName].isError ? 'true' : 'false'}</td>
              <td>{actionState[actionName].touched}</td>
              <td>{JSON.stringify(actionState[actionName].data)}</td>
              <td>{JSON.stringify(actionState[actionName].rawData)}</td>
              <td>{JSON.stringify(actionState[actionName].error)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
)

const mapStateToProps = state => ({
  actionState: state.todoList,
})

export default connect(mapStateToProps)(StatusTable)