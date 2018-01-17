// @flow
import { observer } from 'mobx-react'
import * as React from 'react'
import cx from 'classnames'

export type Props = {
  children: React.ChildrenArray<*>,
  data: {
    id: string,
    hover: boolean,
    editing: boolean,
    handleRowClick: (string) => void,
    handleRowMouseEnter: (string) => void,
    handleRowMouseLeave: (string) => void,
    [string]: any,
  },
}

class Row extends React.Component<Props> {

  handleMouseEnter = () => {
    this.props.data.handleRowMouseEnter()
  }

  handleMouseLeave = () => {
    this.props.data.handleRowMouseLeave()
  }

  // SELECTABLE AND EDITABLE stuff
  handleClick = (e) => {
    if (!this.props.data.editing) {
      e.stopPropagation()
      e.preventDefault()
      this.props.data.handleRowClick()
    }
  }

  render() {
    return (
      <tr
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
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
