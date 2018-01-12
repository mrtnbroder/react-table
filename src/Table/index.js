// @flow
import { observer } from 'mobx-react'
import * as React from 'react'
import cx from 'classnames'

import Row from '../Row'
import TextCell from '../TextCell'
import SortHeaderCell from '../plugins/sortable/SortHeaderCell'

import mkViewModel from './viewModel'
import connect from './connect'

import type { ViewModel } from './viewModel'

type Props = {
  rows: Array<{ [string]: any }>,
  vm: ViewModel,
  children: React.ChildrenArray<*>,
  headerCellHeight: number,
  pending: boolean,
  rowCount: number,
  totalCount: number,
  rowHeight: number,
}

const getStyles = ({
  columnsCount,
  fixedColumnsCount,
  columnsWidth,
  rowCount,
  rowHeight,
  headerCellHeight,
}) => ({
  __html: `
.tables-container {
  position: relative;
  height: ${rowCount * rowHeight + headerCellHeight}px;
  overflow: hidden;
}

.tables {
  display: flex;
}

.fixed-table-center {
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1 1 auto;
}

.fixed-table-left {
  flex: 1 0 auto;
  height: ${rowCount * rowHeight + headerCellHeight}px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: box-shadow 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15)
}

.fixed-table-left--box-shadow {
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 1, 1);
  box-shadow: 4px 0 6px 0 rgba(0, 0, 0, 0.15)
}

.fixed-table-right {
  flex: 1 0 auto;
  height: ${rowCount * rowHeight + headerCellHeight}px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: box-shadow 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15)
}

.fixed-table-right--box-shadow {
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 1, 1);
  box-shadow: -4px 0 6px 0 rgba(0, 0, 0, 0.15);
}

.table-inner,
.table-data {
  overflow-x: hidden;
  overflow-y: auto;
  height: ${rowCount * rowHeight}px;
}

.table {
  border: 0;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  white-space: nowrap;

  font-family: 'Roboto', sans-serif;
}

.table-header {
  position: relative;
}

.table-inner--center,
.table-header--center {
  width: ${columnsWidth}px;
  max-width: ${columnsWidth}px;
}

th, td {
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 48px;
}

td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: ${rowHeight}px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 13px;
  padding-right: 24px;
}

th {
  height: ${headerCellHeight}px;
  font-weight: 500;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  padding-right: 24px;
}

.sort-header-cell {
  cursor: pointer;
}

.sort-header-cell--active {
  color: rgba(0, 0, 0, 0.87);
}

tr {
  background-color: #fff;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.12);
  transition: background-color 150ms cubic-bezier(0.4, 0.0, 0.6, 1);;
}

.row--selected {
  background-color: #F5F5F5;
}

.row--hover {
  background-color: #eee;
}

.align-right {
  text-align: right;
  padding-right: 56px;
}

.first {
  padding-left: 24px;
}

.last {
  padding-right: 24px;
}

.table-footer {
  overflow: hidden;
  height: ${headerCellHeight}px;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
}

.table-footer span {
  vertical-align: middle;
  font-size: 13px;
  line-height: 56px;
  display: block;
}
`
})

const FixedTable = observer(({ children, side, rows, vm }) => (
  <div className={`fixed-table fixed-table-${side}`}>
    <table className={`table table-header table-header--${side}`}>
      <thead>
        <tr>
          {React.Children.map(children, (column) =>
            React.cloneElement(column.props.header, {
              map: vm.map,
              first: column.props.first,
              last: column.props.last,
              width: column.props.width,
              property: column.props.property,
              align: column.props.align,
            })
          )}
        </tr>
      </thead>
    </table>
    <div className={`table-inner table-inner--${side}`}>
      <table className={`table table-data table-data--${side}`}>
        <tbody>
          {rows.map((data, idx) =>
            <Row
              data={data}
              key={data.id}
              map={vm.map}
              onMouseEnter={vm.handleRowMouseEnter}
              onMouseLeave={vm.handleRowMouseLeave}
              >
              {React.Children.map(children, (column) =>
                React.cloneElement(column.props.cell, {
                  map: vm.map,
                  first: column.props.first,
                  last: column.props.last,
                  width: column.props.width,
                  property: column.props.property,
                  align: column.props.align,
                  data,
                })
              )}
            </Row>
          )}
        </tbody>
      </table>
    </div>
  </div>
))

FixedTable.displayName = 'FixedTable'

FixedTable.defaultProps = {
  side: 'center',
}

const Table = ({
  headerCellHeight,
  rowCount,
  rowHeight,
  totalCount,
  rows,
  vm,
}: Props) => {
  return (
    <React.Fragment>
      <style dangerouslySetInnerHTML={getStyles({
        rowHeight,
        rowCount,
        headerCellHeight,
        columnsWidth: vm.columnsWidth,
        columnsCount: vm.columnsCount,
        fixedColumnsCount: vm.fixedColumnsCount,
      })}/>
      <div className='tables-container'>
        <div className='tables'>
          <FixedTable
            side='left'
            rows={rows}
            vm={vm}
            >
            {vm.columns.left}
          </FixedTable>
          <FixedTable
            rows={rows}
            map={vm.map}
            vm={vm}
            >
            {vm.columns.center}
          </FixedTable>
          <FixedTable
            side='right'
            rows={rows}
            vm={vm}
            >
            {vm.columns.right}
          </FixedTable>
        </div>
      </div>
      <div className='table-footer'>
        <span>Showing 1 - 10 of {totalCount}</span>
      </div>
    </React.Fragment>
  )
}

Table.displayName = 'Table'

Table.defaultProps = {
  headerCellHeight: 56,
  rowCount: 7,
  rowHeight: 48,
  rows: [],
}

export default connect(mkViewModel, Table)
