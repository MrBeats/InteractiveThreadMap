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

             InstCanvas: null,
             FireCanvas: null,
             TerrorCanvas: null,
         }
     }

     async componentDidMount() {
         mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'
         this.setState({
             map: new mapboxgl.Map({
                 container: 'map', // container id
                 style: 'mapbox://styles/enjalot/cihmvv7kg004v91kn22zjptsc',
                 center: [10, 52],
                 zoom: 5.3,
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

     mapLayerToggle(name) {
         const {map} = this.state
         if(map) {
             if(map.isStyleLoaded()) {
                 if (name === "Corona") {
                     if (map.getLayoutProperty("corona","visibility") === "none") {
                         map.setLayoutProperty("corona", 'visibility', 'visible');
                     }
                     else {
                         map.setLayoutProperty("corona", 'visibility', 'none');
                     }
                 }
             }
         }

     }

     changeCanvasVisibility(canvas,layer) {
         console.log(canvas,layer)
         if(canvas){
             if(canvas.style("display") !== "none") {
                 canvas.style("display", "none")
                 const {map} = this.state
                 if (layer === "Institute") {
                     map.off("viewreset", this.state.InstMapMove)
                     map.off("move", this.state.InstMapMove)
                 }
                 else if (layer === "Fire") {
                     map.off("viewreset", this.state.FireMapMove)
                     map.off("move", this.state.FireMapMove)
                 }
                 else if (layer === "Terror") {
                     map.off("viewreset", this.state.TerrorMapMove)
                     map.off("move", this.state.TerrorMapMove)
                 }

             } else {
                 canvas.attr("style","null")
                 canvas.style("display", "null")
                 const {map} = this.state
                 if (layer === "Institute") {
                     map.on("viewreset", this.state.InstMapMove)
                     map.on("move", this.state.InstMapMove)
                     this.state.InstMapMove()
                 }
                 else if (layer === "Fire") {
                     map.on("viewreset", this.state.FireMapMove)
                     map.on("move", this.state.FireMapMove)
                     this.state.FireMapMove()
                 }
                 else if (layer === "Terror") {
                     map.on("viewreset", this.state.TerrorMapMove)
                     map.on("move", this.state.TerrorMapMove)
                     this.state.TerrorMapMove()
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
             let div = d3.select("#map").append("div")
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
                         .style("left", (e.point.x + 50) + "px")
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
         this.setState({FireCanvas: d3.select(container).append("canvas").attr('width', 1400).attr('height', 800)}, () => {
             let FireContext = this.state.FireCanvas.node().getContext('2d')

             this.setState({FireMapMove: () => Fire.updateFire(FireData,map,[],FireContext)}, () => {
                 map.on("viewreset", this.state.FireMapMove)
                 map.on("move", this.state.FireMapMove)
             })

             Fire.updateFire(FireData,map,[],FireContext)
         })
         // Create Terror Canvas --------------------------------------------------------------------------------------
         this.setState({TerrorCanvas: d3.select(container).append("canvas").attr('width', 1400).attr('height', 800)}, () => {
             let TerrorContext = this.state.TerrorCanvas.node().getContext('2d')

             this.setState({TerrorMapMove: () => Terror.updateTerror(TerrorData,map,[],TerrorContext)}, () => {
                 map.on("viewreset", this.state.TerrorMapMove)
                 map.on("move", this.state.TerrorMapMove)
             })

             Terror.updateTerror(TerrorData,map,[],TerrorContext)
         })
         // Do First Data Update --------------------------------------------------------------------------------------
         console.log(CoronaWorldData,map)
         Corona.updateCorona(CoronaWorldData,map)
    }

     render() {
        const {map,InstCanvas, FireCanvas, TerrorCanvas, CoronaCanvas} = this.state
        return (
            <div>
                <div id='searchbar'>
                    <InstitutionFocusBar flyTo={this.flyToLatLon}/>
                </div>
                <div id='boxes'>
                    <label id='toggleFire'>
                        Show fire data
                        <input type="checkbox" defaultChecked={FireCanvas?FireCanvas.style("display") != "none":true} onChange={() => this.changeCanvasVisibility(FireCanvas,"Fire")} />
                    </label>
                    <label id='toggleTerror'>
                        Show terror data
                        <input type="checkbox" defaultChecked={TerrorCanvas?TerrorCanvas.style("display") != "none":true} onChange={() => this.changeCanvasVisibility(TerrorCanvas,"Terror")} />
                    </label>
                    <label id='toggleCorona'>
                        Show corona data
                        <input type="checkbox" defaultChecked={map?map.getLayoutProperty("corona","visibility") == "visible":true} onChange={() => this.mapLayerToggle("Corona")} />
                    </label>
                </div>
                <br/>
                <div style={{
                    width: '1400px',
                    height: '800px',
                    margin: '0 auto',
                }}>
                    <div id="map" ref="karte" style={{
                        top: 0,
                        bottom: 0,
                        width: '1400px',
                        height: '800px',
                    }}>
                    </div>
                </div>
            </div>
        );
    }
}
export default Visualisation
