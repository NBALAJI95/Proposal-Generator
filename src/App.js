import React, { Component } from 'react';
import {connect} from "react-redux";
import { Button, Form, Progress, UncontrolledTooltip, FormGroup, Input, Label, CustomInput } from 'reactstrap';
import logo from './logo.png';
import './App.css';
import BusinessInfo from './FormComponents/BusinessInfo.js';
import ProcessingFee from './FormComponents/ProcessingFee.js';
import AdditionalFee from './FormComponents/AdditionalFee.js';
import AssociationNAuth from './FormComponents/AssociationNAuth.js';
import Total from './FormComponents/Total.js';
import Excel from './FormComponents/Excel.js';
import {resetForm, fetchForm, updateCommon, resetCashDiscount, copyCashDiscount} from "./actions";
import { Link } from 'react-router-dom';
import CashDiscountInput from './FormComponents/CashDiscountInput';

const currency = (val, cond) => {
    if(cond)
        val = `$ ${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    else
        val = `${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    return (val !== '$ NaN' && val !== 'NaN') ? val : '';
};

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        tooltipOpen: false,
        format: ''
      };
    }

    toggle() {
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      });
    }

    reset(part) {
        this.props.resetForm(part); document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    fetchToPartB() {
        this.props.fetchForm();
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    renderCheck() {
        if(this.state.format === "Interchange +") {
            return this.renderInterchangePlus();
        } else if(this.state.format === "Cash Discount") {
            return this.renderCashDiscount();
        }
    }

    onOverviewCheck(event) {
            return this.props.updateCommon('overview', !this.props.CashDiscountState.overview, null);
    }

    renderCashDiscount() {
        return (
            <div>
                <div className="container-fluid">
                    <Form className="Form-Container">
                        <h2 className="text-center" style={{fontSize: "1.8rem"}}> Current Statement </h2>
                        <hr/>

                        <CashDiscountInput name={"volumeA"} labelText={"Total Credit Card Volume (monthly)"} />

                        <CashDiscountInput name={"FeesA"} labelText={"Total Fees"} />

                        <br/>

                        <div style={{float: "right"}} className="form-group">
                            <Button color="primary" onClick={() => this.props.copyCashDiscount()}>
                                Copy
                            </Button> {' '}
                        </div>

                        <h2 className="text-center" style={{fontSize: "1.8rem"}}> Our Proposal </h2>
                        <hr/>

                        <CashDiscountInput name={"volumeB"} labelText={"Total Credit Card Volume (monthly)"} />

                        <CashDiscountInput name={"FeesB"} labelText={"Total Fees"} />

                        <div>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" checked={this.props.CashDiscountState.overview}
                                       onChange={this.onOverviewCheck.bind(this)} id="overview" />
                                        <em style={{fontSize: '1.1rem'}}>
                                            {"Include Overview?"}
                                        </em>
                                </Label>
                            </FormGroup>

                        </div>

                        <div style={{float: "right"}} className="form-group">
                            <Button color="primary" onClick={() => this.props.resetCashDiscount()}>
                                Reset
                            </Button> {' '}
                            {console.log('Passing props', this.props.CashDiscountState)}
                            <Link to={{pathname: "/cashDiscount", state: this.props.CashDiscountState}}>
                                <Button color="success"> Submit </Button>
                            </Link>
                        </div>
                        <br/>
                    </Form>
                </div>
            </div>
        );
    }

    renderInterchangePlus() {
        const { partA, partB } = this.props.State;

        return (
            <div>
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
                        <b>* NOTE: All values you enter are on monthly basis</b>
                        <br/><br/>
                        <h2 className="text-center" style={{fontSize: "1.8rem"}}> Current Statement </h2>
                        <hr/>

                        <BusinessInfo />

                        <ProcessingFee />

                        <AssociationNAuth />

                        <AdditionalFee />

                        <div style={{float: "right"}} className="form-group">
                            <Button color="secondary" onClick={this.reset.bind(this, "partA")}> Reset A </Button> {' '}
                            <Button id="Copy" color="success" onClick={this.fetchToPartB.bind(this)}>
                                COPY FORM
                                <UncontrolledTooltip placement="top" target="Copy">
                                    Click to copy form to Our Proposal
                                </UncontrolledTooltip>
                            </Button>
                        </div>

                        <br/><br/>
                        <hr/>

                        <h2 className="text-center" style={{fontSize: "1.8rem"}}> Our Proposal </h2>
                        <hr/>

                        <BusinessInfo />

                        <ProcessingFee typeVal="partB" />

                        <AssociationNAuth typeVal="partB" />

                        <AdditionalFee typeVal="partB" />

                        <div style={{ border: "3px solid black", width: "400px", margin: "0 auto" }}>
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
                            <Excel value={this.props.State} /> {' '}
                            <Link to="/list"><Button color="success"> Dashboard for PDF </Button></Link>
                        </div>
                        <br/>
                        <br/>
                    </Form>
                </div>
            </div>
        );
    }

    selection(event) {
        console.log(this.state);
        this.setState({ format: event.target.value });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <br/><br/>
                    <h1 className="App-title"> Proposal Generator </h1>
                    <br/><br/>
                </header>
                <FormGroup style={{ padding: '20%', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                    <Label for="exampleSelect"> Select the format </Label>
                    <CustomInput  type="select" name="select" id="exampleSelect" value={this.state.format} onChange={this.selection.bind(this)}>
                        <option>{''}</option>
                        <option> Interchange + </option>
                        <option> Cash Discount </option>
                    </CustomInput >
                </FormGroup>
                {this.renderCheck()}
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

export default connect(mapStateToProps, {resetForm, fetchForm, updateCommon, resetCashDiscount, copyCashDiscount})(App)
