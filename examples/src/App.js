// @flow
import * as React from 'react'

import './App.css'
import mkViewModel from './viewModel'

import { Table, connect } from 'react-table'

const App = ({
  vm
}) => (
  <React.Fragment>
    <button onClick={vm.changeRow}>Change Row 3 Id</button>
    <Table
      columns={vm.columns}
      rows={vm.rows}
      />
  </React.Fragment>
)

export default connect(mkViewModel, App)
