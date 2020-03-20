import ForceGraph3D from '3d-force-graph';
import React, { Component } from 'react'
import SpriteText from 'three-spritetext';
import chartData from '../../assets/chart_data.json'
var THREE = require('three');

export class Index extends Component {
  constructor(props){
    super(props)
    this.Graph = undefined
  }
  componentDidMount() {
    // console.log(chartData)
    // const N = 300;
    // const gData = {
    //   nodes: [...Array(N).keys()].map(i => ({ id: i })),
    //   links: [...Array(N).keys()]
    //     .filter(id => id)
    //     .map(id => ({
    //       source: id,
    //       target: Math.round(Math.random() * (id - 1))
    //     }))
    // };
    // var width = document.getElementById('3d-graph').offsetWidth
    // var height = document.getElementById('3d-graph').offsetHeight
    // console.log(width,height)
    // this.Graph = ForceGraph3D()
    //   (document.getElementById('3d-graph'))
    //     .width(width)
    //     .height(height)
    //     .graphData(gData)
    //     .nodeRelSize(12);

    var width = document.getElementById('3d-graph').offsetWidth
    var height = document.getElementById('3d-graph').offsetHeight
    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
        .width(width)
        .height(height)
        .graphData(chartData)
        .linkWidth((link)=>{
          console.log(link)
          return link.value
        })
        .nodeAutoColorBy('group')
        .nodeThreeObject(node => {
          // use a sphere as a drag handle
          const obj = new THREE.Mesh(
            new THREE.SphereGeometry(10),
            new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
          );

          // add text sprite as child
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 8;
          obj.add(sprite);

          return obj;
        });

    // Spread nodes a little wider
    Graph.d3Force('charge').strength(-300);
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
