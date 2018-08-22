import React, { Component } from 'react';
import InputWithLabel from './InputWithLabel.js';
import Heading from './Heading.js';

class BusinessInfo extends Component {

    render() {
        return (
            <div>
                <Heading headingText={"Business Info."} />

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                        <InputWithLabel id="businessName" partB={this.props.typeVal} type="text" label="Business Name"
                            placeholder="eg. John Smith" title="Type your Business Name here" required />
                        </div>

                        <div className="col-sm-6">
                            <InputWithLabel id="currentProvider" partB={this.props.typeVal} type="text" label="Current Provider"
                                placeholder="eg. Clover" title="Type your Current Provider" required />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-4">
                            <InputWithLabel id="volume" partB={this.props.typeVal} type="number" label="Volume"
                                title="Total Volume" placeholder="Amount (USD)" min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="ticket" partB={this.props.typeVal} label="Average Ticket"
                                title="Total Average Ticket" placeholder="Amount (USD)" min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="transactions" partB={this.props.typeVal} label="Total Transactions"
                                placeholder="eg. 75" title="Total Transactions" min="0" required />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BusinessInfo;