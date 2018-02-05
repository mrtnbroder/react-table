// @flow
import * as React from 'react'
// import * as mobx from 'mobx'

import './App.css'
import mkViewModel from './viewModel'

import { Card } from 'react-material'

import {
  // SORTABLE
  SortHeaderCell,
  // SELECTABLE
  SelectHeaderCell,
  SelectCell,
  // DELETEABLE
  DeleteCell,
  // EDITABLE
  EditCell,
  InputCell,
  // CORE
  Column,
  Table,
  connect,
  // RecyclerView,
} from 'react-table'

const App = ({ vm }) => (
  <React.Fragment>
    <button onClick={vm.changeDessert}>Change Row 3 Dessert</button>
    <button onClick={vm.toggleFixed}>Toggle Fixed Column</button>
    <button onClick={vm.addRow}>Add Row</button>
    <button onClick={vm.switchRow}>Exchang Data of Random Row</button>
    <Card className='Card Card--center'>
      <header>
        <h2>Nutrition</h2>
      </header>
      <Table
        rowCount={7}
        rowHeight={48}
        pending={vm.pending}
        rows={vm.rows}
        totalRows={vm.totalRows}
        >
        <Column
          fixed={vm.fixed}
          property='selected'
          width={72}
          header={
            <SelectHeaderCell vm={vm}/>
          }
          cell={
            <SelectCell vm={vm}/>
          }
          />
        <Column
          property='dessert'
          width={203}
          header={
            <SortHeaderCell vm={vm}>
              Dessert (100g serving)
            </SortHeaderCell>
          }
          cell={
            <InputCell
              vm={vm}
              placeholder='Enter a dessert'
              />
          }
          />
        <Column
          align='right'
          property='calories'
          // width={108}
          header={
            <SortHeaderCell vm={vm}>
              Calories
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='fat'
          // width={92}
          header={
            <SortHeaderCell vm={vm}>
              Fat (g)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='carbs'
          // width={106}
          header={
            <SortHeaderCell vm={vm}>
              Carbs (g)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='protein'
          // width={113}
          header={
            <SortHeaderCell vm={vm}>
              Protein (g)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='sodium'
          // width={126}
          header={
            <SortHeaderCell vm={vm}>
              Sodium (mg)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='calcium'
          // width={121}
          header={
            <SortHeaderCell vm={vm}>
              Calcium (%)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='iron'
          // width={98}
          header={
            <SortHeaderCell vm={vm}>
              Iron (%)
            </SortHeaderCell>
          }
          />
        <Column
          fixed='right'
          // width={24}
          cell={
            <DeleteCell vm={vm}/>
          }
          />
        <Column
          fixed='right'
          // width={24}
          cell={
            <EditCell vm={vm}/>
          }
          />
      </Table>
    </Card>
  </React.Fragment>
)

export default connect(mkViewModel, App)
