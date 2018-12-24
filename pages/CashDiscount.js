import React, { Component } from 'react';
import {connect} from "react-redux";
import logo from '../static/logo.png';
// import { Document, Page } from 'react-pdf';
// import { Page, Document } from '@react-pdf/renderer';
/*import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as saveAs from 'file-saver';
import domtoimage from 'dom-to-image';*/

// import ReactPDF from '@react-pdf/renderer';

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
    constructor(props) {
        super(props);
        // window.html2canvas = html2canvas;
    }

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

    /*printDocument() {
        const input = document.getElementById('CD_pdf');
        const pdf = new jsPDF("landscape", "mm", "a4");


        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/JPEG');
                var a = document.getElementById('#btn');
                a.download = imgData;

                /!*const pdf = new jsPDF("landscape", "mm", "a4");
                pdf.scaleFactor = 10;

                pdf.addImage(imgData, 'JPEG', 8, 15, 280, 170);
                pdf.save("download.pdf");*!/
            });
        domtoimage.toPng(input)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;

                /!*pdf.addImage(img, 'PNG', 8, 10, 280, 160);
                pdf.save("download.pdf");*!/
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

        domtoimage.toBlob(document.getElementById('CD_pdf'))
            .then(function (blob) {
                saveAs(blob, 'my-node.JPEG');
            });
    }*/

    renderOverview(cond, serviceFee, avgServiceFee) {
        if(cond) {
            return (
                <div style={{marginLeft: '7%', marginRight: '7%', color: '#000'}}>
                    <h3> Overview </h3>
                    <p>
                        Businesses are constantly striving to keep prices low and fair, while offering as many payment
                        options as possible. Cash discount allows for this without having to raise prices but by having a
                        service fee of { `${serviceFee}` }% on all store sales and offer a discount to customers who pay with cash by
                        giving a full discount on the { `${serviceFee}` }% service fee.
                    </p>
                    <p>
                        Your estimated Average Service Fee is $ {`${avgServiceFee}`}.
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

        console.log('CDDDDDDDD', this.props);

        const { state } = this.props.location;

        return (
            <div>
                {/*<div className="mb5">
                    <a id={"btn"} href="#">
                        <button onClick={this.printDocument}>Print</button>
                    </a>
                </div>*/}
                <br/>
                <div id={"CD_pdf"} className="container-fluid">
                    <center>
                        <img src={logo} className="App-logo" style={{marginLeft: "3rem", height: "6rem"}} alt="logo" />
                        <br/><br/>

                        <div>
                            <div className="row" style={{textAlign: 'right'}}>
                                <div className="col-6" style={{color: 'black'}}>
                                    <h3> Standard Program </h3>
                                    <span style={textStyle}>Monthly Credit Volume</span>
                                    <span style={numberTextStyle}>{currency(state.volume) || '$ 0.00'}</span>

                                    {this.renderOtherFees(state.additional, state.partA.additionalFees)}

                                    <span style={textStyle}>Monthly Fees</span>
                                    <span style={numberTextStyle}>{currency(state.partA.Fees) || '$ 0.00'}</span>

                                    <u>
                                        <span style={textStyle}>Total Cost:</span>
                                    </u>
                                    <div style={{color: 'red'}}>
                                        <u>
                                            <span style={numberTextStyle}>
                                                {calcTotal(state.partA.Fees, state.partA.additionalFees)}
                                            </span>
                                            <span style={numberTextStyle}>
                                                {calcTotal(state.partA.Fees, state.partA.additionalFees, true)}
                                            </span>
                                        </u>
                                    </div>
                                </div>
                                <div className="col-6" style={{textAlign: 'left', color: 'rgb(83,141,213)'}}>
                                    <h3> Cash Discount Program </h3>
                                    <span style={textStyle}>Monthly Credit Volume</span>
                                    <span style={numberTextStyle}>{currency(state.volume) || '$ 0.00'}</span>

                                    {this.renderOtherFees(state.additional, state.partB.additionalFees)}

                                    <span style={textStyle}>Monthly Fees</span>
                                    <span style={numberTextStyle}>{currency(state.partB.Fees) || '$ 0.00'}</span>

                                    <u>
                                        <span style={textStyle}>Total Cost:</span>
                                    </u>
                                    <div style={{color: 'green'}}>
                                        <u>
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
                        </div>
                    </center>

                    <br/>

                    <div style={{backgroundImage: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', color: '#FFF'}}>
                        <br/>
                        <div style={whiteBox}>
                            <span style={textStyle}>
                                Annual Savings*
                            </span>
                            <span style={{...numberTextStyle, textDecoration: 'underline', color: 'green'}}>
                                {currency(calcTotal(state.partA.Fees, state.partA.additionalFees, true, true) -
                                    calcTotal(state.partB.Fees, state.partB.additionalFees, true, true))}
                            </span>
                            <span style={textStyle}>
                                Three Year Savings*
                            </span>
                            <span style={{...numberTextStyle, textDecoration: 'underline', color: 'green'}}>
                                {currency((calcTotal(state.partA.Fees, state.partA.additionalFees, true, true) -
                                    calcTotal(state.partB.Fees, state.partB.additionalFees, true, true)) * 3)}
                            </span>
                            <p style={{marginBottom: 0}}> *Annual savings & Equipment cost may vary </p>
                        </div>

                        {console.log('$#@#$', state.avgTicket, state.serviceFeePercent)}

                        {this.renderOverview(state.overview, state.serviceFeePercent,
                            (parseFloat(state.avgTicket) * parseFloat(state.serviceFeePercent) / 100) || '')}
                        <br/>
                    </div>
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
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
};

const mapStateToProps = (stateV) => {
    return ({ location: {state: stateV.CashDiscountState }});
};

export default connect(mapStateToProps)(CashDiscount);

