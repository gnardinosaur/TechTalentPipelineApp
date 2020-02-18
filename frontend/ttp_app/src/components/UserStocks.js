import React from 'react';
import { List, Container, Grid } from 'semantic-ui-react';

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
    //create a simple object of ticker: number of shares
    const tickersAndQtyObject = {};
    [...this.state.userStocks].forEach(el => {
      if(tickersAndQtyObject[el.ticker]){
        tickersAndQtyObject[el.ticker] += el.num_shares
      } else {
        tickersAndQtyObject[el.ticker] = el.num_shares
      }
    })
    //convert the object back to an array with summed up number of shares 
    const summedArray = Object.entries(tickersAndQtyObject)
    this.setState({ summedArray })
  }

  render(){
    const stockList = this.state.summedArray.map(el => {
      return (
        <List.Item>
        <Grid columns={3} divided >
          <Grid.Row>
            <Grid.Column>
              {el[0]}
            </Grid.Column>
            <Grid.Column>
              {el[1]} Shares
            </Grid.Column>
            <Grid.Column>
              current price placeholder
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