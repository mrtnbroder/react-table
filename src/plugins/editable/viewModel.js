// @flow
import * as mobx from 'mobx'
import * as R from 'ramda'

export const mkEditableRow = (rootStore) => {
  const vm = {
    editing: false,
    handleChange: mobx.action((property, value) => {
      rootStore[property] = value
    }),
    handleToggleEditing: mobx.action(() => {
      rootStore.editing = !rootStore.editing
    }),
  }

  return vm
}
