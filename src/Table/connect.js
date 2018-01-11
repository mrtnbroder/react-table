import * as React from 'react'
import * as mobx from 'mobx'
import { observer } from 'mobx-react'

const connect = (mkViewModel, component) =>
  class Connect extends React.Component {
    constructor(props, ctx) {
      const params = {}

      super(props, ctx)
      this.observableProps = mobx.observable.shallowObject(props)
      this.component = observer(component)
      this.viewModel = mkViewModel(params, this.observableProps, ctx)
    }

    componentWillReceiveProps(nextProps) {
      mobx.extendShallowObservable(
        this.observableProps,
        nextProps
      )
    }

    componentDidMount() {
      if (this.viewModel.componentDidMount) {
        this.viewModel.componentDidMount()
      }
    }

    render() {
      return (
        React.createElement(
          this.component,
          { ...this.props, vm: this.viewModel }
        )
      )
    }
  }

export default connect
