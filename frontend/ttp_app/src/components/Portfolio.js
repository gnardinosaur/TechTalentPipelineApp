import React from 'react';
import { Header, List, Container, Grid, Form, Button, Dropdown } from 'semantic-ui-react';
import { tickers } from '../constants/tickerDropdown';

class Portfolio extends React.Component {

  state = {
    stocks: [],
    buy: {
      ticker: '',
      qty: 0
    }
  };

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/stocks')
    .then(resp => resp.json())
    .then(stocksObject => this.saveStockData(stocksObject))
  };

  saveStockData = (stocksObject) => {
    //turn stock object into arrays for easier manipulation
    const stocksArray = Object.entries(stocksObject);
    
    // this.setState({
    //   stocks: stocksArray
    // });
  };


  handleSelect = (e, data) => {
    this.setState({
      buy: {
        ...this.state.buy,
        ticker: data.value
      }
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

  buyStock = () => {
    //if qty * price < user.cash then fetch, otherwise error message 
    fetch('http://localhost:3000/api/v1/transactions',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        stock: this.state.buy
      })
    })
  }

  render(){
    console.log(this.state)

    //format currency integer to $USD
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

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
              <Form onSubmit={this.buyStock}>
                <Form.Field>
                  <Dropdown onChange={this.handleSelect} placeholder='Ticker' clearable selection options={tickers} />
                </Form.Field>
                <Form.Field onChange={this.handleChange}>
                  <input name='qty' type='number' min={0} placeholder='Qty' />
              </Form.Field>
              <Button className='buy-btn' type='submit'>Buy</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  };
};

export default Portfolio; 

