// @flow
import { observer } from 'mobx-react'
import * as React from 'react'
import cx from 'classnames'

import Column from '../Column'
import Row from '../Row'

import mkViewModel from './viewModel'
import connect from './connect'

import type { ViewModel } from './viewModel'

type Props = {
  children: React.ChildrenArray<React.Element<typeof Column>>,
  headerCellHeight: number,
  pending: boolean,
  rowCount: number,
  rowHeight: number,
  rows: Array<{ [string]: any }>,
  totalRows: number,
  vm: ViewModel,
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
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  will-change: box-shadow; /* TODO: set this dynamically */
}

.fixed-table-left--box-shadow {
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 1, 1);
  box-shadow: 4px 0 6px 0 rgba(0, 0, 0, 0.15);
}

.fixed-table-right {
  flex: 1 0 auto;
  height: ${rowCount * rowHeight + headerCellHeight}px;
  position: relative;
  z-index: 1;
  transition: box-shadow 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  will-change: box-shadow; /* TODO: set this dynamically */
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
  /* contain: content or layout, need to figure this out more. may want this on every table row; */
  font-family: 'Roboto', sans-serif;
}

.table-header {
  position: relative;
}

.table-inner {
  transform: translateZ(0);
}

.table-inner--center,
.table-header--center {
  width: ${columnsWidth}px;
  max-width: ${columnsWidth}px;
}

.table-inner--left,
.table-inner--right {
  will-change: scroll-position;
}

th, .cell {
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 48px;
}

.cell {
  white-space: nowrap;
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

.row {
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

.tables .fixed-table:last-child tr td:last-child,
.tables .fixed-table:last-child tr th:last-child {
  padding-left: 0;
  padding-right: 24px;
}

.tables .fixed-table:first-child tr td:first-child,
.tables .fixed-table:first-child tr th:first-child {
  padding-right: 0;
  padding-left: 24px;
}

.table-footer {
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

const FixedTable = observer(({ children, side, rows }) => (
  <div className={`fixed-table fixed-table-${side}`}>
    <table className={`table table-header table-header--${side}`}>
      <thead>
        <tr>
          {React.Children.map(children, (column) =>
            React.cloneElement(column.props.header, {
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
              key={data.index}
              >
              {React.Children.map(children, (column) =>
                React.cloneElement(column.props.cell, {
                  align: column.props.align,
                  data,
                  property: column.props.property,
                  width: column.props.width,
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
  totalRows,
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
              >
              {vm.columns.left}
            </FixedTable>
            <FixedTable
              rows={rows}
              >
              {vm.columns.center}
            </FixedTable>
            <FixedTable
              side='right'
              rows={rows}
              >
              {vm.columns.right}
            </FixedTable>
          </div>
      </div>
      <div className='table-footer'>
        <span>Showing {vm.rowPositionTop} - {vm.rowPositionBottom} of {totalRows}</span>
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
