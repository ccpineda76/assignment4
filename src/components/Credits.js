// src/components/Credits.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './leftside.css'

class Credits extends Component {
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
                <h1>Credits</h1>
                <h4 className='debit'>Total Debit Value: {this.props.debitBalance}</h4>
                <h4 className='credit'>Total Credit Value: {this.props.creditBalance}</h4>
                <h4 className='account'>Account Balance: {this.props.accountBalance}</h4>
                <ul>
                    {
                        this.props.credit_array.map((statements) => {
                            return <li>{statements}</li>
                        })
                    }
                </ul>
                <label>Amount</label>
                <input type="text" value={this.props.credit_value} onChange={this.props.credit_numeric_update} />
                <label>Description</label>
                <input type="text" value={this.props.credit_statement} onChange={this.props.credit_update} />
                <button
                    type="button"
                    onClick={this.props.addCredit}>Add Statement</button>
                <Link to="/Debits" className='Linkclass'>Debits Page </Link>
            </div>
        )
    }
}
export default Credits;