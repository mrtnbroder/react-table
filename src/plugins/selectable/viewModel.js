// @flow
import * as mobx from 'mobx'
import * as R from 'ramda'

export const mkSelectableRow = (rootStore) => {
  const vm = {
    selected: false,
    handleToggleSelected: mobx.action(() => {
      rootStore.selected = !rootStore.selected
    }),
    handleSelect: mobx.action(() => {
      rootStore.selected = !rootStore.selected
    }),
  }

  return vm
}

export const mkSelectable = (rootStore) => {
  const vm = {
    someSelected: mobx.computed(() =>
      rootStore.rows.some((x) => x.selected)
    ),
    allSelected: mobx.computed(() =>
      rootStore.rows.every((x) => x.selected)
    ),
    handleSelectAll: mobx.action(() => {
      const selected = !rootStore.allSelected

      rootStore.rows.forEach((row) => {
        row.selected = selected
      })
    }),
  }

  return vm
}
