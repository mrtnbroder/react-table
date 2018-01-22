
import * as React from 'react'
import { render } from 'react-dom'
import DevTools from 'mobx-react-devtools'
import RecyclerTest from './RecyclerTest'
import './index.css'

render(
  <React.Fragment>
    <RecyclerTest/>
    <DevTools/>
  </React.Fragment>,
  document.getElementById('root')
)
