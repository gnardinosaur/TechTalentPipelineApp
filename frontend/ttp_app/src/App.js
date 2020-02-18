import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Transactions from './components/Transactions';
import Portfolio from './components/Portfolio';
import { convertStringToNum } from './constants/formatCurrency';

class App extends React.Component {

  state = {
    user: {
      name: '',
      email: '',
      cash: 0
    }
  };

  setUser = (user) => {
    this.setState({ user })
  }

  decreaseCash = (totalPurchasePrice) => {
    const newBalance = parseInt(this.state.user.cash) - convertStringToNum(totalPurchasePrice)
    debugger;
    this.setState({ 
      user: {
        ...this.state.user,
        cash: newBalance
      }
    }, () => console.log(this.state))
  }

  render(){
    return (
      <div className='App'>
        <Switch>
          <Route path='/sign_in' render={(routerProps) => <SignIn {...routerProps} user={this.state.user} setUser={this.setUser} />} />
          <Route path='/portfolio' render={(routerProps)  => <Portfolio user={this.state.user} {...routerProps} decreaseCash={this.decreaseCash} />} />
          <Route path='/transactions' render={(routerProps) => <Transactions {...routerProps} />} />
          <Route path='/' render={(routerProps) => <Register {...routerProps} user={this.state.user} setUser={this.setUser} />} />
        </Switch>
      </div>
    )
  };
};

export default App;
