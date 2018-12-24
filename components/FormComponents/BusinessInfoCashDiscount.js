import React, { Component } from 'react';
import {connect} from "react-redux";
import { FormGroup } from 'reactstrap';
import { updateBusinessInfo } from '../../redux/actions';
import LabelAndInput from './LabelAndInput';

class BusinessInfoCashDiscount extends Component {
    volumeBlur(event) {
        if(event.target.value > 0) {
            if(this.props.State.avgTicket && this.props.State.avgTicket > 0) {
                this.props.updateBusinessInfo("transactions",
                    parseFloat((event.target.value / this.props.State.avgTicket).toFixed(2).toString()));
            }
            else if(this.props.State.transactions && this.props.State.transactions > 0) {
                this.props.updateBusinessInfo("avgTicket",
                    parseFloat((event.target.value / this.props.State.transactions).toFixed(2).toString()));
            }
        }
    }

    ticketBlur(event) {
        if(event.target.value > 0) {
            if(this.props.State.volume) {
                this.props.updateBusinessInfo("transactions",
                    parseFloat((this.props.State.volume / event.target.value).toFixed(2).toString()));
            }
        }
    }

    transactionsBlur(event) {
        if(event.target.value > 0) {
            if(this.props.State.volume) {
                this.props.updateBusinessInfo("avgTicket",
                    parseFloat((this.props.State.volume / event.target.value).toFixed(2).toString()));
            }
        }
    }

    inputValueHandler(event, stateProp) {
        let val = event.target.value;

        if(stateProp !== 'businessName' && stateProp !== 'currentProvider') {
            if (event.target.value !== "." && isNaN(event.target.value)) {
                val = "";
            } else {
                if (event.target.name === "transactions" || (event.target.name.indexOf("Number")) > -1) {
                    val = isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value);
                }
            }
        }

        this.props.updateBusinessInfo(stateProp, val);
    }

    render() {
        const {part, includeServiceFee} = this.props;
        return (
            <div>
                <FormGroup>
                    <div className="row">
                        <div className="col-sm-6">
                            <LabelAndInput label='Business Name' type={'text'} placeholder='eg., John Smith'
                               id={`BusinessName_${part}`} value={this.props.State.businessName} required
                               onChange={(evt) => this.inputValueHandler(evt, 'businessName')}
                            />
                        </div>

                        <div className="col-sm-6">
                            <LabelAndInput label='Current Provider' type={'text'} placeholder='eg., Clover'
                               id={`CurrentProvider_${part}`} value={this.props.State.currentProvider} required
                               onChange={(evt) => this.inputValueHandler(evt, 'currentProvider')}
                            />
                        </div>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="row">
                        <div className="col-sm-3">
                            <LabelAndInput label='Volume' type={'number'} placeholder='Amount (USD)' min='0'
                               id={`Volume_${part}`} value={this.props.State.volume} required symbol
                               onChange={(evt) => this.inputValueHandler(evt, 'volume')}
                               onBlur={this.volumeBlur.bind(this)}
                            />
                        </div>

                        <div className="col-sm-3">
                            <LabelAndInput label='Average Ticket' type={'number'} placeholder='Amount (USD)' min='0'
                               id={`AvgTicket_${part}`} value={this.props.State.avgTicket} required symbol
                               onChange={(evt) => this.inputValueHandler(evt, 'avgTicket')}
                               onBlur={this.ticketBlur.bind(this)}
                            />
                        </div>

                        <div className="col-sm-3">
                            <LabelAndInput label='Total Transactions' type={'number'} placeholder='eg. 75' min='0'
                               id={`Transactions_${part}`} value={this.props.State.transactions} required
                               onChange={(evt) => this.inputValueHandler(evt, 'transactions')}
                               onBlur={this.transactionsBlur.bind(this)}
                            />
                        </div>
                        {(includeServiceFee) ? (
                            <div className="col-sm-3">
                                <LabelAndInput label='Service Fee %' placeholder='3.95' min='0'
                                   id={`ServiceFeePercent_${part}`} value={this.props.State.serviceFeePercent} required
                                   onChange={(evt) => this.inputValueHandler(evt, 'serviceFeePercent')} percentage
                                />
                            </div>) : <div />}

                    </div>
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return ({State: stateV.CashDiscountState});
};

export default connect(mapStateToProps, {updateBusinessInfo})(BusinessInfoCashDiscount);
