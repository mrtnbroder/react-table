// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import DefaultCell from '../../../DefaultCell'
import type { DefaultCellProps } from '../../../DefaultCell'

type Props = DefaultCellProps & {
  data: { id: string, editing: boolean, [string]: any },
  onToggleEdit: (string) => void,
  pending: boolean,
}

class EditCell extends React.Component<Props> {

  onToggleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onToggleEdit(this.props.data.id)
  }

  render() {
    const {
      children,
      onToggleEdit,
      pending,
      data,
      ...props
    } = this.props

    return (
      <DefaultCell {...props}>
        <button onClick={this.onToggleEdit}>
          {this.props.data.editing ? 'Save' : 'Edit'}
        </button>
      </DefaultCell>
    )
  }
}

EditCell.displayName = 'EditCell'

export default observer(EditCell)
