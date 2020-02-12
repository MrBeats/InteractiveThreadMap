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
                <Waypoint onEnter={this.changeBackground.bind(this,"Topic")} />
                <div className={"containerItem"}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1 id='top'>Interactive threat map</h1>
                </div>

                <Waypoint onEnter={this.changeBackground.bind(this,"Institutions")} />
                <div className={"containerItem"}>
                    <h1>Institutions</h1>
                    <p>Beschreibung</p>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Fire")} />
                <div className={"containerItem"}>
                    <h1>Fire</h1>
                    <br />
                    <br />
                    <strong>
                        <p>Die erste Gefahr welche in dieser Visualisierung dargestellt wird, ist <span style={{color: '#ff0000'}}>Feuer</span>. Zu den bei trockenem<br /> Klima sich j&auml;hrlich wiederholenden Br&auml;nden z.B. in den USA kamen im Jahr 2019 viele noch gr&ouml;&szlig;ere<br /> und gewaltigere Feuer-Katastrophen hinzu. Dazu z&auml;hlen unter anderem die Waldbr&auml;nde im Amazonas,<br /> oder die extremen Buschbr&auml;nde in Australien, welche bis heute nicht gel&ouml;scht werden<br /> konnten und f&uuml;r viel Zerst&ouml;rung und Leid sorgen.</p>
                        <p>Die Nasa stellt hierzu eine&nbsp;<a href="https://firms.modaps.eosdis.nasa.gov/map/#z:3;c:0.7,4.0;d:2020-02-11..2020-02-12">"Feuer-Karte"</a>&nbsp;bereit, welche mithilfe der Daten aus dem<br /> &nbsp;<a href="https://modis.gsfc.nasa.gov/">Moderate Resolution Imaging Spectroradiometer</a>&nbsp;und der <br />&nbsp;<a href="https://www.jpss.noaa.gov/viirs.html">Visible Infrared Imaging Radiometer Suite</a>&nbsp;aktuelle Daten der letzten 24h, 48h und 7 Tagen visualisiert.<br /> Diese Daten haben wir in unsere Gefahren-Karte gemappt,<br /> um die Gefahr von Feuern f&uuml;r Institute zu visualisieren.</p>
                    </strong>.
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Terror")} />
                <div className={"containerItem"}>
                    <h1>Terrorism</h1>
                    <br />
                    <br />
                    <br />
                    <p><strong>In Zeiten, in denen sich Terror-Organisationen wie der IS ausbreiten und ganze Staaten zerfallen,<br /> ist der <span style={{color: '#339966'}}>Terrorismus</span> ebenfalls eine sehr gro&szlig;e Gefahr in der heutigen Welt. Das <br />&nbsp;<a title="National Consortium for the Study of Terrorism and Responses to Terrorism" href="https://www.start.umd.edu/">National Consortium for the Study of Terrorism and Responses to Terrorism</a>&nbsp;(START) hat hierbei<br /> zu Forschungszwecken eine Datenbank aufgebaut, welche nahezu alle terroristischen<br /> Anschl&auml;ge auf der ganzen Welt seit 1970 dokumentiert. Zus&auml;tzlich enth&auml;lt der Datensatz oft<br /> viele Zusatzinformationen, wie die Zahl der Todesopfer, das Anschlagsziel oder die Angriffsart.<br /> Die Daten k&ouml;nnen dabei in der <a href="https://www.start.umd.edu/gtd/">Global Terrorism Database (GTD)</a> eingesehen werden.</strong></p>
                </div>
                <Waypoint onEnter={this.changeBackground.bind(this,"Corona")} />
                <div className={"containerItem"}>
                    <h1>Corona</h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p><strong>Der <span style={{color: '#0000ff'}}>Corona</span> Virus (2019-nCoV) ist wohl die neueste und aktuellste Gefahr.<br /> Der erstmals in China aufgetretene Virus der Familie der&nbsp;<em>Coronaviridae&nbsp;</em>hat allein in<br /> China bereits mehrere zehntausend Menschen infiziert und schon &uuml;ber<br /> tausend Todesopfer gefordert (<a href="https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200212-sitrep-23-ncov.pdf?sfvrsn=41e9fb78_2">Stand Februar 2020</a>). Auch wenn au&szlig;erhalb Chinas noch<br /> nicht viele F&auml;lle bekannt sind, stellt dieser Virus eine Gefahr f&uuml;r die Institute<br /> und Ihre Mitarbeiter dar. Unsere Daten werden dabei aus einer unabh&auml;ngigen und regelm&auml;&szlig;ig<br /> aktualisierten <a href="https://github.com/globalcitizen/2019-wuhan-coronavirus-data">Quelle</a> bezogen und enthalten neben den Zahlen auch die Herkunft s&auml;mtlicher Daten.</strong></p>
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
