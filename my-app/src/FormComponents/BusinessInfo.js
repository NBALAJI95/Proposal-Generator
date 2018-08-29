import React, { Component } from 'react';
import InputWithLabel from './InputWithLabel.js';
import Heading from './Heading.js';
import { FormGroup } from 'reactstrap';

class BusinessInfo extends Component {

    render() {
        const { typeVal } = this.props;
        return (
            <div>
                <Heading headingText={"Business Info."} />

                <FormGroup>
                    <div className="row">
                        <div className="col-sm-6">
                        <InputWithLabel id="businessName" partB={typeVal} type="text" label="Business Name" required
                            placeholder="eg. John Smith" title="Type your Business Name here" />
                        </div>

                        <div className="col-sm-6">
                            <InputWithLabel id="currentProvider" partB={typeVal} type="text" label="Current Provider"
                                placeholder="eg. Clover" title="Type your Current Provider" required />
                        </div>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="row">
                        <div className="col-sm-4">
                            <InputWithLabel id="volume" partB={typeVal} type="number" label="Volume" title="Total Volume"
                               placeholder="Amount (USD)" min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="ticket" partB={typeVal} label="Average Ticket" title="Total Average Ticket"
                                placeholder="Amount (USD)" min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="transactions" partB={typeVal} label="Total Transactions" placeholder="eg. 75"
                                title="Total Transactions" min="0" required />
                        </div>
                    </div>
                </FormGroup>
            </div>
        );
    }
}

export default BusinessInfo;