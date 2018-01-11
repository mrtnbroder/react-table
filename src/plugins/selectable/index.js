
import * as React from 'react'

import Column from '../../Column'

const selectableColumn = ({
  onSelect,
  onSelectAll,
}) => ({
  property: 'selected',
  title: (
    <input onChange={onSelectAll} type='checkbox'/>
  ),
  render: (row) => {
    return (
      <Column key='selectableColumn'>
        <input onChange={onSelect} type='checkbox'/>
      </Column>
    )
  }
})

export default selectableColumn
