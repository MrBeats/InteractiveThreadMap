import React from 'react';
import * as d3 from "d3";

 class Visualisation extends React.Component {

     helloWorld() {
         d3.select(this.refs.karte).append("p").text("Hello World");
     }

     mapTest() {

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
