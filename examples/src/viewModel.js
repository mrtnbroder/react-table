// @flow
// import * as React from 'react'
import * as mobx from 'mobx'
import rows from './data'

// import {
//   mkSelectable,
//   selectableColumn,
//   editableColumn,
//   deleteableColumn,
// } from 'react-table'

const mkViewModel = (
  params,
  props,
  context,
) => {
  const vm = mobx.observable({
    rows, //: mkSelectable(rows),
    columns: [
      // selectableColumn({
      //   getSelectedRows: (rowIds) => {}
      //   onSelect: () => {},
      //   onSelectAll: () => {},
      // }),
      {
        property: 'dessert',
        title: 'Dessert (100g serving)',
        fixed: 'left',
      },
      {
        property: 'calories',
        title: 'Calories',
        align: 'right',
      },
      {
        property: 'fat',
        title: 'Fat (g)',
        align: 'right',
      },
      {
        property: 'carbs',
        title: 'Carbs (g)',
        align: 'right',
      },
      {
        property: 'protein',
        title: 'Protein (g)',
        align: 'right',
      },
      {
        property: 'sodium',
        title: 'Sodium (mg)',
        align: 'right',
      },
      {
        property: 'calcium',
        title: 'Calcium (%)',
        align: 'right',
      },
      {
        property: 'iron',
        title: 'Iron (%)',
        fixed: 'right',
        align: 'right',
      },
      // editableColumn({
      //   columns: [
      //     {
      //       property: 'firstName',
      //       validate: (value: string) => boolean,
      //       input: (column: Column, row: Row, onChange: EventHandler): ReactNode =>
      //         <input type='text' onChange={onChange}/>,
      //     },
      //   ],
      //   onEdit: (rowId) => {},
      //   onCancel: (rowId) => {},
      //   onChange: (rowId, value) => {},
      //   onDelete: (rowId) => {},
      // }),
      // deletableColumn({
      //   onDeleteRequest: (rowId) => {},
      // }),
    ],
    changeRow: () => {
      vm.rows[3].id = Math.random().toString(36)
    }
  })
  return vm
}

export default mkViewModel
