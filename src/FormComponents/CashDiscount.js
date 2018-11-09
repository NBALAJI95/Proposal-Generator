import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {connect} from 'react-redux';
import logo from "../logo.png";

class CashDiscount extends Component {
    render() {
        const { textStyle, numberTextStyle, whiteBox } = styles;
        const { State } = this.props.State;

        return (
            <div className="container-fluid">
                <center>
                    <img src={logo} className="App-logo" style={{marginLeft: "3rem", height: "5rem"}} alt="logo" />
                    <br/>

                    <div>
                        <div className="row" style={{textAlign: 'right'}}>
                            <div className="col-6" style={{color: 'black'}}>
                                <h3> Standard Program </h3>
                                <span style={textStyle}>Monthly Credit Volume</span>
                                <span style={numberTextStyle}>$52,912.00</span>

                                <span style={textStyle}>Card Brand Fees</span>
                                <span style={numberTextStyle}>$1,534.80</span>

                                <span style={textStyle}>Monthly Fees</span>
                                <span style={numberTextStyle}>$19.99</span>

                                <u>
                                    <span style={textStyle}>Total Cost:</span>
                                    <span style={numberTextStyle}>$1,554.79/month</span>
                                    <span style={numberTextStyle}>$18,554.48/year</span>
                                </u>
                            </div>
                            <div className="col-6" style={{textAlign: 'left', color: 'rgb(83,141,213)'}}>
                                <h3> Cash Discount Program </h3>
                                <span style={textStyle}>Monthly Credit Volume</span>
                                <span style={numberTextStyle}>$52,912.00</span>

                                <span style={textStyle}>Card Brand Fees</span>
                                <span style={numberTextStyle}>$1,534.80</span>

                                <span style={textStyle}>Monthly Fees</span>
                                <span style={numberTextStyle}>$0.00</span>

                                <u>
                                    <span style={textStyle}>Total Cost:</span>
                                    <span style={numberTextStyle}>$14.79/month</span>
                                    <span style={numberTextStyle}>$179.88/year</span>
                                </u>
                            </div>
                        </div>
                    </div>
                </center>

                <br/>

                <div style={{backgroundImage: 'linear-gradient(cyan, blue)', color: '#EEE'}}>
                    <br/>
                    <div style={whiteBox}>
                        <span style={textStyle}>
                            Annual Savings*
                        </span>
                        <span style={{...numberTextStyle, textDecoration: 'underline'}}>
                            $ 18,432.80
                        </span>
                        <span style={textStyle}>
                            Three Year Savings*
                        </span>
                        <span style={{...numberTextStyle, textDecoration: 'underline'}}>
                            $ 55,432.80
                        </span>
                        <p> *Annual savings & Equipment cost may vary </p>
                    </div>

                    <div style={{marginLeft: '7%', marginRight: '7%'}}>
                        <h3> Overview </h3>
                        <p>
                            Businesses are constantly striving to keep prices low and fair, while offering as many payment
                            options as possible. Cash discount allows for this without having to raise prices but by having a
                            service fee of 3.25% on all store sales and offer a discount to customers who pay with cash by
                            giving a full discount on the 3.25% service fee
                        </p>
                        <center>
                            <small style={{fontSize: '0.8rem', lineHeight: '0.5rem'}}>
                                MLS Direct Network, Inc is a registered ISO of Fifth Third Bank, Cincinnati, OH,
                                First National Bank of Omaha, Omaha, NE, Wells Fargo Bank, N.A., Concord, CA.
                                Titanium Payments is a registered ISO/MSP of Esquire® Bank, New York, NY.
                            </small>
                        </center>
                    </div>
                    <br/>
                </div>
            </div>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: '1.1rem',
        display: 'block'
    },
    numberTextStyle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        display: 'block'
    },
    whiteBox: {
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        width: '36%',
        margin: '0 auto',
        border: '1px solid black',
        borderRadius: '15px'
    }
};

const mapStateToProps = (state) => {
    return ({State: state.CashDiscountState});
};

export default connect(mapStateToProps)(CashDiscount);
