import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessInfo from './FormComponents/BusinessInfo.js';
import ProcessingFee from './FormComponents/ProcessingFee.js';
import AdditionalFee from './FormComponents/AdditionalFee.js';
import AssociationNAuth from './FormComponents/AssociationNAuth.js';
import Excel from './FormComponents/Excel.js';
import {connect} from "react-redux";
import {resetForm} from "./actions";

const cardDetails = () => ({
    Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
});

const STATE = {
    businessName: '', currentProvider: '',
    volume: '', ticket: '', transactions: '',
    assoFee: '', authFee: '',
    monthlyFee: '', regulatoryFee: '', pciFee: '',
    techFee: '', pos: '', misc: '',
    VISA: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    Mastercard: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    Discover: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    AMEX: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    amexCheck: false,
    amexFee: ''
};

class App extends Component {
  constructor(props) {
      super(props);
      this.state = STATE;
  }

  reset() {
      this.props.resetForm();

      document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  handleSubmit(event) {
      this.reset();
      event.preventDefault();
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Proposal Generator </h1>
        </header>

        <div className="container-fluid">
            <form onSubmit={this.handleSubmit.bind(this)} className="Form-Container">

                <BusinessInfo />

                <ProcessingFee />

                <AssociationNAuth />

                <AdditionalFee />

                <div style={{float: "right"}} className="form-group">
                    <Excel fee={`7595`} value={this.state} />
                    <button type="button" onClick={this.reset.bind(this)} style={{marginLeft: "10px"}} className="btn btn-secondary"> Reset </button>
                </div>

                <br/>

            </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {resetForm})(App);