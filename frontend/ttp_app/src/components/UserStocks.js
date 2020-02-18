import React from 'react';
import { List, Container, Grid, Header } from 'semantic-ui-react';
import { formatter } from '../constants/formatCurrency';

class UserStocks extends React.Component {

  state = {
    userStocks: [],
    summedArray: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/transactions`)
    .then(resp => resp.json())
    .then(userStocks => this.setState({ userStocks }, () => this.buildUserStockObject()))
  };

  buildUserStockObject = () => {
    //create a simple object --> {ticker: number of shares}
    const tickersAndQtyObject = {};
    this.state.userStocks.forEach(el => {
      if(tickersAndQtyObject[el.ticker]){
        tickersAndQtyObject[el.ticker] += el.num_shares
      } else {
        tickersAndQtyObject[el.ticker] = el.num_shares;
      }
    })
    //convert the object back to an array with summed number of shares owned by that user 
    const summedArray = Object.entries(tickersAndQtyObject)
    this.setState({ summedArray })
  }

  render(){
    const stockList = this.state.summedArray.map((el, index) => {
      //change color of text based on lastPrice and PreviousClose --> if lastPrice > PrevClose then green text, if lastPrice < prevClose red text, otherwise gray text
      let currentPrice;
      if(this.props.currentPrices[el[0]].lastPrice > this.props.currentPrices[el[0]].prevClose) {
        currentPrice = <p style={{ color: 'green' }}>{formatter.format(this.props.currentPrices[el[0]].lastPrice * el[1])}</p>
      } else if (this.props.currentPrices[el[0]].lastPrice === this.props.currentPrices[el[0]].prevClose) {
        currentPrice = <p style={{ color: 'gray' }}>{formatter.format(this.props.currentPrices[el[0]].lastPrice * el[1])}</p>
      } else {
        currentPrice = <p style={{ color: 'red' }}>{formatter.format(this.props.currentPrices[el[0]].lastPrice * el[1])}</p>
      }

      return (
        <List.Item key={index}>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as='h4'>{el[0]}</Header>
            </Grid.Column>
            <Grid.Column>
              {el[1]} Shares
            </Grid.Column>
            <Grid.Column>
              {currentPrice}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </List.Item>
      )
    });

    return(
      <Container>
        {/* render list of user's stocks */}
        <List divided relaxed> 
          {stockList}
        </List>
      </Container>
    )
  }

};

export default UserStocks;
