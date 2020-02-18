import React from 'react';
import { Header, Container, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import { tickers } from '../constants/tickerDropdown';
import { formatter } from '../constants/formatCurrency';

class PurchaseStocks extends React.Component {

  state = {
    buy: {
      ticker: '',
      qty: ''
    },
    error: false
  };

  handleSelect = (e, data) => {
    this.setState({
      buy: {
        ...this.state.buy,
        ticker: data.value
      },
      error: false
    })
  };

  handleChange = (e) => {
    this.setState({
      buy: {
        ...this.state.buy,
        qty: e.target.value
      }
    })
  }

  buyStockOrThrowError = () => {
    //if qty * current stock price < user.cash then fetch, otherwise throw error  
    const stockPrice = this.props.currentPrices[this.state.buy.ticker];
    const totalPurchasePrice = formatter.format(this.state.buy.qty * stockPrice);
    
    if(totalPurchasePrice < this.props.user.cash) {
      this.purchaseStock()
    } else {
      this.setState({ error: true })
    }
  }

  purchaseStock = () => {
    const stockPrice = this.props.currentPrices[this.state.buy.ticker];
    fetch('http://localhost:3000/api/v1/transactions',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        stock: this.state.buy,
        price: stockPrice,
        user_id: this.props.user.id
      })
    })
    .then(resp => resp.json())
    .then(this.setState({
      buy: {
        ticker: '',
        qty: ''
      }
    }))
  }

  render(){
    return (
      <Container>
        <Header as='h3' textAlign='left'>Cash - {formatter.format(this.props.user.cash)}</Header>
        <br />
        
        <Form onSubmit={this.buyStockOrThrowError} error={this.state.error}>
          <Form.Field>
            <Dropdown onChange={this.handleSelect} placeholder='Ticker' value={this.state.buy.ticker} clearable selection options={tickers} />
          </Form.Field>
          <Form.Field onChange={this.handleChange} >
            <input name='qty' type='number' min={0} placeholder='Qty' value={this.state.buy.qty}/>
        </Form.Field>
        <Button className='buy-btn' type='submit'>Buy</Button>
        <Message
          error
          header='You Need More Cash!'
          content='Try a smaller amount or shares.'
        />
        </Form>
      </Container>
    )
  }
}

export default PurchaseStocks