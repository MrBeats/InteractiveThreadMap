import './InstitutionFocusBar.css'
import React from 'react';
import * as Institutions from "../Institutions/Institutions";
import * as mapboxgl from "mapbox-gl";

class InstitutionFocusBar extends React.Component {
    constructor(props) {
        super(props);
        this.getAllChoices = this.getAllChoices.bind(this);
        this.getCol = this.getCol.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.chooseInstitution = this.chooseInstitution.bind(this);

        this.state = {
            inputString: "",
            options: [],
            choices: [],
        }

    }
    componentDidMount() {
        this.refs.focusForm.onsubmit = () => this.chooseInstitution();
        this.getAllChoices()
    }

    async getAllChoices() {
        let choices = await Institutions.readInstitutionData()
        this.setState({
            choices: choices
        })
    }

    getOptions() {
        const {choices,inputString,options} = this.state;
        if (choices != null) {
            this.setState({options: this.getCol(choices.filter(c => c.name.toLowerCase().includes(inputString.toLowerCase())),'name')},() => {
                if (this.state.options.length == 1) {
                    this.chooseInstitution()
                }
            })
        }
        else {
            this.setState({options: []})
        }
    }

    chooseInstitution() {
        const {choices,options} = this.state;
        if(options[0])
        {
        const current = choices.filter(c => c.name == options[0])
        if(current[0])
            {
                this.props.flyTo(
                    parseFloat(current[0].Latitude.replace(/,/g, '.')),
                    parseFloat(current[0].Longitude.replace(/,/g, '.'))
                )
            }
        }
        return false
    }

    getCol(matrix, col){
        let column = [];
        for(let i=0; i<matrix.length; i++){
            column.push(matrix[i][col]);
        }
        return column;
    }

    render() {
        const {options} = this.state;

        return (
            <div>
                <form ref='focusForm' id="input">
                    <input type="text" name="name" id="name_input" list="huge_list" value={this.state.inputString}
                           onChange={(e) => {
                                this.setState({ inputString: e.target.value }, () => {
                                    this.getOptions()
                                })
                           }}
                            onSubmit={(e) => {
                                this.setState({ inputString: e.target.value }, () => {
                                    this.chooseInstitution()
                                })
                            }}
                    /> Institution
                    <datalist id="huge_list">
                        {
                            options.length < 15 ?
                            options.map((o,i) => {
                            return (<option key={i} value={o} />)
                            }) : <div></div>
                        }
                    </datalist>
                </form>
            </div>
        )

    }
}
export default InstitutionFocusBar
