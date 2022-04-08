// src/components/Debits.js
//import AccountBalance from './AccountBalance';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './leftside.css'

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
    };
  }

  render() {
    return (
      <div>
        <Link to="/" className='HomeButton'>Home</Link>

        <h1>Debits</h1>

        <h4 className='debit'>Total Debit Value: {this.props.debitBalance}</h4>
        <h4 className='credit'>Total Credit Value: {this.props.creditBalance}</h4>
        <h4 className='account'>Account Balance: {this.props.accountBalance}</h4>
        <ul>
          {
            this.props.debit_array.map((statements) => {
              return <li>{statements}</li>
            })
          }
        </ul>
        <label>Amount</label>
        <input type="text" value={this.props.debit_value} onChange={this.props.debit_numeric_update} />
        <label>Description</label>
        <input type="text" value={this.props.debit_statement} onChange={this.props.debit_update} />
        <button
          type="button"
          onClick={this.props.addDebit}>Add Statement</button>
        <Link to="/credits" className='Linkclass'>Credit Page</Link>
      </div>
    )
  }
}
export default Debits;