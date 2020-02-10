import React from 'react'
import * as mapboxgl from "mapbox-gl"
import * as d3 from "d3"
import 'mapbox-gl/dist/mapbox-gl.css'
import './Visualisation.css'

import * as Institutions from '../Institutions/Institutions'
import * as Fire from '../FireData/Fire'
import * as Terror from '../Terror/Terror'
import * as Corona from '../Corona/Corona'

 class Visualisation extends React.Component {

     constructor (){
         super()
         this.createMap = this.createMap.bind(this)
     }

     componentDidMount() {
         this.createMap()
     }

     async createMap() {
         // Karte erstellen -------------------------------------------------------------------------------------------
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

         // Aquire Data -----------------------------------------------------------------------------------------------
         let InstitutionData = await Institutions.readInstitutionData()
         let FireData = await Fire.readFireData()
         let TerrorData = await Terror.readTerrorData()
         let CoronaWorldData = await Corona.readCoronaWorldData()
         let CountryCodes = await Corona.readCountryCodesData()
         console.log(InstitutionData)
         console.log(FireData)
         console.log(TerrorData)
         console.log(CoronaWorldData)
         console.log(CountryCodes)

         // Create Institution Canvas ---------------------------------------------------------------------------------
         let canvas = d3.select(container).append("canvas")
             .attr('width', 1400)
             .attr('height', 800)
         let context = canvas.node().getContext('2d')

         let div = d3.select("body").append("div")
             .attr("class", "tooltip")
             .style("opacity", 0)

         map.on("viewreset", () => Institutions.updateInstitutions(InstitutionData,map,div,context))
         map.on("move", () => Institutions.updateInstitutions(InstitutionData,map,div,context))

         // Create Fire Canvas ----------------------------------------------------------------------------------------
         let svgFire = d3.select(container).append("svg")
         // map.on("viewreset", () => Fire.updateFire(FireData,map,svgFire,div))
         //map.on("move", () => Fire.updateFire(FireData,map,svgFire,div))

         // Create Fire Canvas ----------------------------------------------------------------------------------------
         let svgTerror = d3.select(container).append("svg")
         //map.on("viewreset", () => Terror.updateTerror(TerrorData,map,svgTerror,div))
         //map.on("move", () => Terror.updateTerror(TerrorData,map,svgTerror,div))


         // Do First Data Update --------------------------------------------------------------------------------------
         //Fire.updateFire(FireData,map,svgFire,div)
         //Terror.updateTerror(TerrorData,map,svgTerror,div)
         Institutions.updateInstitutions(InstitutionData,map,div,context)
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
