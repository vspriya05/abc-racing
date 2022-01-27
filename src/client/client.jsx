import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

let state = undefined;

console.info("Client:: Fetching data from server");

fetch("/data")
    .then(data => data.json())
    .then(json => {

        state = json;
        render();

    });


function render(){

    console.info("Client:: Rendering application with remote data", state);
    ReactDOM.hydrate(<App {...state}/>, document.querySelector("#surveyQuestions"));

}

