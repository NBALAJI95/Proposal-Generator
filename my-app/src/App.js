import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, Form } from 'reactstrap';

import logo from './logo.svg';
import './App.css';
import BusinessInfo from './FormComponents/BusinessInfo.js';
import ProcessingFee from './FormComponents/ProcessingFee.js';
import AdditionalFee from './FormComponents/AdditionalFee.js';
import AssociationNAuth from './FormComponents/AssociationNAuth.js';
import Total from './FormComponents/Total.js';
import Excel from './FormComponents/Excel.js';
import {resetForm, fetchForm} from "./actions";

const currency = (val, cond) => {
    if(cond)
        val = `$ ${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    else
        val = `${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    return (val !== '$ NaN') ? val : ' ';
};

class App extends Component {

  reset(part) {
      this.props.resetForm(part); document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  fetchToPartB() {
      this.props.fetchForm();
  }

  handleSubmit(event) {
      this.reset("partA");
      this.reset("partB");
      event.preventDefault();
  }

  render() {
    const { partA, partB } = this.props.State;

    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Proposal Generator </h1>
        </header>

        <div className="container-fluid">
            <Form onSubmit={this.handleSubmit.bind(this)} className="Form-Container">

                <BusinessInfo />

                <ProcessingFee />

                <AssociationNAuth />

                <AdditionalFee />

                <div style={{float: "right"}} className="form-group">
                    <Button color="secondary" onClick={this.reset.bind(this, "partA")}> Reset A </Button> {' '}
                    <Button color="success" onClick={this.fetchToPartB.bind(this)}> FETCH TO PART B </Button>
                </div>

                <br/><br/><br/>

                <h2 className="text-center"> Part B </h2>

                <BusinessInfo typeVal="partB" />

                <ProcessingFee typeVal="partB" />

                <AssociationNAuth typeVal="partB" />

                <AdditionalFee typeVal="partB" />

                <Total label="Monthly Savings" value={currency((partA.Total.Total_Fee) - (partB.Total.Total_Fee), true)} />

                <Total label="Savings %" value={currency(((partA.Total.Total_Fee) - (partB.Total.Total_Fee))
                    / (partA.Total.Total_Fee) * 100, false)+"%"} />

                <Total label="1 Year Savings" value={currency(((partA.Total.Total_Fee)
                    - (partB.Total.Total_Fee)) * 12, true)} />

                <Total label="3 Years Savings" value={currency(((partA.Total.Total_Fee)
                    - (partB.Total.Total_Fee)) * 12 * 3, true )} />

                <div style={{float: "right"}} className="form-group">
                    <Button color="secondary" onClick={this.reset.bind(this, "partB")}>
                        Reset B
                    </Button> {' '}
                    <Excel value={this.props.State} />
                </div>

                <br/>

            </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {resetForm, fetchForm})(App);