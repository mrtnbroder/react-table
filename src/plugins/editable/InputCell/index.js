// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import DefaultCell from '../../../DefaultCell'
import type { DefaultCellProps } from '../../../DefaultCell'

type Props = DefaultCellProps & {
  onSelect: (string) => void,
  pending: boolean,
  placeholder: string,
}

const ENTER = 13
const ESC = 27

class InputCell extends React.Component<Props> {

  handleChange = (e) => {
    this.props.data.onChange(this.props.property, e.currentTarget.value)
  }

  handleKeyDown = (e) => {
    if (e.keyCode === ENTER) {
      // this.props.onSave()
    } else if (e.keyCode === ESC) {
      // this.props.onCancel()
    }
  }

  handleFocus = (e) => {
    e.stopPropagation()
    // e.preventDefault()
  }

  handleBlur = (e) => {
    e.stopPropagation()
    // e.preventDefault()
  }

  render() {
    const {
      children,
      onSelect,
      pending,
      placeholder,
      ...props
    } = this.props

    return (
      <DefaultCell {...props}>
        {this.props.data.editing
          ? <input
              autoFocus
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder={placeholder}
              disabled={pending}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              type='text'
              value={this.props.data[this.props.property]}
              />
          : this.props.data[this.props.property]
        }
      </DefaultCell>
    )
  }
}

InputCell.displayName = 'InputCell'

export default observer(InputCell)
