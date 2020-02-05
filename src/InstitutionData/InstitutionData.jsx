import React from 'react';
import instDataCSV from './extracted_institution_data.csv';
import * as d3 from 'd3';

class InstitutionData extends React.Component {
    async getData() {
        let text = await this.fetchCsv()
        let instData = d3.csvParseRows(text)
        let filtered = instData.filter(function(institution) {
            return institution[2] !== "";
        })
        return filtered
    }

    fetchCsv() {
        return fetch(instDataCSV).then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }
}
export default InstitutionData
