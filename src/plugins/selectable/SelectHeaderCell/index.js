// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

/**
 *  SelectHeaderCell
 *
 *  Sorts columns by property or custom onSelectAll method
 *
 *  @example
 *  const vm = mobx.observable({
 *    onSelect: mobx.action((rowId) => {
 *      if (vm.sortOrder.columnKey === property) {
 *        if (vm.sortOrder.order === null) {
 *          vm.sortOrder.order = 'desc'
 *          vm.rows = R.sortBy(R.prop(property), vm.rows)
 *        } else if (vm.sortOrder.order === 'desc') {
 *          vm.sortOrder.order = 'asc'
 *          vm.rows = R.reverse(R.sortBy(R.prop(property), vm.rows))
 *        } else if (vm.sortOrder.order === 'asc') {
 *          vm.sortOrder.order = null
 *          vm.rows = rows
 *        }
 *      } else {
 *        vm.sortOrder.order = null
 *        vm.sortOrder.columnKey = property
 *        vm.onSelectAll(property)
 *      }
 *    }),
 *  })
 */

type Props = {
  align: string,
  checked: boolean,
  children: React.ChildrenArray<*>,
  first: boolean,
  last: boolean,
  onSelectAll: () => void,
  pending: boolean,
  width: number,
}

class SelectHeaderCell extends React.Component<Props> {

  node = null

  componentWillReceiveProps(nextProps) {
    if (nextProps.someSelected && !nextProps.checked) {
      this.node.indeterminate = true
    } else if (nextProps.checked || !nextProps.someSelected) {
      this.node.indeterminate = false
    }
  }

  onSelectAll = (e) => {
    e.stopPropagation()
    this.props.onSelectAll()
  }

  setRef = (node) => {
    this.node = node
  }

  render() {
    const {
      align,
      width,
      first,
      last,
      pending,
      children,
      checked,
      onSelectAll,
    } = this.props

    return (
      <th
        width={width}
        className={cx({
          'align-right': align === 'right',
          first,
          last
        })}
        >
        <input
          checked={checked}
          onChange={this.onSelectAll}
          ref={this.setRef}
          disabled={pending}
          type='checkbox'
          />
      </th>
    )
  }
}

SelectHeaderCell.displayName = 'SelectHeaderCell'

export default observer(SelectHeaderCell)
