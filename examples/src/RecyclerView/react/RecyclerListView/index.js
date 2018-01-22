// @flow
import * as React from 'react'
import ScrollerView from '../ScrollerView'

class RecyclerListView extends React.PureComponent {

  // _recycler = new RecyclerViewRecyler()

  componentDidMount() {
    // this.init()
  }

  render() {
    const layoutState = this.props.layoutManager._state
    console.log(layoutState);
    return (
      <ScrollerView
        recyclerView={this.props.recyclerView}
        scroller={this.props.scroller}
        >
        {React.cloneElement(
          this.props.children, {
            style: {
              width: layoutState.scroller.width,
              height: layoutState.scroller.height,
            }
          })}
      </ScrollerView>
    )
  }
}

export default RecyclerListView
