import * as d3 from "d3";
import fireData from "./Feuer.csv";
import * as mapboxgl from "mapbox-gl";

export async function readFireData() {
    return await d3.dsv(",", fireData)
}

export function updateFire(csvData,map,svg,div) {

    let d3Data = csvData.filter(function(d){let coord =  projectOnMap([d.longitude,d.latitude]); return ((coord.x <= 1400 && coord.x >= 0) && (coord.y <= 800 && coord.x >= 0))})

    let circles = svg.selectAll("circle")
        .data(d3Data)

    circles
        .enter()
        .append("circle")
        .attr("r", 2)
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


    function projectOnMap(d) {
        const lon = parseFloat(d[0]);
        const lat = parseFloat(d[1]);

        return map.project(new mapboxgl.LngLat(lon, lat));
    }
}
