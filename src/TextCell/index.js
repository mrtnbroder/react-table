// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

type Props = {
  align: string,
  children: React.ChildrenArray<*>,
  data: { [string]: any },
  first: boolean,
  last: boolean,
  property: string,
  width: number,
}

const TextCell = ({
  align,
  property,
  data,
  first,
  last,
  width,
  children,
}: Props) => (
  <td
    className={cx({
      'align-right': align === 'right',
      first,
      last
    })}
    width={width}
    >
    {children || data[property]}
  </td>
)

TextCell.displayName = 'TextCell'

export default observer(TextCell)
