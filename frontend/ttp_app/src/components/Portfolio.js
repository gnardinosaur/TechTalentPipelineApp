import React from 'react';
import UserStocks from './UserStocks';
import PurchaseStocks from './PurchaseStocks';
import { Header, List, Container, Grid } from 'semantic-ui-react';

class Portfolio extends React.Component {

  state = {
    stocksObject: {},
    stocksLoaded: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/stocks')
    .then(resp => resp.json())
    .then(stocksObject => this.setState({ 
      stocksObject,
      stocksLoaded: true
    }))
  };

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
              {/* list of user's stocks/transactions here */}
              {this.state.stocksLoaded && <UserStocks user={this.props.user} currentPrices={this.state.stocksObject} />}
            </Grid.Column>
            <Grid.Column width={5}>
              {/* stock purchase form here */}
              {this.state.stocksLoaded && <PurchaseStocks user={this.props.user} currentPrices={this.state.stocksObject} decreaseCash={this.props.decreaseCash}/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  };
};

export default Portfolio; 

