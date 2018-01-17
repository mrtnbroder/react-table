// @flow
import * as React from 'react'
import { observer } from 'mobx-react'

import DefaultCell from '../../../DefaultCell'
import type { DefaultCellProps } from '../../../DefaultCell'

type Props = DefaultCellProps & {
  onDelete: (string) => void,
}

class DeleteCell extends React.Component<Props> {

  handleDelete = (e) => {
    e.preventDefault()
    this.props.onDelete(this.props.data.id)
  }

  render() {
    const {
      children,
      onDelete,
      pending,
      data,
      ...props,
    } = this.props

    return (
      <DefaultCell {...props}>
        <button
          disabled={pending}
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
