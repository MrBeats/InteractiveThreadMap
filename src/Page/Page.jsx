import React from 'react';
import * as d3 from "d3";
import './Page.css';
import { Waypoint } from 'react-waypoint';
import InstImg from '../images/map_inst_screen.png';
import FireImg from '../images/map_fire_screen.png';

class Page extends React.PureComponent {
    componentDidMount(){

    }

    changeBackground(layer){
        let container = d3.select("#container")
        console.log(container)
        if(layer === "Institutions"){
            container.attr("class", "institutions")
        }
        if(layer === "Fire"){
            container.attr("class", "fire")
        }
    }
    
    render() {
        return (
            <div>
            <div id="container"/>
            <div id="container2"> 
                {/* Ueberschrift */}
                <div className='overview'>
                    <div className='topic'>
                        <h1>Interactive thread map</h1>
                    </div>
                    {/* Projektbeschreibung */}
                    <div className='Description'>
                        <p>Beschreibung</p>
                    </div>
                </div>
                <Waypoint
                    onEnter={this.changeBackground.bind(this,"Institutions")}
                />
                <div id='institutions' >
                    <div>
                        <h1>Institutions</h1>
                        <p>Beschreibung</p>
                    </div>
                </div>
                <div id='fire' >
                    <div>
                        <h1>Fire</h1>
                        <p>Beschreibung</p>
                    </div>
                </div>
                <div id='terror'>
                    <h1>Terrorism</h1>
                    <p>Beschreibung</p>
                </div>
                <div id='corona'>
                    <h1>Corona virus</h1>
                    <p>Beschreibung</p>
                </div>
                <Waypoint
                    onEnter={this.changeBackground.bind(this,"Fire")}
                />
                <div className='map'>
                    <h1>Map</h1>
                    <p>Beschreibung</p>
                </div>
                </div>
            </div>
        );
    }
}

export default Page