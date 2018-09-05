import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";
import InputWithLabel from './InputWithLabel.js';

class CardInput extends Component {

    render() {
        const { id, label, partB } = this.props;

        return (
            <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col-sm-2">
                    <strong> { label } </strong>
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Volume`} placeholder="$" title="Volume" min="0" partB={partB} noDollar />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Number`} placeholder="#" title="#" min="0" partB={partB} noDollar />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Percentage`} placeholder="%" title="%" min="0" partB={partB} noDollar />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Item`} placeholder="$" title="$" min="0" partB={partB} noDollar />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Fee`} placeholder="" title="Fee" min="0" partB={partB} readonly noDollar />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(CardInput);