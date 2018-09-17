import React, { Component } from 'react';
import {connect} from "react-redux";
import FormRow from "./FormRow.js";
import logo from '../logo.png';
import ProposalHeading from './proposalHeading';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const getData = ({Current, Ours}) => {
    return ([
        {name: 'Monthly Fees', Ours, Current},
    ]);
};

const SimpleBarChart = ({data}) => {
    return (
        <BarChart width={300} height={150} data={getData(data)}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis domain={[Math.floor(parseInt(data.Ours/100*0.75)*100), (Math.ceil((parseInt(data.Current/100*1.05)*100)))]} />
            <Tooltip/>
            <Legend />
            <Bar dataKey="Current" fill="#AAA" />
            <Bar dataKey="Ours" fill="rgb(83,141,213)" />
        </BarChart>
    );
};

const currency = (val, cond, special = false) => {
    if(cond)
        val = ` $ ${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    else
        val = ` ${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    return (val !== ' $ NaN') ? val : (special) ? ' $ 0.00':' ';
};

const getMappedValue = (c) => {
    const additional = {"monthlyFee": "Monthly Fee", "regulatoryFee": "Regulatory Fee", "pciFee": "PCI Fee",
        "techFee": "Tech Fee", "pos": "POS", "misc": "MISC"};

    if(Object.keys(additional).indexOf(c) >= 0)
        return additional[c];
    else
        return c;
};

class SavingsComparisonSheet extends Component {
    renderProcessingFees(A, B) {
        const cards = Object.keys(A);

        return cards.map((card, i) => (
            <FormRow key={i} label={getMappedValue(card)} partA={A[card]} partB={B[card]} />
        ));
    }

    render() {
        const { partA, partB } = this.props.State;

        return (
            <div className="container-fluid">
                <h2 className="text-center" style={{marginTop: "1rem", fontWeight: "bold"}}> SAVINGS COMPARISON </h2>
                <img src={logo} className="App-logo" style={{marginLeft: "3rem"}} alt="logo" />
                <div style={box}>
                    <div>
                        <h5 style={headingStyle}> {partA.businessName || '`'} </h5>
                        <div className="row" style={{paddingLeft: "1rem", paddingRight: "1rem", fontSize: "0.88rem"}}>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-4">
                                        <b> Total Volume </b>
                                    </div>
                                    <div className="col-4">
                                        { currency(partA.volume, true) }
                                    </div>
                                    <div className="col-4">
                                         {" ; "} { partA.transactions }
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <b> Avg. Ticket </b>
                                    </div>
                                    <div className="col-4">
                                        { currency(partA.ticket, true) }
                                    </div>
                                    <div className="col-4">
                                        {" ; "} { partA.currentProvider }
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                                <div style={{float: "right"}}>
                                    <div className="row">
                                        <b> Date </b>
                                        <div>
                                            : {(new Date().getMonth() + 1)+"/"+(new Date().getDate())
                                        +"/"+new Date().getFullYear()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row" style={{margin: "0"}}>
                        <div className="col-7" style={{border: "1.5px solid", borderLeft: "0"}}>
                            <center> <b> CURRENT PROVIDER </b> </center>
                        </div>
                        <div className="col-5" style={Object.assign({}, headingStyle, {border: "1.5px solid black", borderLeft: "0", borderRight: "0"})}>
                            <center> <b> OUR QUOTE </b> </center>
                        </div>
                    </div>

                    <ProposalHeading label={"PROCESSING FEES"} heading1Style={Object.assign({}, headingStyle,
                        {borderBottom: "1.5px solid black", borderRight: "1.5px solid black"})}
                         heading2Style={Object.assign({}, headingStyle, {borderBottom: "1.5px solid black"})} />


                    <div className="row" style={{margin: "0"}}>
                        <div className="col-7" style={{borderBottom: "1.5px solid", borderRight: "1.5px solid"}}>
                            <div className="grid-container">
                                <div />
                                <div><b>VOLUME</b></div>    <div><b>#</b></div>
                                <div><b>%</b></div>         <div><b>Item</b></div>
                                <div style={{textAlign: "right"}}> <b>Fee</b> </div>
                            </div>
                        </div>
                        <div className="col-5" style={{borderBottom: "1.5px solid black"}}>
                            <div className="grid-container2">
                                <div><b>VOLUME</b></div>    <div><b>#</b></div>
                                <div><b>%</b></div>         <div><b>Item</b></div>
                                <div style={{textAlign: "right"}}> <b>Fee</b> </div>
                            </div>
                        </div>
                    </div>

                    {this.renderProcessingFees(partA.ProcessingFees, partB.ProcessingFees)}
                    <FormRow label={"Total"} partA={{Fee: partA.Total.TotalProcessingFees}} partB={{Fee: partB.Total.TotalProcessingFees}} bold={true} />

                    <ProposalHeading label={"ASSOCIATION FEES"}
                         heading1Style={Object.assign({}, headingStyle, {borderRight: "1.5px solid black"})}
                         heading2Style={headingStyle} />

                    <FormRow label={"Amex"} partA={{Fee: partA.amexFee}} partB={{Fee: partB.amexFee}} />
                    <FormRow label={"Total"} partA={{Fee: partA.assoFee}} partB={{Fee: partB.assoFee}} bold={true} />

                    <ProposalHeading label={"OTHER AUTH FEES"}
                         heading1Style={Object.assign({}, headingStyle, {borderRight: "1.5px solid black"})}
                         heading2Style={headingStyle} />

                    <FormRow label={"Total"} partA={{Fee: partA.authFee}} partB={{Fee: partB.authFee}} bold={true} />

                    <ProposalHeading label={"ADDITIONAL FEES"}
                         heading1Style={Object.assign({}, headingStyle, {borderRight: "1.5px solid black"})}
                         heading2Style={headingStyle} />

                    {this.renderProcessingFees(partA.AdditionalFees, partB.AdditionalFees)}

                    <FormRow label={"Total"} partA={{Fee: partA.Total.TotalAdditionalFee}} partB={{Fee: partB.Total.TotalAdditionalFee}} bold={true} />

                    <div className="row" style={{margin: "0", fontSize:"0.95rem"}}>
                        <div className="col-7" style={Object.assign({}, headingStyle, {borderRight: "1.5px solid black"})}>
                            <div>
                                <span style={headingStyle}> <b> TOTAL FEES </b> </span>
                                <span style={{fontWeight: "bold", float: "right"}}> {currency(partA.Total.Total_Fee, true)} </span>
                            </div>
                        </div>
                        <div className="col-5" style={headingStyle}>
                            <div>
                                <span style={headingStyle}> {""} </span>
                                <span style={{fontWeight: "bold", float: "right"}}> {currency(partB.Total.Total_Fee, true)} </span>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{margin: "0", fontSize:"0.95rem"}}>
                        <div className="col-7" style={Object.assign({}, headingStyle, {borderRight: "1.5px solid black", borderBottom: "1.5px solid black"})}>
                            <div>
                                <span style={headingStyle}> <b> EFFECTIVE RATE </b> </span>
                                <span style={{fontWeight: "bold", float: "right"}}> {(currency(partA.Total.Total_Fee/partA.volume*100))+" %"} </span>
                            </div>
                        </div>
                        <div className="col-5" style={Object.assign({}, headingStyle, {borderBottom: "1.5px solid black"})}>
                            <div>
                                <span style={headingStyle}> {""} </span>
                                <span style={{fontWeight: "bold", float: "right"}}> {currency(partB.Total.Total_Fee/partB.volume*100)+" %"} </span>
                            </div>
                        </div>
                    </div>

                    {/*<BarExample data={[partA.Total.Total_Fee, partB.Total.Total_Fee]} />*/}
                    <br/>

                    <div className="row">
                        <div className="col-6">
                            <SimpleBarChart data={{Current: partA.Total.Total_Fee, Ours: partB.Total.Total_Fee}} />
                        </div>
                        <div className="col-6">
                            <div style={Object.assign({}, box, {borderRight: "0.5px solid black", margin: 0, color: "white", padding: "5px",
                                fontWeight: "bold", backgroundColor: "rgb(83,141,213)", fontSize: "0.95rem"})}>
                                <div>
                                    <span> MONTHLY SAVINGS </span>
                                    <span style={{float: "right"}}>
                                        {`${currency((partA.Total.Total_Fee - partB.Total.Total_Fee), true)}`}
                                    </span>
                                </div>
                                <div>
                                    <span> % SAVINGS </span>
                                    <span  style={{float: "right"}}>
                                        {`${currency(((partA.Total.Total_Fee - partB.Total.Total_Fee)
                                            / (partA.Total.Total_Fee) * 100), false)} %`}
                                    </span>
                                </div>
                                <div>
                                    <span> 1 YEAR SAVINGS </span>
                                    <span  style={{float: "right"}}>
                                        {`${currency((partA.Total.Total_Fee - partB.Total.Total_Fee)*12, true)}`}
                                    </span>
                                </div>
                                <div>
                                    <span> 3 YEAR SAVINGS </span>
                                    <span  style={{float: "right"}}>
                                        {`${currency((partA.Total.Total_Fee - partB.Total.Total_Fee)*12*3, true)}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const headingStyle = {
    color: 'white',
    backgroundColor: 'rgb(83,141,213)',
    margin: "auto",
};

const box = {
    border: "1.5px solid black",
    margin: "1rem 3rem"
};

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps)(SavingsComparisonSheet);