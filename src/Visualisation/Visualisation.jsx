import React from 'react'
import * as mapboxgl from "mapbox-gl"
import * as d3 from "d3"
import 'mapbox-gl/dist/mapbox-gl.css'
import './Visualisation.css'

import * as Institutions from '../Institutions/Institutions'
import * as Fire from '../FireData/Fire'
import * as Terror from '../Terror/Terror'
import * as Corona from '../Corona/Corona'
import InstitutionFocusBar from "../InstitutionFocusBar/InstitutionFocusBar";

 class Visualisation extends React.Component {
     constructor (){
         super()
         this.createMap = this.createMap.bind(this)
         this.flyToLatLon = this.flyToLatLon.bind(this);

         this.state = {
             map: null,
             InstMapMove: () => {},
             FireMapMove: () => {},
             TerrorMapMove: () => {},
             CoronaMapMove: () => {},

             InstCanvas: null,
             FireCanvas: null,
             TerrorCanvas: null,
             CoronaCanvas: null,
         }
     }

     async componentDidMount() {
         mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'
         this.setState({
             map: new mapboxgl.Map({
                 container: 'map', // container id
                 style: 'mapbox://styles/enjalot/cihmvv7kg004v91kn22zjptsc',
                 center: [-10, 30],
                 zoom: 2,
             })
         },async () => {
             await this.createMap()
         })

     }

     flyToLatLon(lat,lon) {
         const {map} = this.state
         map.flyTo({
             center: new mapboxgl.LngLat(lon, lat),
             essential: true,
             zoom: 9
         });
     }

     changeCanvasVisibility(canvas,layer) {
         console.log(canvas,layer)
         if(canvas){
             if(canvas.style("display") != "none") {
                 canvas.style("display", "none")
                 if (layer === "Institute") {
                     const {map} = this.state
                     map.off("viewreset", this.state.InstMapMove)
                     map.off("move", this.state.InstMapMove)
                 }
             } else {
                 canvas.attr("style","null")
                 canvas.style("display", "null")
                 if (layer === "Institute") {
                     const {map} = this.state
                     map.on("viewreset", this.state.InstMapMove)
                     map.on("move", this.state.InstMapMove)
                     this.state.InstMapMove()
                 }
             }
         }
     }

     async createMap() {
         const {map} = this.state
         // Karte erstellen -------------------------------------------------------------------------------------------
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

         // Create Institution Canvas ---------------------------------------------------------------------------------
         this.setState({InstCanvas: d3.select(container).append("canvas").attr('width', 1400).attr('height', 800)}, () => {
             let InstitutionContext = this.state.InstCanvas.node().getContext('2d')
             let div = d3.select("body").append("div")
                 .attr("class", "tooltip")
                 .style("opacity", 0)

             this.setState({InstMapMove: () => Institutions.updateInstitutions(InstitutionData,map,div,InstitutionContext)}, () => {
                 map.on("viewreset", this.state.InstMapMove)
                 map.on("move", this.state.InstMapMove)
             })

             map.on('mousemove', function(e) {
                 let institutionsUnderMouse = Institutions.checkIfExists(e,InstitutionData,map)
                 if (institutionsUnderMouse !== false) {
                     div.transition()
                         .duration(200)
                         .style("opacity", .9)
                     let htmlString = ""

                     institutionsUnderMouse.forEach(inst => htmlString += inst.name + "<br/>" + inst.Adresse + "<br/><br/>")

                     div.html(htmlString)
                         .style("left", (e.point.x + 350) + "px")
                         .style("top", (e.point.y - 28) + "px")
                         .style("height", (institutionsUnderMouse.length * 65) + "px")
                 }
                 else {
                     div.transition()
                         .duration(500)
                         .style("opacity", 0);
                 }
             })
             Institutions.updateInstitutions(InstitutionData,map,div,InstitutionContext)
         })
         // Create Fire Canvas ----------------------------------------------------------------------------------------
         let FireCanvas = d3.select(container).append("canvas")
             .attr('width', 1400)
             .attr('height', 800)
         let FireContext = FireCanvas.node().getContext('2d')

         //map.on("viewreset", () => Fire.updateFire(FireData,map,div,FireContext))
         //map.on("move", () => Fire.updateFire(FireData,map,div,FireContext))

         // Create Terror Canvas --------------------------------------------------------------------------------------
         let TerrorCanvas = d3.select(container).append("canvas")
             .attr('width', 1400)
             .attr('height', 800)
         let TerrorContext = TerrorCanvas.node().getContext('2d')

         //map.on("viewreset", () => Terror.updateTerror(TerrorData,map,div,TerrorContext))
         //map.on("move", () => Terror.updateTerror(TerrorData,map,div,TerrorContext))

         // Do First Data Update --------------------------------------------------------------------------------------
         //Fire.updateFire(FireData,map,div,FireContext)
         //Terror.updateTerror(TerrorData,map,div,TerrorContext)

         //Corona.updateCorona(CoronaWorldData,map)
    }

     render() {
         const {map,InstCanvas} = this.state
        return (
            <div>
                <InstitutionFocusBar flyTo={this.flyToLatLon}/>
                <input id="input2" type="checkbox" name="InstituteToggle" value="Institute" defaultChecked={InstCanvas?InstCanvas.style("display") != "none":true} onChange={() => this.changeCanvasVisibility(InstCanvas,"Institute")} />
                <div id="map" ref="karte" style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '1400px',
                    height: '800px',
                }}>
                </div>
            </div>
        );
    }
}
export default Visualisation
