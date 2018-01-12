// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

type Props = {
  align: string,
  children: React.ChildrenArray<*>,
  data: { id: string, [string]: any },
  first: boolean,
  last: boolean,
  onToggleEdit: (string) => void,
  pending: boolean,
  property: string,
  width: number,
}

class EditCell extends React.Component<Props> {

  onToggleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onToggleEdit(this.props.data.id)
  }

  render() {
    const {
      align,
      children,
      onToggleEdit,
      pending,
      width,
      first,
      last,
      data,
    } = this.props

    return (
      <td
        className={cx({
          'align-right': align === 'right',
          first,
          last
        })}
        width={width}
        >
        <button onClick={this.onToggleEdit}>
          {this.props.data.editing ? 'Save' : 'Edit'}
        </button>
      </td>
    )
  }
}

EditCell.displayName = 'EditCell'

export default observer(EditCell)
