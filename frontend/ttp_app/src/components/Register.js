import React from 'react';
import { Container, Button, Form, Divider, Segment, Message } from 'semantic-ui-react';

class Register extends React.Component {

  state = {
    user: {
      name: '',
      email: '',
      password: ''
    },
    error: false
  }

  handleChange = (e) => {
    this.setState({ 
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
      error: false
    });
  };

  createUser = () => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.user
      })
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.status === 'OK') {
        //set user in App's state
        this.props.setUser(data.user)
        //redirect to Portfolio page
        this.props.history.push('/portfolio')
      } else {
        //render error message
        this.setState({ error: true })
      }
    })
  }

  render(){
    console.log(this.state)
    return (
      <Container className='welcome-container'>
        <Segment placeholder>
          <h1>Register</h1>
          <br />
          <Form error={this.state.error} >
            <Form.Field onChange={this.handleChange}>
              <input name='name' placeholder='name...' />
            </Form.Field>
              <Message
                error
                header='Invalid Name'
                content='Name has aready been taken, please try another.' 
              />
            <Form.Field onChange={this.handleChange}>
              <input name='email' placeholder='email...' />
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <input name='password' type='password' placeholder='password...' />
            </Form.Field>
            <Button onClick={this.createUser}>Register</Button>
          </Form>
        </Segment>
          <Divider horizontal>Or</Divider>
        <Button onClick={() => this.props.history.push('/sign_in')} >Sign In</Button>
      </Container>
    )
  }
};

export default Register;