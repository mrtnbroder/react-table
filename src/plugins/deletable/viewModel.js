// @flow
import * as mobx from 'mobx'
import * as R from 'ramda'

export const mkDeletable = (rootStore) => {
  const vm = {
    handleDelete: mobx.action((id) => {
      // this may seem slow, but is actually faster to render since we only
      // re-render one item in the list (actually removing it). If we'd map
      // over each row and assign a index to it dynamically, react would
      // re-render every item in the list, even though nothing changed.
      const row = rootStore.rows.find((x) => x.id === id)

      rootStore.rows.remove(row)
    }),
  }

  return vm
}
