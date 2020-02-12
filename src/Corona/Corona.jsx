import * as d3 from "d3";
import coronaWorldData from './20200204-205200-bno-2019ncov-data.csv';
import countryCodesData from './country-codes.csv';
import ISO from './world.csv';
import * as mapboxgl from "mapbox-gl";

export async function readCoronaWorldData() {
    let data = await d3.dsv("|", coronaWorldData)
    let codes = await d3.dsv("|", countryCodesData)
    let iso = await d3.dsv(",", ISO)

    data.forEach(d => {
        const filtered = iso.filter(i => i.name === d.place)[0]
        d.ISO3 = filtered ? filtered.alpha3 : ""
        console.log(d.ISO3)
    })

    //console.log(data)
    return data
}

export async function readCountryCodesData() {
    return await d3.dsv("|", countryCodesData)
}

function getCol(matrix, col){
  var column = [];
  for(var i=0; i<matrix.length; i++){
     column.push(matrix[i][col]);
  }
  return column;
}

export function updateCorona(coronaData, map){
    return (map.addLayer({ //here we are adding a layer containing the tileset we just uploaded
        'id': 'corona',
        'source': {
          'type': 'vector',
          'url': 'mapbox://byfrost-articles.74qv0xp0'
        },
        'source-layer': 'ne_10m_admin_0_countries-76t9ly',
        'type': 'fill',
        'paint': {
          'fill-color': '#52489C', //this is the color you want your tileset to have (I used a nice purple color)
          'fill-outline-color': '#F2F2F2', //this helps us distinguish individual countries a bit better by giving them an outline
            'fill-opacity': 0.4
        }
      }),
      map.setFilter('corona', ['in', 'ADM0_A3_IS'].concat(getCol(coronaData, 'ISO3')))
)}
