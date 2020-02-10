import * as d3 from "d3";
import coronaWorldData from './20200204-205200-bno-2019ncov-data.csv';
import countryCodesData from './country-codes.csv';
import * as mapboxgl from "mapbox-gl";

export async function readCoronaWorldData() {
    return await d3.dsv("|", coronaWorldData)
}

export async function readCountryCodesData() {
    return await d3.dsv("|", countryCodesData)
}

export function updateCorona(csvData,map){

}