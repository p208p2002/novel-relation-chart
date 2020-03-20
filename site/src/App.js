import React, { Component } from 'react'
import ChartView from './modules/chartModules'

export class App extends Component {
  constructor(props) {
    super(props)
    this.Graph = undefined
  }
  render() {
    return (
      <div className="container">
        <br/>
        <div className="text-center">
          <img 
            style={{maxWidth:'550px',width:'100%'}}
            src={require("./assets/imgs/logo.png")} 
            alt="絕代雙驕人物關係圖"
            srcset="" />
          <br />
          <br />
        </div>
        <ChartView width="100%" height="500px" />
      </div>
    )
  }
}

export default App
