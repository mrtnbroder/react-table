// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

export type HeaderCellProps = {
  align?: string,
  children?: React.Node,
  property?: string,
  width: number,
}

const HeaderCell = ({
  align,
  children,
  property,
  ...props
}: HeaderCellProps) => (
  <th
    className={cx({
      'align-right': align === 'right',
    })}
    {...props}
    >
    {children}
  </th>
)

HeaderCell.displayName = 'HeaderCell'

export default observer(HeaderCell)
