// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import DefaultCell from '../../../DefaultCell'

type Props = {
  children: React.ChildrenArray<*>,
  data: { id: string, [string]: any },
  onDelete: (string) => void,
  pending: boolean,
}

class DeleteCell extends React.Component<Props> {

  onDelete = (e) => {
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
      <DefaultCell
        {...props}
        >
        <button
          disabled={pending}
          onClick={this.onDelete}
          >
          🗑
        </button>
      </DefaultCell>
    )
  }
}

DeleteCell.displayName = 'DeleteCell'

export default observer(DeleteCell)
