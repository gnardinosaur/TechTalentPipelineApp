import React from 'react';
import { Button, Form, Segment, Container } from 'semantic-ui-react'


function SignIn(){
  return (
    <Container className="sign-in-container">
      <Segment placeholder>
        <h1>Sign In</h1>
        <br />
        <Form>
          <Form.Field>
            <input name="name" placeholder="name..." />
          </Form.Field>
          <Form.Field>
            <input name="email" placeholder="email..." />
          </Form.Field>
          <Button>Sign In</Button>
        </Form>
      </Segment>
    </Container>
  )
};

export default SignIn;