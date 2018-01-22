// @flow
import * as React from 'react'
import { observer } from 'mobx-react'

import DefaultCell from '../../../DefaultCell'
import type { DefaultCellProps } from '../../../DefaultCell'

type Props = {|
  ...DefaultCellProps,
  vm: {
    handleDelete: (string) => void,
    pending: boolean,
  }
|}

class DeleteCell extends React.Component<Props> {

  handleDelete = (e) => {
    e.preventDefault()
    this.props.vm.handleDelete(this.props.data.id)
  }

  render() {
    const {
      vm,
      children,
      data,
      ...props,
    } = this.props

    return (
      <DefaultCell {...props}>
        <button
          disabled={vm.pending}
          onClick={this.handleDelete}
          >
          🗑
        </button>
      </DefaultCell>
    )
  }
}

DeleteCell.displayName = 'DeleteCell'

export default observer(DeleteCell)
