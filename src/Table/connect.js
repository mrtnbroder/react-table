import * as React from 'react'
import * as mobx from 'mobx'
import { observer } from 'mobx-react'

const connect = (mkViewModel, component) =>
  class Connect extends React.Component {
    static defaultProps = mkViewModel.defaultProps
    static contextTypes = mkViewModel.contextTypes

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

      if (this.viewModel.componentWillReceiveProps) {
        this.viewModel.componentWillReceiveProps.bind(this)()
      }
    }

    componentDidMount() {
      if (this.viewModel.componentDidMount) {
        this.viewModel.componentDidMount.bind(this)()
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
