import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./signUp.css";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl} from 'react-intl';

export default function SignIn(){
  const intl = useIntl()

    return(
      <Container >
        <Row style={{paddingBottom:"15%", position:"relative",margin:"all"}}>
      <Card style={{borderRadius: '25px', position: 'center', top: '90px', left: '10px' }}>
      <Card.Body>
          <Row>

          <Col md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
          <Card.Img src = 'https://raw.githubusercontent.com/gabrielagc/Image2Web/main/Pasted-Graphic-1.png' fluid/>
          </Col>


          <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
          <p className="signUp my-5 pt-5" ><FormattedMessage id="SignIn"/></p>

          <Form>
          <Form.Group className="mb-3" controlId="emailSignIn">
              <Form.Control type="email" placeholder= {intl.formatMessage({id: "email"})} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordSignIn">
            <Form.Control type="password" placeholder={intl.formatMessage({id: "password"})} />
          </Form.Group>

          <Row>
          <Button variant="default" className = 'mt-4' style={{ color: "white", background:'#F28F8F', width: '150px', height: '40px' }} type="submit">
          <FormattedMessage id="LogIn"/>
          </Button>
          </Row>
          <Link  className="create-account my-5 pt-5" to={"/signup"} ><FormattedMessage id="CreateAccount"/></Link>

          </Form>
          </Col>
          </Row>
      </Card.Body>

      </Card>
      </Row>
  </Container>

    );

}