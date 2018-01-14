import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Recipes from './Recipes';
import './stylesheets/app.css';
import * as config from '../config';
import axios from 'axios';

const INPUT_REGEX = /^[A-Za-z, ]{0,100}$/;
const INPUT_HINT = "Enter ingredient names seperated by commas";
const INPUT_ERROR = "Input should include ingredient names and commas only";
const QUOTE = "\"A princess never cooks!\"";
const INPUT_HEADER = "Tell us what's in your fridge, we'll tell you what to bake:";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            recipes:[],
            inputError: null
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
           <div className="cakeRescue-wrapper">
               <AppBar className="cakeRescue-header" title="Cake to the Rescue" showMenuIconButton={false}/>
               <div className="cakeRescue-input">
                   <div className="cakeRescue-sub-header">
                       <div className="cakeRescue-quote">{QUOTE}</div>
                       <div className="cakeRescue-input-header">{INPUT_HEADER}</div>
                   </div>
                   <TextField className="cakeRescue-textField" inputStyle="width:80%"
                       underlineFocusStyle="color:#735C5C"
                       hintText={INPUT_HINT}
                       onChange={this.onInputChange}
                       errorText={this.state.inputError}
                   />
                   <RaisedButton className="cakeRescue-button"
                       label="Bake" backgroundColor="#735C5C" labelColor="white"
                       disabled={this.state.inputError !== null}
                       onClick={this.onSubmit}
                   />
               </div>
               {(this.state.recipes.length !== 0) && <Recipes recipes={this.state.recipes}/>}
           </div>
        );
    }

    onSubmit() {
        const inputIngredients = this.state.ingredients.replace(/\s*,\s*/ig, ',');
        axios.get(`${config.server.recipes.url}?ingredients=${inputIngredients}`)
            .then(response => {
                response.data.sort((r1, r2) => {return r1.ingredients.length - r2.ingredients.length});
                this.setState({recipes: response.data});
                console.log('Got ' + response.data.length + ' matching recipes');
            })
            .catch(error => console.log(error));
    }

    onInputChange(e) {
        if(INPUT_REGEX.test(e.target.value))
            this.setState({
                ingredients: e.target.value,
                inputError: null
            });
        else
            this.setState({ inputError: INPUT_ERROR });
    }
}

export default App;