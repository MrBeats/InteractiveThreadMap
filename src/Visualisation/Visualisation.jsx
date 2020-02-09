import React from 'react'
import * as mapboxgl from "mapbox-gl"
import InstitutionData from "../InstitutionData/InstitutionData"
import extData from '../InstitutionData/InstitutionData_Ext.csv'
import * as d3 from "d3"
import 'mapbox-gl/dist/mapbox-gl.css'
import './Visualisation.css'

 class Visualisation extends React.Component {

     mapTest(csvData) {
         //DatenCheck
         const InstitutionData = csvData.filter(institution => institution.Latitude !== "failed" && institution.Longitude !== "failed")
         console.log("Daten sind da:")
         console.log(InstitutionData)
         //Karte erstellen
         mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'
         let map = new mapboxgl.Map({
             container: 'map', // container id
             style: 'mapbox://styles/enjalot/cihmvv7kg004v91kn22zjptsc',
             center: [-10, 30],
             zoom: 2,
         })
         map.scrollZoom.enable()
         map.NavigationControl = new mapboxgl.NavigationControl()
         map.on("viewreset", update)
         map.on("move", update)

         let nav = new mapboxgl.NavigationControl();
         map.addControl(nav, 'top-left');
         let container = map.getCanvasContainer()

         let d3Data = InstitutionData.filter(function(d){let coord =  project([d.Longitude,d.Latitude]); return ((coord.x <= 1400 && coord.x >= 0) && (coord.y <= 800 && coord.x >= 0))})
         //D3 SVG erstellen
         let svg = d3.select(container).append("svg")

         let div = d3.select("body").append("div")
             .attr("class", "tooltip")
             .style("opacity", 0);

         let circle = svg.selectAll("circle")
             .data(d3Data)
             .enter()
             .append("circle")
             .attr("r", 4)
             .attr("stroke", "black")
             .attr("stroke-width", 2)
             .attr("fill", "red")
             .attr("opacity", 0.7)

             .on("mouseover", function(d) {
                 div.transition()
                     .duration(200)
                     .style("opacity", .9);
                 div.html(d.name + "<br/><br/>"  + d.Adresse)
                     .style("left", (d3.event.pageX) + "px")
                     .style("top", (d3.event.pageY - 28) + "px");
             })
             .on("mouseout", function(d) {
                 div.transition()
                     .duration(500)
                     .style("opacity", 0);
             })


         function update() {
             d3Data = InstitutionData.filter(function(d){let coord =  project([d.Longitude,d.Latitude]); return ((coord.x <= 1400 && coord.x >= 0) && (coord.y <= 800 && coord.x >= 0))})

             //console.log(d3Data.length)

             //console.log(circle)
             //console.log(circle.exit())
             //console.log(circle.enter())

             circle
                 .exit().remove()
             circle
                 .enter()
                 .append("circle")
                 .attr("r", 4)
                 .attr("stroke", "black")
                 .attr("stroke-width", 2)
                 .attr("fill", "red")
                 .attr("opacity", 0.7)
             circle
                 .attr("cx", function(d) { return project([d.Longitude,d.Latitude]).x; })
                 .attr("cy", function(d) { return project([d.Longitude,d.Latitude]).y; })
         }

         function project(d) {
             //console.log("KEKSE")
             //console.log(d)
             const lon = parseFloat(d[0].replace(/,/g, '.'));
             const lat = parseFloat(d[1].replace(/,/g, '.'));

             //console.log(lon)
             //console.log(lat)
             return map.project(new mapboxgl.LngLat(lon, lat));
         }

         update()
     }

     componentDidMount() {
         d3.dsv(";", extData).then(this.mapTest)
     }

     render() {
        return (
            <div id="map" ref="karte" style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '1400px',
                height: '800px',
            }}>
            </div>
        );
    }
}
export default Visualisation
