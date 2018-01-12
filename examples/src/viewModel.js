// @flow
// import * as React from 'react'
import * as mobx from 'mobx'
import * as R from 'ramda'
import rows, { mkObservable } from './data'
import mkEntry from './generate-rows'

const mkViewModel = (
  params,
  props,
  context,
) => {
  const vm = mobx.observable({
    rows,
    fixed: 'left',
    // SHARED AMONGST PLUGINS
    pending: false,
    totalCount: mobx.computed(() => vm.rows.length),
    // EDITABLE
    onToggleEdit: mobx.action((id) => {
      const row = vm.rows.find((x) => x.id === id)
      row.editing = !row.editing
    }),
    // DELETEABLE
    onDelete: mobx.action((id) => {
      // this may seem slow, but is actually faster to render since we only
      // re-render one item in the list (actually removing it). If we'd map
      // over each row and assign a index to it dynamically, react would
      // re-render every item in the list, even though nothing changed.
      const row = vm.rows.find((x) => x.id === id)
      vm.rows.remove(row)
    }),
    // SELECTABLE
    someSelected: mobx.computed(() =>
      vm.rows.some((x) => x.selected)
    ),
    allSelected: mobx.computed(() =>
      vm.rows.every((x) => x.selected)
    ),
    onSelectAll: mobx.action(() => {
      const selected = !vm.allSelected
      vm.rows.forEach((row) => {
        row.selected = selected
      })
    }),
    onSelect: mobx.action((id) => {
      const row = vm.rows.find((x) => x.id === id)
      row.selected = !row.selected
    }),
    // SORTABLE
    sortOrder: {
      columnKey: 'calories',
      order: 'desc',
    },
    // TODO: call sort on inital mount, otherwise it would show the arrow, even
    // though nothing is sorted actually
    onSortChange: mobx.action((property) => {
      if (vm.sortOrder.columnKey === property) {
        if (vm.sortOrder.order === null) {
          vm.sortOrder.order = 'desc'
          vm.rows = R.sortBy(R.prop(property), vm.rows)
        } else if (vm.sortOrder.order === 'desc') {
          vm.sortOrder.order = 'asc'
          vm.rows = R.reverse(R.sortBy(R.prop(property), vm.rows))
        } else if (vm.sortOrder.order === 'asc') {
          vm.sortOrder.order = null
          vm.rows = rows
        }
      } else {
        vm.sortOrder.order = null
        vm.sortOrder.columnKey = property
        vm.onSortChange(property)
      }
    }),
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
    changeDessert: () => {
      vm.rows[3].changeDessert()
    },
    addRow: () => {
      vm.rows.unshift(mkObservable({ ...mkEntry(), editing: true, dessert: '' }))
    },
  })
  return vm
}

export default mkViewModel
