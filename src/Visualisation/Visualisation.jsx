import React from 'react'
import * as mapboxgl from "mapbox-gl"
import extData from './InstitutionData_Ext.csv'
import * as d3 from "d3"
import 'mapbox-gl/dist/mapbox-gl.css'
import './Visualisation.css'

 class Visualisation extends React.Component {

     constructor (){
         super()
         this.createMap = this.createMap.bind(this)
     }

     componentDidMount() {
         d3.dsv(";", extData).then(this.createMap)
     }

     async readInstitutionData() {
         return await d3.dsv(";", extData).then(function(data){
             return data.filter(institution => institution.Latitude !== "failed" && institution.Longitude !== "failed")
         })
     }

     async createMap() {
        let InstitutionData = await this.readInstitutionData()
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

        let nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');
        let container = map.getCanvasContainer()

        //Create D3 entryPoints
        let svg = d3.select(container).append("svg")

        let div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)

        map.on("viewreset", () => this.updateInstitutions(InstitutionData,map,svg,div))
        map.on("move", () => this.updateInstitutions(InstitutionData,map,svg,div))

        this.updateInstitutions(InstitutionData,map,svg,div)
    }

     updateInstitutions(csvData,map,svg,div) {

         let d3Data = csvData.filter(function(d){let coord =  projectOnMap([d.Longitude,d.Latitude]); return ((coord.x <= 1400 && coord.x >= 0) && (coord.y <= 800 && coord.x >= 0))})

         let circles = svg.selectAll("circle")
             .data(d3Data)

         circles
             .enter()
             .append("circle")
             .attr("r", 4)
             .attr("stroke", "black")
             .attr("stroke-width", 2)
             .attr("fill", "red")
             .attr("opacity", 0.7)
             .attr("cx", function(d) { return projectOnMap([d.Longitude,d.Latitude]).x; })
             .attr("cy", function(d) { return projectOnMap([d.Longitude,d.Latitude]).y; })
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

         circles
             .exit()
             .remove()

         circles
             .attr("cx", function(d) { return projectOnMap([d.Longitude,d.Latitude]).x; })
             .attr("cy", function(d) { return projectOnMap([d.Longitude,d.Latitude]).y; })


         function projectOnMap(d) {
             const lon = parseFloat(d[0].replace(/,/g, '.'));
             const lat = parseFloat(d[1].replace(/,/g, '.'));

             return map.project(new mapboxgl.LngLat(lon, lat));
         }
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
