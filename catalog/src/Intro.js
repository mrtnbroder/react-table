
import React, { PureComponent } from 'react'

class Intro extends PureComponent {
  render() {
    return (
      <div className='rm-c'>
        <div className='rm-c-header'>
          <h2>Welcome to React</h2>
        </div>
        <p className='rm-c-intro'>
          To get started, edit <code>src/Intro.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default Intro
