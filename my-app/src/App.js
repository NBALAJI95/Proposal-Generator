import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, Form, Progress } from 'reactstrap';
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
    return (val !== '$ NaN' && val !== 'NaN') ? val : '';
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
          <img src={"https://github.com/NBALAJI95/Titanium-Web-Project/blob/master/logo.png?raw=true"} className="App-logo" alt="logo" />
          <br/><br/>
          <h1 className="App-title"> Proposal Generator </h1>
          <br/><br/>
        </header>

        <div style={fixed}>
            <b>Current Effective rate: {currency(partA.Total.Total_Fee / partA.volume * 100) || '-'} %</b> <br/>
            <b>New Effective rate: {currency(partB.Total.Total_Fee / partB.volume * 100) || '-'} %</b> <br/>
            <b>Savings %: {((partA.Total.Total_Fee - partB.Total.Total_Fee)/(partA.Total.Total_Fee)*100 === 0) ? 0 :
                (currency((partA.Total.Total_Fee - partB.Total.Total_Fee)/(partA.Total.Total_Fee)*100) || '-')} %</b><br/>
            <b>Monthly Savings: {currency((partA.Total.Total_Fee) - (partB.Total.Total_Fee), true)}</b>
        </div>

        <div style={fixed2}>
            <Progress striped value={this.props.State.progress} />
        </div>

        <div className="container-fluid">
            <Form onSubmit={this.handleSubmit.bind(this)} className="Form-Container">
                <h2 className="text-center"> Current Statement </h2>

                <BusinessInfo />

                <ProcessingFee />

                <AssociationNAuth />

                <AdditionalFee />

                <div style={{float: "right"}} className="form-group">
                    <Button color="secondary" onClick={this.reset.bind(this, "partA")}> Reset A </Button> {' '}
                    <Button color="success" onClick={this.fetchToPartB.bind(this)}> COPY FORM </Button>
                </div>

                <br/><br/>
                <hr/>

                <h2 className="text-center"> Our Proposal </h2>

                <BusinessInfo typeVal="partB" />

                <ProcessingFee typeVal="partB" />

                <AssociationNAuth typeVal="partB" />

                <AdditionalFee typeVal="partB" />

                <div style={{ border: "3px solid black" }}>
                    <Total label="Monthly Savings" value={currency((partA.Total.Total_Fee) - (partB.Total.Total_Fee), true)} />

                    <Total label="Savings %" value={(currency(((partA.Total.Total_Fee) - (partB.Total.Total_Fee))
                        / (partA.Total.Total_Fee) * 100, false) || " -")+" %"} />

                    <Total label="1 Year Savings" value={currency(((partA.Total.Total_Fee)
                        - (partB.Total.Total_Fee)) * 12, true)} />

                    <Total label="3 Years Savings" value={currency(((partA.Total.Total_Fee)
                        - (partB.Total.Total_Fee)) * 12 * 3, true )} />
                </div>

                <hr/>

                <div style={{float: "right"}} className="form-group">
                    <Button color="secondary" onClick={this.reset.bind(this, "partB")}>
                        Reset B
                    </Button> {' '}
                    <Excel value={this.props.State} />
                </div>
                <br/>
                <br/>
            </Form>
        </div>
      </div>
    );
  }
}

const fixed = {
    position: "fixed", top: 0, right: 0, backgroundColor: "rgba(255, 255, 255, 0.92)",
    zIndex: 100, border: "3px solid #73AD21", padding: "5px", textAlign: "right"
};

const fixed2 = {
    position: "fixed", bottom: 0, width: '100%', backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 100, border: "1px solid black", padding: "5px", textAlign: "right"
};

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {resetForm, fetchForm})(App);