import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import "./signUp.css";
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl} from 'react-intl';



export default function SignUp(){

  const [user, setUser] = useState([]);

  const intl = useIntl()

  const [nombre, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [date, setDate] = useState("")

  const navigate = useNavigate();
  
  

  const usuario_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fZXNjcml0dXJhIiwic3ViIjoyMSwicm9sZXMiOlsidXN1YXJpb19lc2NyaXR1cmEiXSwiaWF0IjoxNjY5MDcxODc3fQ.MtPdTK-s58lbxmPDih1GR2G4iRUCfG_yro4yho9eTiU"
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
  

  async function register(){

    var name = nombre.split(" ");
    var age =  getAge(date);
    var birthday = new Date(date)

    if(!navigator.onLine){
      if(localStorage.getItem("user_SignUp") === null){
        setUser("Loading...");
      } else{
        setUser(JSON.parse(localStorage.getItem("user_SignUp")));
      }
    } else {

    let result = await fetch("http://localhost:3000/api/v1/usuarios",{
      method: "POST",  
      body: JSON.stringify({
        nombre: name[0],
        apellido: name[1], 
        email: email,
        "bio": "",
        "usuario": nombre + age,
        "edad": age,
        "cumpleanios" : birthday ,
        "rutaFotoPerfil": "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg",
        "rutaFotoPortada": "https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png",
        "genero": gender,
        "presupuesto": 0,
        "disponibilidadDeTiempo": ""
     }),
        headers:{
          "Authorization":  `Bearer ${usuario_token}`,
          'Content-Type': 'application/json'
        }

      })
      result = await result.json()

      localStorage.setItem("idUser", result.id)
      console.log(localStorage.getItem("idUser"));
      setUser(result)
      localStorage.setItem("user_SignUp", JSON.stringify(result))
      navigate("/feed")
    }


    }


    return (
        <Container>
          <Row style={{paddingBottom:"15%", position:"relative",margin:"all"}}>
            <Card style={{borderRadius: '25px', position: 'center', top: '90px', left: '10px' }}>
            <Card.Body>
                <Row>

                <Col md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <Card.Img src = 'https://raw.githubusercontent.com/gabrielagc/ImageWeb/main/1.png' fluid/>
                </Col>


                <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="signUp my-5 pt-5" ><FormattedMessage id="SignUp"/></p>

                {/* <div className = 'Form'> */}
                <Form>
                <Form.Group className="mb-3" controlId="nameSignUp">
                  <Form.Control value = {nombre} type="text" placeholder={intl.formatMessage({id: "Fullname"})} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="emailSignUp">
                    <Form.Control value = {email} type="email" placeholder={intl.formatMessage({id: "email"})}onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordSignUp">
                  <Form.Control type="password" placeholder={intl.formatMessage({id: "password"})}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="repeatPasswordSignUp" >
                  <Form.Control type="password" placeholder={intl.formatMessage({id: "RepeatPassword"})}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="genderSignUp" onChange={(e) => setGender(e.target.value)} value = {gender}>
                <Form.Label className = "fw-bold mr-4"><FormattedMessage id="gender"/></Form.Label  >
                <Form.Check 
                  inline
                  type= 'radio'
                  label = {intl.formatMessage({id: "male"})}
                  value = 'Masculino'
                  name = 'gender'
                  aria-label='Male Button'
                  className = "mx-4"
                />
                <Form.Check 
                  inline
                  type= 'radio'
                  label = {intl.formatMessage({id: "female"})}
                  value = 'Femenino'
                  name = 'gender'
                  aria-label='Female Button'

                />
                <Form.Check 
                inline
                type= 'radio'
                label = {intl.formatMessage({id: "other"})}
                value = 'Otro'
                name = 'gender'
                aria-label='Other Button'

                />
                </Form.Group>

                <Form.Group controlId="dateBirthSignUp">
                <Form.Label className = "fw-bold mr-4"><FormattedMessage id="dateOfBirth"/></Form.Label>
                <Form.Control  value = {date} type="date" name='dateBirth'  onChange={(e) => setDate(e.target.value)} />
                </Form.Group>

                <Button onClick = {register} variant="default" className = 'mt-4' style={{ color: "white", background:'#F28F8F', width: '150px', height: '40px' }} >
                <FormattedMessage id="Register"/>
                </Button>

                </Form>
                </Col>
                </Row>
            </Card.Body>

            </Card>
            </Row>
        </Container>
    
    );
}