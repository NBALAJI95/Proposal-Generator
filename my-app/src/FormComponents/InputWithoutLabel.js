import React, { Component } from 'react';

class CardInput extends Component {

    render() {
        const id = this.props.id;

        return (
            <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col-sm-2">
                    <strong> { this.props.label } </strong>
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Volume`} name={`${id}_Volume`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="Volume" onChange={this.props.onChange}
                       value={this.props.value.Volume} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Number`} name={`${id}_Number`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="#" onChange={this.props.onChange}
                       value={this.props.value.Number} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Percentage`} name={`${id}_Percentage`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="%" onChange={this.props.onChange}
                       value={this.props.value.Percentage} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Item`} name={`${id}_Item`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="Item" onChange={this.props.onChange}
                       value={this.props.value.Item} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Fee`} name={`${id}_Fee`} className="form-control" min="0" type="text"
                       style={{width: '100%'}} placeholder="Fee" onChange={this.props.onChange}
                       value={this.props.value.Fee} />
                </div>
            </div>
        );
    }
}

export default CardInput;