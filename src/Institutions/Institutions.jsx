import React from "react";
import * as d3 from "d3";
import extData from "./InstitutionData_Ext.csv";
import * as mapboxgl from "mapbox-gl";

export async function readInstitutionData() {
    return await d3.dsv(";", extData).then(function(data){
        return data.filter(institution => institution.Latitude !== "failed" && institution.Longitude !== "failed")
    })
}

export function updateInstitutions(csvData,map,div,context) {
    let d3Data = csvData.filter(function(d){let coord =  projectOnMap([d.Longitude,d.Latitude]); return ((coord.x <= 1400 && coord.x >= 0) && (coord.y <= 800 && coord.x >= 0))})

    let customBase = document.createElement('custom')
    let custom = d3.select(customBase)

    let circles = custom.selectAll("custom.circle")
        .data(d3Data)

    circles
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "red")
        .attr("opacity", 0.7)
        .attr("cx", function(d) { return projectOnMap([d.Longitude,d.Latitude]).x; })
        .attr("cy", function(d) { return projectOnMap([d.Longitude,d.Latitude]).y; })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.name + "<br/><br/>"  + d.Adresse)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })

    circles
        .exit()
        .remove()

    circles
        .attr("cx", function(d) { return projectOnMap([d.Longitude,d.Latitude]).x; })
        .attr("cy", function(d) { return projectOnMap([d.Longitude,d.Latitude]).y; })
    // Draw on Canvas
    context.clearRect(0, 0, 1400, 800)
    let elements = custom.selectAll('circle')
    elements.each(function(d,i) {
        let node = d3.select(this)
        context.fillStyle = 'black'
        context.beginPath();
        context.arc(node.attr('cx'), node.attr('cy'), 2, 0, 2 * Math.PI)
        context.fill();
    })

    function projectOnMap(d) {
        const lon = parseFloat(d[0].replace(/,/g, '.'));
        const lat = parseFloat(d[1].replace(/,/g, '.'));

        return map.project(new mapboxgl.LngLat(lon, lat));
    }
}

export function checkIfExists(e,data,map) {
    function projectOnMap(d) {
        const lon = parseFloat(d[0].replace(/,/g, '.'));
        const lat = parseFloat(d[1].replace(/,/g, '.'));

        return map.project(new mapboxgl.LngLat(lon, lat));
    }

    // get DataPoints where Mouse is on

    console.log(data.filter(d => {
        let datapoint = projectOnMap([d.Longitude,d.Latitude])
        let x1 = parseInt(datapoint.x)
        let y1 = parseInt(datapoint.y)
        let x2 = parseInt(e.point.x)
        let y2 = parseInt(e.point.y)
        return x1 === x2 && y1 === y2
        }).length)
}


