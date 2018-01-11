
import * as React from 'react'
import * as mobx from 'mobx'

import Cell from '../../Cell'

export const mkSelectable = (rows) =>
  rows.map((row) => mobx.extendObservable(row,  { selected: false }))

export const mkSelectableColumn = ({
  getSelectedRows,
  onSelect,
  onSelectAll,
  ...props
}) => ({
  property: 'selected',
  title: (
    <input onChange={onSelectAll} type='checkbox'/>
  ),
  render: (column, row) => {
    return (
      <Cell column={column} row={row}>
        <input onChange={onSelect} type='checkbox'/>
      </Cell>
    )
  },
  ...props,
})
