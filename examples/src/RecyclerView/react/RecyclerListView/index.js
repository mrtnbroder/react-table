// @flow
import * as React from 'react'
import ScrollerView from '../ScrollerView'

class RecyclerListView extends React.PureComponent {

  render() {
    const layoutState = this.props.layoutManager._state

    return (
      <ScrollerView
        recyclerView={this.props.recyclerView}
        scroller={this.props.scroller}
        >
        {React.cloneElement(
          this.props.children, {
            style: {
              width: 400,
              height: 100000,
            }
          }
        )}
      </ScrollerView>
    )
  }
}

export default RecyclerListView
