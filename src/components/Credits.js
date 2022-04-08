// src/components/Credits.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                <h1>Credits</h1>
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
                <h2>Total Credit Value: {this.props.creditBalance}</h2>
                <h3>Total Debit Value: {this.props.debitBalance}</h3>
                <h4>Account Balance: {this.props.accountBalance}</h4>
                <Link to="/Debits">Debits </Link>
                <br/>
                <Link to = "/">Home</Link>
            </div>
        )
    }
}
export default Credits;