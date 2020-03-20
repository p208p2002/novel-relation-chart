import React, { Component } from 'react'
import ChartView from './modules/chartModules'
import './App.css'
export class App extends Component {
  constructor(props) {
    super(props)
    this.Graph = undefined
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="d-none d-sm-block">
            <a class="github-fork-ribbon" href="https://github.com/p208p2002/novel-relation-chart" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
          </div>
          <br />
          <div className="text-center" style={{width:'100%'}}>
            <img
              style={{ maxWidth: '550px', width: '100%' }}
              src={require("./assets/imgs/logo.png")}
              alt="絕代雙驕人物關係圖"
              srcset="" />
            <br />
            <br />
          </div>
        </div>
        <ChartView width="100%" height="500px" />
      </div>
    )
  }
}

export default App
