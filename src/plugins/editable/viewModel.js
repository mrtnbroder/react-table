// @flow
import * as mobx from 'mobx'
import * as R from 'ramda'

const mkViewModel = () => {
  const vm = mobx.observable({
    map: mobx.observer.map(),
    // EDITABLE
    handleToggleEdit: mobx.action((id) => {
      vm.map.set(id, true)
    }),
  })
  return vm
}

export default mkViewModel
