import React from 'react'
import * as d3 from "d3"
import './Page.css'

class Page extends React.PureComponent {

    render() {
        return (
            <div>
                {/* Ueberschrift */}
                <div id='Topic' class=''>
                    <h1>Interactive thread map</h1>
                </div>
                {/* Projektbeschreibung */}
                <div id='Topic'>
                    <b>Beschreibung</b>
                </div>

            </div>
        );
    }
}

export default Page