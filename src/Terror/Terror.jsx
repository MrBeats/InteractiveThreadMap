import * as d3 from "d3";
import terrorData from "./globalterrorismdb_0919dist.csv";
import * as mapboxgl from "mapbox-gl";

export async function readTerrorData() {
    return await d3.dsv(";", terrorData).then(function(data){
        return data.filter(attacks => attacks.latitude !== "" && attacks.longitude !== "")
    })
}

export function updateTerror(csvData,map,div,context) {
    let d3Data = csvData.filter(function(d){ let coord =  projectOnMap([d.longitude,d.latitude]); return ((coord.x <= 1400 && coord.x >= 0) && (coord.y <= 800 && coord.x >= 0))})

    let customBase = document.createElement('custom3')
    let custom = d3.select(customBase)

    let circles = custom.selectAll("custom3.rect")
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
        context.fillStyle = 'green'
        context.beginPath();
        context.fillRect(node.attr('cx'), node.attr('cy'), node.attr('r'), node.attr('r'))
    })

    function projectOnMap(d) {
        const lon = parseFloat(d[0].replace(/,/g, '.'));
        const lat = parseFloat(d[1].replace(/,/g, '.'));

        return map.project(new mapboxgl.LngLat(lon, lat));
    }
}
