// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import HeaderCell from '../../../HeaderCell'
import type { HeaderCellProps } from '../../../HeaderCell'

type Props = {|
  ...HeaderCellProps,
  vm: {
    allSelected: boolean,
    handleSelectAll: () => void,
    pending: boolean,
    someSelected: boolean,
  },
|}

class SelectHeaderCell extends React.Component<Props> {

  node = null

  componentDidUpdate() {
    if (this.props.vm.someSelected && !this.props.vm.allSelected) {
      if (this.node) {
        this.node.indeterminate = true
      }
    }
    else if (this.props.vm.allSelected || !this.props.vm.someSelected) {
      if (this.node) {
        this.node.indeterminate = false
      }
    }
  }

  onSelectAll = (e) => {
    e.stopPropagation()
    this.props.vm.handleSelectAll()
  }

  setRef = (node) => {
    this.node = node
  }

  render() {
    const {
      children,
      vm,
      ...props,
    } = this.props

    return (
      <HeaderCell {...props}>
        <input
          checked={vm.allSelected}
          indeterminate={vm.someSelected.toString()}
          onChange={this.onSelectAll}
          ref={this.setRef}
          disabled={vm.pending}
          type='checkbox'
          />
      </HeaderCell>
    )
  }
}

SelectHeaderCell.displayName = 'SelectHeaderCell'

export default observer(SelectHeaderCell)
