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
  onSelect: (string) => void,
  pending: boolean,
  property: string,
  width: number,
}

class SelectCell extends React.Component<Props> {

  onSelect = (e) => {
    e.stopPropagation()
    this.props.onSelect(this.props.data.id)
  }

  render() {
    const {
      align,
      children,
      onSelect,
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
        <input
          checked={data.selected}
          disabled={pending}
          onChange={this.onSelect}
          type='checkbox'
          />
      </td>
    )
  }
}

SelectCell.displayName = 'SelectCell'

export default observer(SelectCell)
