import React from 'react'
import * as mapboxgl from "mapbox-gl"
import InstitutionData from "../InstitutionData/InstitutionData"
import extData from '../InstitutionData/InstitutionData_Ext.csv'
import * as d3 from "d3"
import 'mapbox-gl/dist/mapbox-gl.css'
import './Visualisation.css'

 class Visualisation extends React.Component {

     async mapTest(csvData) {
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

         //D3 SVG erstellen
         let svg = d3.select(container).append("svg")


         let circle = svg.selectAll("circle")
             .data(InstitutionData)
             .enter()
             .append("circle")
             .attr("r", 4)
             .attr("stroke", "black")
             .attr("stroke-width", 2)
             .attr("fill", "red")
             .attr("opacity", 0.7)

         function update() {
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
