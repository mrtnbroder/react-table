// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import DefaultCell from '../../../DefaultCell'
import type { DefaultCellProps } from '../../../DefaultCell'

type Props = DefaultCellProps & {
  data: {
    id: string,
    selected: boolean,
    handleSelect: () => void,
    [string]: any,
  },
}

class SelectCell extends React.Component<Props> {

  handleSelect = (e) => {
    e.stopPropagation()
    this.props.data.handleSelect()
  }

  render() {
    const {
      children,
      data,
      pending,
      ...props
    } = this.props

    return (
      <DefaultCell {...props}>
        <input
          checked={data.selected}
          disabled={pending}
          onClick={this.handleSelect}
          type='checkbox'
          />
      </DefaultCell>
    )
  }
}

SelectCell.displayName = 'SelectCell'

export default observer(SelectCell)
