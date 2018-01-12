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
  onDelete: (string) => void,
  pending: boolean,
  width: number,
}

class DeleteCell extends React.Component<Props> {

  onDelete = (e) => {
    e.preventDefault()
    this.props.onDelete(this.props.data.id)
  }

  render() {
    const {
      align,
      children,
      first,
      last,
      onDelete,
      pending,
      width,
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
        <button
          disabled={pending}
          onClick={this.onDelete}
          >
          🗑
        </button>
      </td>
    )
  }
}

DeleteCell.displayName = 'DeleteCell'

export default observer(DeleteCell)
