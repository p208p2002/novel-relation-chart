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
    const elem = document.getElementById('3d-graph');
    const Graph = ForceGraph3D()
      (elem)
        .width(width)
        .height(height)
        .graphData(chartData)
        .linkOpacity(0.18)
        .linkWidth((link)=>{
          // console.log(link)
          // return 1
          return 1+link.value/15
        })
        .linkThreeObjectExtend(true)
        .linkThreeObject(link => {
          // extend link with text sprite
          const sprite = new SpriteText(`${link.source} > ${link.target} (${link.value})`);
          sprite.color = 'lightgrey';
          sprite.fontSize = 50
          sprite.textHeight = 3;
          return sprite;
        })
        .linkPositionUpdate((sprite, { start, end }) => {
          const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));

          // Position sprite
          Object.assign(sprite.position, middlePos);
        })
        .nodeAutoColorBy('id')
        .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
        .onNodeClick(node => {
          console.log('click')
          // Aim at node from outside it
          const distance = 40;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

          Graph.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
          );
        })
        .nodeThreeObject(node => {
          // use a sphere as a drag handle
          const obj = new THREE.Mesh(
            new THREE.SphereGeometry(10),
            new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
          );

          // add text sprite as child
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 25;
          obj.add(sprite);

          return obj;
        });

    // Spread nodes a little wider
    Graph.d3Force('charge').strength(-3000);
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
