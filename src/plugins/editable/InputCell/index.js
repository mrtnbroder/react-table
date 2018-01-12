// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

type Props = {
  align: string,
  children: React.ChildrenArray<*>,
  data: { id: string, [string]: any },
  first: boolean,
  last: boolean,
  onSelect: (string) => void,
  pending: boolean,
  placeholder: string,
  property: string,
  width: number,
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
      align,
      children,
      onSelect,
      pending,
      width,
      placeholder,
      first,
      last,
      data,
    } = this.props

    return (
      <td
        className={cx({
          'align-right': align === 'right',
          first,
          last
        })}
        width={width}
        >
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
      </td>
    )
  }
}

InputCell.displayName = 'InputCell'

export default observer(InputCell)
