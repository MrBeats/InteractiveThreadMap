import React from 'react';
import * as mapboxgl from "mapbox-gl"
import InstitutionData from "../InstitutionData/InstitutionData";

 class Visualisation extends React.Component {

     async mapTest() {
         function getLL(d) {
             return new mapboxgl.LngLat(+d.lng, +d.lat)
         }

         mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'
         let map = new mapboxgl.Map({
             container: 'map', // container id
             style: 'mapbox://styles/enjalot/cihmvv7kg004v91kn22zjptsc',
             center: [-10,30],
             zoom: 2,
         })
         map.scrollZoom.enable()
         map.NavigationControl = new mapboxgl.NavigationControl()

         let x = await new InstitutionData().getData()
         console.log(x)
         //let nav = new mapboxgl.NavigationControl();
         //map.addControl(nav, 'top-left');

         //let container = map.getCanvasContainer()

         /*
         let svg = d3.select(this.refs.karte).append("svg")
             .attr('height','800px')
             .attr('width','1400px')
             .attr('id','D3svg')
        */
     }

     componentDidMount() {
         this.mapTest()
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
