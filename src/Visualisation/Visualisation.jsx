import React from 'react';
import * as d3 from "d3";
import * as topojson from "topojson";


 class Visualisation extends React.Component {

     helloWorld() {
         d3.select(this.refs.karte).append("p").text("Hello World");
     }

     mapTest() {
         let width = 960,
             height = 500;

         let projection = d3.geoMercator()
             .center([0, 5 ])
             .scale(150)
             .rotate([-180,0]);

         let svg = d3.select(this.refs.karte).append("svg")
             .attr("width", width)
             .attr("height", height);

         let path = d3.geoPath()
             .projection(projection);

         let g = svg.append("g");

         d3.json("world.json").then(function(topology) {

             g.selectAll("path")
                 .data(topojson.feature(topology, topology.objects.countries).features)
                 .enter().append("path")
                 .attr("d", path)
                 .attr("stroke", "white")
                 .attr("stroke-width", "0.25px")
                 .attr("fill", "grey")

         });
     }

     componentDidMount() {
         this.mapTest()
     }

     render() {
        return (
            <div ref="karte">

            </div>
        );
    }
}
export default Visualisation
