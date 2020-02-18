import React from 'react';
import { Header, List, Container, Grid, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import { tickers } from '../constants/tickerDropdown';
import { formatter } from '../constants/formatCurrency';

class Portfolio extends React.Component {

  state = {
    userStocks: [],
    stocks: {},
    buy: {
      ticker: '',
      qty: 0
    },
    error: false
  };

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/stocks')
    .then(resp => resp.json())
    .then(stocksObject => this.saveStockData(stocksObject))
  };

  saveStockData = (stocksObject) => {
    this.setState({
      stocks: stocksObject,
      error: false
    });
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
    const stockPrice = this.state.stocks[this.state.buy.ticker];
    const totalPurchasePrice = formatter.format(this.state.buy.qty * stockPrice);
    
    if(totalPurchasePrice < this.props.user.cash) {
      this.purchaseStock()
    } else {
      this.setState({ error: true })
    }
  }

  purchaseStock = () => {
    const stockPrice = this.state.stocks[this.state.buy.ticker];
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
    .then(newTransaction => {
      this.setState({
        userStocks: [...this.state.userStocks, newTransaction],
        buy: {
          ticker: '',
          qty: 0
        }
      })
    })
  }

  render(){
    return (
      <Container className='portfolio'>
        <List as='a' divided={true} horizontal floated='right'>
          <List.Item disabled={true} content={<u>Portfolio</u>} />
          <List.Item id='trans-link' onClick={() => this.props.history.push('/transactions')}content={<u>Transactions</u>} />
        </List>
        <br />

        <Header as='h1' textAlign='left'>Portfolio ($$$)</Header>
        <br />

        <Grid columns={2} divided relaxed='very'>
          <Grid.Row>
            <Grid.Column>
              <List divided relaxed>
                {/* list of stocks go here */}
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as='h3' textAlign='left'>Cash - {formatter.format(this.props.user.cash)}</Header>
              <br />
              <Form onSubmit={this.buyStockOrThrowError} error={this.state.error}>
                <Form.Field>
                  <Dropdown onChange={this.handleSelect} placeholder='Ticker' clearable selection options={tickers} />
                </Form.Field>
                <Form.Field onChange={this.handleChange} >
                  <input name='qty' type='number' min={0} placeholder='Qty' />
              </Form.Field>
              <Button className='buy-btn' type='submit'>Buy</Button>
              <Message
                error
                header='You Need More Cash!'
                content='Try a smaller amount or shares.'
            />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  };
};

export default Portfolio; 

