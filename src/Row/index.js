// @flow
import { observer } from 'mobx-react'
import * as React from 'react'
import cx from 'classnames'

export type Props = {
  children: React.ChildrenArray<*>,
  data: { id: string, hover: boolean, [string]: any },
  onMouseEnter: (string) => void,
  onMouseLeave: (string) => void,
}

class Row extends React.Component<Props> {

  onMouseEnter = () => {
    // TODO: doh, should this be handled on the viewModel or is this okay?
    // I'd need to export a function that extends each row with the hover
    // implementation logic, so it's getting properly handled.
    this.props.data.onMouseEnter()
    // this.props.onMouseEnter(this.props.data.id)
  }

  onMouseLeave = () => {
    this.props.data.onMouseLeave()
    // this.props.onMouseLeave(this.props.data.id)
  }

  // SELECTABLE AND EDITABLE stuff
  onClick = (e) => {
    if (!this.props.data.editing) {
      e.stopPropagation()
      e.preventDefault()
      this.props.data.onRowClick()
    }
  }

  render() {
    return (
      <tr
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={cx({
          // TODO: this row shouldn't make assumptions about it's data, it should
          // be handled inside a SelectRow that makes assumptions about the data
          // being passed in. So create a new Row that can make this assumption.
          // and use that as the Row. The Row Element can be passed in from the Table.
          'row--selected': this.props.data.selected,
          'row--hover': this.props.data.hover,
        })}
        >
        {this.props.children}
      </tr>
    )
  }
}

Row.displayName = 'Row'

export default observer(Row)
