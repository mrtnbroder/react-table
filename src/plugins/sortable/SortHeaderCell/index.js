// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

/**
 *  SortHeaderCell
 *
 *  Sorts columns by property or custom onSortChange method
 *
 *  @example
 *  const vm = mobx.observable({
 *    sortOrder: {
 *      columnKey: 'calories',
 *      order: 'desc',
 *    },
 *    onSortChange: mobx.action((property) => {
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
 *        vm.onSortChange(property)
 *      }
 *    }),
 *  })
 */

type Props = {
  align: string,
  property: string,
  children: React.ChildrenArray<*>,
  data: { [string]: any },
  width: number,
  first: boolean,
  last: boolean,
  onSortChange: (string) => void,
  order: {
    order?: 'asc' | 'desc',
    columnKey: string,
  },
  property: string,
}

class SortHeaderCell extends React.Component<Props> {

  onSortChange = (e) => {
    e.preventDefault()

    this.props.onSortChange(this.props.property)
  }

  render() {
    const {
      align,
      order,
      width,
      first,
      last,
      property,
      children,
    } = this.props
    const isActive = !!(order.columnKey === property && order.order)

    return (
      <th
        width={width}
        onClick={this.onSortChange}
        className={cx({
          'sort-header-cell': true,
          'sort-header-cell--active': isActive,
          'align-right': align === 'right',
          first,
          last
        })}
        >
        {isActive ? order.order === 'desc' ? '↓' : '↑' : ''}
        {children}
      </th>
    )
  }
}

SortHeaderCell.displayName = 'SortHeaderCell'

export default observer(SortHeaderCell)
