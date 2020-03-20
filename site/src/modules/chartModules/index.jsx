import ForceGraph3D from '3d-force-graph';
import React, { Component } from 'react'

export class Index extends Component {
  constructor(props){
    super(props)
    this.Graph = undefined
  }
  componentDidMount() {
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id - 1))
        }))
    };
    var width = document.getElementById('3d-graph').offsetWidth
    var height = document.getElementById('3d-graph').offsetHeight
    console.log(width,height)
    this.Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
        .width(width)
        .height(height)
        .graphData(gData);
  }
  render() {
    return (
      <div style={{width:this.props.width,height:this.props.height}}>
          <div id="3d-graph" style={{width:'100%',height:'100%'}}></div>
      </div>
    )
  }
}

export default Index
