import React from 'react';
import './App.css';
import { Container, Button, Form, Divider, Segment } from 'semantic-ui-react'


function App(props) {
  return (
    <div className="App">
      <Container className="welcome-container">
        <Segment placeholder>
          <h1>Register</h1>
          <br />
          <Form>
            <Form.Field>
              <input name="name" placeholder="name..." />
            </Form.Field>
            <Form.Field>
              <input name="email" placeholder="email..." />
            </Form.Field>
            <Form.Field>
              <input name="password" type="password" placeholder="password..." />
            </Form.Field>
            <Button>Register</Button>
          </Form>
        </Segment>
          <Divider horizontal>Or</Divider>
        <Button onClick={() => props.history.push('/sign_in')} >Sign In</Button>
      </Container>
    </div>
  );
}

export default App;
