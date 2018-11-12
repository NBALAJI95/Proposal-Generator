import React, { Component } from 'react';
// import { Document, Page } from 'react-pdf';
import logo from "../logo.png";

const currency = (amt) => {
    if(amt) {
        return `$ ${parseFloat(amt).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    }
    else if (parseFloat(amt) === 0) {
        return '$ 0.00';
    }
    return amt;
};

const calcTotal = (fee, other, year, num) => {
    let total = parseFloat(fee) || 0;

    Object.keys(other).forEach((k) => {
        total += (parseFloat(other[k]) || 0);
    });

    if(num) {
        total *= 12;
        return total;
    } else if(year) {
        total *= 12;
        return `${currency(total || '')} / year`;
    }

    return `${currency(total || '')} / month`;
};

class CashDiscount extends Component {
    renderOtherFees(additional, additionalFees) {
        if(additional.size) {
            return [...additional].map((key, i) => (
                <div key={i}>
                    <span style={styles.textStyle}>{key}</span>
                    <span style={styles.numberTextStyle}>{currency(additionalFees[key] || 0)}</span>
                </div>
            ));
        }
    }

    renderOverview(cond) {
        if(cond) {
            return (
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
            );
        }
    }

    render() {
        const { textStyle, numberTextStyle, whiteBox } = styles;
        const { state } = this.props.location;

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
                                <span style={numberTextStyle}>{currency(state.partA.volume) || '$ 0.00'}</span>

                                {this.renderOtherFees(state.additional, state.partA.additionalFees)}

                                <span style={textStyle}>Monthly Fees</span>
                                <span style={numberTextStyle}>{currency(state.partA.Fees) || '$ 0.00'}</span>

                                <u>
                                    <span style={textStyle}>Total Cost:</span>
                                    <span style={numberTextStyle}>
                                        {calcTotal(state.partA.Fees, state.partA.additionalFees)}
                                    </span>
                                    <span style={numberTextStyle}>
                                        {calcTotal(state.partA.Fees, state.partA.additionalFees, true)}
                                    </span>
                                </u>
                            </div>
                            <div className="col-6" style={{textAlign: 'left', color: 'rgb(83,141,213)'}}>
                                <h3> Cash Discount Program </h3>
                                <span style={textStyle}>Monthly Credit Volume</span>
                                <span style={numberTextStyle}>{currency(state.partB.volume) || '$ 0.00'}</span>

                                {this.renderOtherFees(state.additional, state.partB.additionalFees)}

                                <span style={textStyle}>Monthly Fees</span>
                                <span style={numberTextStyle}>{currency(state.partB.Fees) || '$ 0.00'}</span>

                                <u>
                                    <span style={textStyle}>Total Cost:</span>
                                    <span style={numberTextStyle}>
                                        {calcTotal(state.partB.Fees, state.partB.additionalFees)}
                                    </span>
                                    <span style={numberTextStyle}>
                                        {calcTotal(state.partB.Fees, state.partB.additionalFees, true)}
                                    </span>
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
                            {currency(calcTotal(state.partA.Fees, state.partA.additionalFees, true, true) -
                                calcTotal(state.partB.Fees, state.partB.additionalFees, true, true))}
                        </span>
                        <span style={textStyle}>
                            Three Year Savings*
                        </span>
                        <span style={{...numberTextStyle, textDecoration: 'underline'}}>
                            {currency((calcTotal(state.partA.Fees, state.partA.additionalFees, true, true) -
                                calcTotal(state.partB.Fees, state.partB.additionalFees, true, true)) * 3)}
                        </span>
                        <p style={{marginBottom: 0}}> *Annual savings & Equipment cost may vary </p>
                    </div>

                    {this.renderOverview(state.overview)}
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

export default CashDiscount;
