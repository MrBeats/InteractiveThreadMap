import * as d3 from "d3";
import fireData from "./Feuer.csv";
import * as mapboxgl from "mapbox-gl";

export async function readFireData() {
    return await d3.dsv(",", fireData)
}

export function updateFire(csvData,map,div,context) {

    let d3Data = csvData.filter(function(d){let coord =  projectOnMap([d.longitude,d.latitude]); return ((coord.x <= 1400 && coord.x >= 0) && (coord.y <= 800 && coord.x >= 0))})

    let customBase = document.createElement('custom2')
    let custom = d3.select(customBase)

    let circles = custom.selectAll("custom2.rect")
        .data(d3Data)


    circles
        .enter()
        .append("rect")
        .attr("r", 1)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "black")
        .attr("opacity", 0.7)
        .attr("cx", function(d) { return projectOnMap([d.longitude,d.latitude]).x; })
        .attr("cy", function(d) { return projectOnMap([d.longitude,d.latitude]).y; })


    circles
        .exit()
        .remove()

    circles
        .attr("cx", function(d) { return projectOnMap([d.longitude,d.latitude]).x; })
        .attr("cy", function(d) { return projectOnMap([d.longitude,d.latitude]).y; })

    // Draw on Canvas
    context.clearRect(0, 0, 1400, 800)
    let elements = custom.selectAll('rect')
    elements.each(function(d,i) {
        let node = d3.select(this)
        context.fillStyle = 'red'
        context.beginPath();
        context.fillRect(node.attr('cx'), node.attr('cy'), node.attr('r'),node.attr('r'))
    })

    function projectOnMap(d) {
        const lon = parseFloat(d[0]);
        const lat = parseFloat(d[1]);

        return map.project(new mapboxgl.LngLat(lon, lat));
    }
}
