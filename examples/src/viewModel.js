// @flow
// import * as React from 'react'
import * as mobx from 'mobx'
// import * as R from 'ramda'
import rows, { mkRow } from './data'
import mkData from './generate-rows'

import { mkDeletable, mkSelectable, mkSortable } from 'react-table'

const mkViewModel = (
  params,
  props,
  context,
) => {
  const vm = mobx.observable()

  mobx.extendObservable(vm, {
    // SHARED AMONGST PLUGINS
    rows,
    pending: false,
    totalRows: mobx.computed(() => vm.rows.length),
    // TEST STUFF
    fixed: 'left',
    toggleFixed: mobx.action(() => {
      if (vm.fixed === null) {
        vm.fixed = 'left'
      }
      else if (vm.fixed === 'left') {
        vm.fixed = 'right'
      }
      else if (vm.fixed === 'right') {
        vm.fixed = null
      }
    }),
    changeDessert: mobx.action(() => {
      vm.rows[3].dessert = Math.random().toString(36)
    }),
    switchRow: mobx.action(() => {
      const newRow = mkData({ editing: true })
      const oldRow = vm.rows[Math.floor(Math.random() * (vm.rows.length - 1)) + 1]

      Object.keys(newRow).forEach((key) => {
        oldRow[key] = newRow[key]
      })
    }),
    addRow: () => {
      vm.rows.unshift(mkRow(mkData({ editing: true, dessert: '' })))
    },
    ...mkDeletable(vm),
    ...mkSelectable(vm),
    ...mkSortable(vm, rows),
  })

  return vm
}

export default mkViewModel
