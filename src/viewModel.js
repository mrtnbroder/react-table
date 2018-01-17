// @flow
import * as mobx from 'mobx'
import * as R from 'ramda'

export const mkDefaultRow = (rootStore) => {
  const vm = {
    hover: false,
    handleRowMouseEnter: mobx.action(() => {
      rootStore.hover = true
    }),
    handleRowMouseLeave: mobx.action(() => {
      rootStore.hover = false
    }),
    handleRowClick: mobx.action(() => {
      rootStore.selected = !rootStore.selected
    }),
  }

  return vm
}
