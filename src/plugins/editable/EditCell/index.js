// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import DefaultCell from '../../../DefaultCell'
import type { DefaultCellProps } from '../../../DefaultCell'

type Props = {|
  ...DefaultCellProps,
  data: {
    editing: boolean,
    handleToggleEditing: (string) => void,
    id: string,
  },
|}

class EditCell extends React.Component<Props> {

  handleToggleEditing = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.data.handleToggleEditing(this.props.data.id)
  }

  render() {
    const {
      children,
      vm,
      data,
      ...props
    } = this.props

    return (
      <DefaultCell {...props}>
        <button onClick={this.handleToggleEditing}>
          {this.props.data.editing ? 'Save' : 'Edit'}
        </button>
      </DefaultCell>
    )
  }
}

EditCell.displayName = 'EditCell'

export default observer(EditCell)
