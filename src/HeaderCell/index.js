// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

type Props = {
  align: string,
  children: React.ChildrenArray<*>,
}

const HeaderCell = ({
  align,
  width,
  first,
  last,
  children,
}: Props) => (
  <th
    className={cx({
      'align-right': align === 'right',
      first,
      last
    })}
    width={width}
    >
    {children}
  </th>
)

HeaderCell.displayName = 'HeaderCell'

export default observer(HeaderCell)
