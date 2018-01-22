import * as React from 'react'
import { Card } from 'react-material'
import { connect } from 'react-table'
import { observer } from 'mobx-react'

import {
  DataSource,
  Dimension,
  LinearLayoutManager,
  MyRecyclerViewAdapter,
  RecyclerListView,
  RecyclerView,
} from './RecyclerView'

import rows from './data'

import './App.css'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.dataSource = new DataSource(rows)
    this.recyclerView = new RecyclerView()
    this.layoutManager = new LinearLayoutManager(
      this.recyclerView,
      'vertical',
      this.getViewForPosition,
      this.getDimensionForType,
    )
    this.adapter = new MyRecyclerViewAdapter(this.recyclerView, this.dataSource)

    this.layoutManager.getViewForPosition = this.getViewForPosition
    this.layoutManager.setDimensionForType = this.getDimensionForType

    this.recyclerView.setAdapter(this.adapter)
    this.recyclerView.setLayoutManager(this.layoutManager)
  }

  getViewForPosition = (position) => {
    return 'FULL'
  }

  getDimensionForType = (type, data) => {
    return Dimension.of(100, 100)
  }

  renderRow = (type, data, style) => {
    return (
      <li style={style}>
        {data.dessert}
      </li>
    )
  }

  render() {
    return (
      <RecyclerListView
        adapter={this.adapter}
        dataSource={this.dataSource}
        layoutManager={this.layoutManager}
        recyclerView={this.recyclerView}
        scroller={<div style={styles.scroller}></div>}
        >
        <div></div>
      </RecyclerListView>
    )
  }
}

const styles = {
  scroller: {
    height: 400,
    width: 400,
    background: 'lightgray',
    overflowY: 'auto',
    overflowX: 'hidden',
  }
}

export default App
