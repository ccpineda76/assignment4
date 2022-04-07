// src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

class App extends Component {
  constructor(props) {  // Create and initialize state
    super(props);
    this.state = {
      accountBalance: 14568.27,
      debitBalance: 0,
      creditBalance: 0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
  }

  updateAccountBalance = balance => {
    this.setState({
      accountBalance: balance
    })
  }
  //Adding implementation of updating debitBalance
  updateDebit = debit => {
    this.setState({
      debitBalance: this.state.debitBalance + debit
    })
  }

  //Adding implementation of updating creditBalance
  updateCredit = credit => {
    this.setState(
      {
        creditBalance: this.state.creditBalance + credit
      }
    )
  }

  // Create Routes and React elements to be rendered using React components
  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);  // Pass props to "LogIn" component
    //Creating Credits Implementation
    const CreditsComponent = () =>
    (<Credits
      accountBalance={this.state.accountBalance}
      updateAccountBalance={this.updateAccountBalance}
      updateCredit={this.updateCredit}
      creditBalance={this.state.creditBalance}
    />);
    //Creating Debit Implementation
    const DebitsComponent = () =>
    (
      <Debits
        accountBalance={this.state.accountBalance}
        updateAccountBalance={this.updateAccountBalance}
        updateDebit={this.updateDebit}
        debitBalance={this.state.debitBalance} />
    );

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/Debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;