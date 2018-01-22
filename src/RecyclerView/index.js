// @flow
import * as React from 'react'
import * as R from 'ramda'

import connect from '../Table/connect'
import mkViewModel from './viewModel'

export type Props = {
  rows: Array<*>,
  container: React.Element<*>,
  children: (any) => React.ChildrenArray<*>,
  vm: any, // ViewModel
}

class RecycleView extends React.Component<Props> {
  render() {
    const {
      children,
      container,
      vm,
    } = this.props

    return (
      React.cloneElement(
        container, null,
        <tbody>
          {children(vm.items)}
        </tbody>
      )
    )
  }
}

RecycleView.displayName = 'RecycleView'

export default connect(mkViewModel, RecycleView)
