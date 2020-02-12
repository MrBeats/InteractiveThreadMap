import React from 'react';
import * as d3 from "d3";
import './Page.css';
import { Waypoint } from 'react-waypoint';
import Visualisation from '../Visualisation/Visualisation';

class Page extends React.PureComponent {
    componentDidMount(){

    }

    changeBackground(layer){
        let container = d3.select("#header")
        if(layer === "Topic"){
            container.attr("class", "topic")
        }
        if(layer === "Institutions"){
            container.attr("class", "institutions")
        }
        if(layer === "Fire"){
            container.attr("class", "fire")
        }
        if(layer === "Terror"){
            container.attr("class", "terror")
        }
        if(layer === "Corona"){
            container.attr("class", "corona")
        }
        if(layer === "Map"){
            container.attr("class", "map")
        }
    }
    
    render() {
        return (
            <div id={"container"} >
                <div className={"containerItem"}>
                    <h1>Interactive thread map</h1>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Topic")} />
                <div className={"containerItem"}>
                    <p>Beschreibung</p>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Institutions")} />
                <div className={"containerItem"}>
                    <h1>Institutions</h1>
                    <p>Beschreibung</p>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Fire")} />
                <div className={"containerItem"}>
                    <h1>Fire</h1>
                    <p>Beschreibung</p>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Terror")} />
                <div className={"containerItem"}>
                    <h1>Terrorism</h1>
                    <p>Beschreibung</p>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Corona")} />
                <div className={"containerItem"}>
                    <h1>Corona</h1>
                    <p>Beschreibung</p>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Map")} />
                <div className={"containerItem"}>
                    <h1>Map</h1>
                    <Visualisation/>
                </div>
            </div>
        )
    }
}

export default Page
