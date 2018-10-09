import React, { Component } from 'react';
import {connect} from "react-redux";
import { FormGroup } from 'reactstrap';
import InputWithLabel from './InputWithLabel.js';
import Heading from './Heading.js';
import {updateStateValue} from "../actions";

class BusinessInfo extends Component {
    volumeBlur(event) {
        if(event.target.value > 0) {
            if(this.props.State.partA.ticket && this.props.State.partA.ticket > 0) {
                this.props.updateStateValue('InputWithLabel', "transactions", parseFloat((event.target.value / this.props.State.partA.ticket).toFixed(2).toString()), 'partA');
            }
            else if(this.props.State.partA.transactions && this.props.State.partA.transactions > 0) {
                this.props.updateStateValue('InputWithLabel', "ticket", parseFloat((event.target.value / this.props.State.partA.transactions).toFixed(2).toString()), 'partA');
            }
        }
    }

    ticketBlur(event) {
        if(event.target.value > 0) {
            if(this.props.State.partA.volume) {
                this.props.updateStateValue('InputWithLabel', "transactions", parseFloat((this.props.State.partA.volume / event.target.value).toFixed(2).toString()), 'partA');
            }
        }
    }

    transactionsBlur(event) {
        if(event.target.value > 0) {
            if(this.props.State.partA.volume) {
                this.props.updateStateValue('InputWithLabel', "ticket", parseFloat((this.props.State.partA.volume / event.target.value).toFixed(2).toString()), 'partA');
            }
        }
    }

    render() {
        const { typeVal } = this.props;
        return (
            <div>
                <Heading headingText={"Business Info."} />

                <FormGroup>
                    <div className="row">
                        <div className="col-sm-6">
                        <InputWithLabel noDollar id="businessName" partB={typeVal} type="text" label="Business Name" required
                            placeholder="eg. John Smith" title="Type your Business Name here" />
                        </div>

                        <div className="col-sm-6">
                            <InputWithLabel noDollar id="currentProvider" partB={typeVal} type="text" label="Current Provider"
                                placeholder="eg. Clover" title="Type your Current Provider" required />
                        </div>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="row">
                        <div className="col-sm-4">
                            <InputWithLabel id="volume" partB={typeVal} type="number" label="Volume" title="Total Volume"
                               placeholder="Amount (USD)" min="0" onBlur={this.volumeBlur.bind(this)} required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="ticket" partB={typeVal} label="Average Ticket" title="Total Average Ticket"
                                placeholder="Amount (USD)" min="0" onBlur={this.ticketBlur.bind(this)} required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="transactions" partB={typeVal} label="Total Transactions" placeholder="eg. 75"
                                title="Total Transactions" min="0" onBlur={this.transactionsBlur.bind(this)} required noDollar />
                        </div>
                    </div>
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(BusinessInfo);
