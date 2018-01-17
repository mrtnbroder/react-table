// @flow
import * as mobx from 'mobx'
import * as R from 'ramda'

export const mkSortable = (rootStore, rows) => {
  const vm = {
    sortOrder: {
      columnKey: null,
      order: null,
    },
    // TODO: call sort on inital mount, otherwise it would show the arrow, even
    // though nothing is sorted actually
    handleSortChange: mobx.action((property) => {
      if (rootStore.sortOrder.columnKey === property) {
        if (rootStore.sortOrder.order === null) {
          rootStore.sortOrder.order = 'desc'
          rootStore.rows = R.sortBy(R.prop(property), rootStore.rows)
        } else if (rootStore.sortOrder.order === 'desc') {
          rootStore.sortOrder.order = 'asc'
          rootStore.rows = R.reverse(R.sortBy(R.prop(property), rootStore.rows))
        } else if (rootStore.sortOrder.order === 'asc') {
          rootStore.sortOrder.order = null
          // TODO: reset to inital rows state
          rootStore.rows = rows
        }
      } else {
        rootStore.sortOrder.order = null
        rootStore.sortOrder.columnKey = property
        rootStore.handleSortChange(property)
      }
    }),
  }

  return vm
}
