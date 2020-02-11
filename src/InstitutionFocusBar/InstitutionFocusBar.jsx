import './InstitutionFocusBar.css'
import React from 'react';
import * as Institutions from "../Institutions/Institutions";

class InstitutionFocusBar extends React.Component {
    constructor(props) {
        super(props);
        this.getAllChoices = this.getAllChoices.bind(this);
        this.getCol = this.getCol.bind(this);
        this.getOptions = this.getOptions.bind(this);

        this.state = {
            inputString: "",
            options: [],
            choices: [],
        }

    }
    componentDidMount() {
        this.getAllChoices()
    }

    async getAllChoices() {
        let choices = await Institutions.readInstitutionData()
        this.setState({
            choices: choices
        })
    }

    getOptions() {
        const {choices,inputString} = this.state;
        console.log(inputString)
        if (choices != null) {
            console.log(this.getCol(choices.filter(c => c.name.includes(inputString)),'name'))
            this.setState({options: this.getCol(choices.filter(c => c.name.toLowerCase().includes(inputString.toLowerCase())),'name')})
        }
        else {
            this.setState({options: []})
        }
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
                <form id="input">
                    <input type="text" name="name" id="name_input" list="huge_list" value={this.state.inputString}
                           onChange={(e) => {
                                this.setState({ inputString: e.target.value }, () => {
                                    this.getOptions()
                                })
                           }}/> Institution
                    <datalist id="huge_list">
                        {
                            options.length < 25 ?
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
