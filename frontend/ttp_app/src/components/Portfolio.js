import React from 'react';
import { Header, List, Container, Grid, Form, Button} from 'semantic-ui-react';

class Portfolio extends React.Component {
  render(){
    return (
      <Container className='portfolio'>
        <List as='a' divided={true} horizontal floated='right'>
          <List.Item disabled={true} content={<u>Portfolio</u>} />
          <List.Item content={<u>Transactions</u>} />
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
            <Grid.Column width={4}>
              <Header as='h3' textAlign='left'>Cash - $$$</Header>
              <br />
              <Form>
                <Form.Field>
                  <input name='ticker' placeholder='Ticker' />
                </Form.Field>
                <Form.Field>
                  <input name='qty' placeholder='Qty' />
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

