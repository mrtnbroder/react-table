// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

export type DefaultCellProps = {|
  align?: string,
  children?: React.Node,
  className?: string,
  data: { [string]: any },
  property: string,
  width: number,
  vm: {
    pending: boolean,
  },
|}

const DefaultCell = ({
  align,
  children,
  className,
  data,
  pending,
  property,
  ...props
}: DefaultCellProps) => (
  <td
    className={cx({
      'cell': true,
      'align-right': align === 'right',
    }, className)}
    {...props}
    >
    {children || data[property]}
  </td>
)

DefaultCell.displayName = 'DefaultCell'

export default observer(DefaultCell)
