// @flow
import * as React from 'react'
import { observer } from 'mobx-react'

import type { ColumnInput } from '../Column'

type Props = {
  children: React.ChildrenArray<*>,
  column: ColumnInput,
  data: { [string]: any },
}

const TextCell = observer(({
  column,
  data,
  children,
}: Props) => (
  <td className={column.align === 'right' ? 'align-right' : ''}>
    {children || data[column.property]}
  </td>
))

TextCell.displayName = 'TextCell'

export default TextCell
