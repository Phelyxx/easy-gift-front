import { Container, Card, Row, Col, FormGroup} from "react-bootstrap";
import "./profile.css";
import { FaCamera } from 'react-icons/fa';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl} from 'react-intl';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function EditProfile(props){

  

  const intl = useIntl()

  const [nombre, setNombre] = useState(props.nombre);
  const [email, setEmail] = useState(props.email);
  const [usuario, setUsuario] = useState(props.usuario);
  const [genero, setGenero] = useState(props.genero);
  const [date, setDate] = useState(props.cumpleanios);
  const [bio, setBio] = useState(props.bio);
  const [perfil, setPerfil] = useState(props.rutaFotoPerfil);
  const [budget, setBudget] = useState(props.presupuesto);
  const [availability, setAvailability] = useState(props.disponibilidadDeTiempo);

  const[newUsuario, SetnewUsuario] = useState([]);

  const navigate = useNavigate();

  const usuario_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9fZXNjcml0dXJhIiwic3ViIjoyMSwicm9sZXMiOlsidXN1YXJpb19lc2NyaXR1cmEiXSwiaWF0IjoxNjY5NTE1MDc4fQ.guC_FLUBq7fQI85Q1jljH5_chX3HuGfhJgVqZkt2vSA"

  

  

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
  function refreshPage() {
    window.location.reload(false);
  }

  async function editprofile(){

    var name = nombre.split(" ");

    var edad =  getAge(date);
    var birthday = new Date(date)
    var presupuesto = parseInt(budget)

    if (!navigator.onLine) {
      if (localStorage.getItem("new_usuario") === null) {
        SetnewUsuario("Loading...");
      } else {
        SetnewUsuario(JSON.parse(localStorage.getItem("new_usuario")));
      }
    } else {
    let result = await fetch("http://localhost:3000/api/v1/usuarios/" + props.id,{
      method: "PUT",  
      body: JSON.stringify({
        nombre: name[0],
        apellido: name[1], 
        email: email,
        bio: bio,
        usuario: usuario,
        "edad": edad,
        "cumpleanios" : birthday,
        "rutaFotoPerfil": perfil,
        "rutaFotoPortada": "https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png",
        genero: genero,
        "presupuesto": presupuesto,
        "disponibilidadDeTiempo": availability
     }),
        headers:{
          "Authorization":  `Bearer ${usuario_token}`,
          'Content-Type': 'application/json'
        }

      })
      result = await result.json()
      SetnewUsuario(result);
      console.log(result)
      localStorage.setItem("new_usuario", JSON.stringify(result))
      // localStorage.setItem("idUser", result.id)
      // console.log(result.id)
      


    }
    navigate("/profile/"+ newUsuario.id);

    }
    
    

    return(
      
        <Container>
            <Card style = {{backgroundColor: '#FEF7F8', position: 'center', top: '30%', left: '5%' }} >
                <Card.Body>
                
                <Card className = "col-md-4" style= {{width: "50%"}}>
                <Row className='no-gutters'>
                    <Col>
                        
                        <Card.Img  src = {props.rutaFotoPerfil} fluid style={{width: '250px'}}></Card.Img>
                              
                    </Col>
                    <Col>
                    <Card.Text style = {{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '40px', textAlign: ''}}>{props.nombre} </Card.Text>
                    <Card.Text style = {{fontFamily: "Work Sans, sans-serif", fontStyle: 'normal',fontSize: '30px', textAlign: ''}}> {props.usuario}</Card.Text>
                   
                    <Popup trigger={<Button variant="default"  style={{ color: "black", background:'#00B8A9', width: '250px', height: '40px', fontSize: '20px' }} > <FaCamera/> <FormattedMessage id="ChangePhoto"/></Button>} 
                    position="right center" style={{  width: '100%', height: '40px', fontSize: '20px' }}>
                      <Form>
                        <FormGroup>
                          <Form.Label> <FormattedMessage id="lableFoto"/> </Form.Label>
                          <Form.Control type="text" placeholder= {props.perfil} value = {perfil} onChange={(e) => setPerfil(e.target.value)} />
                        </FormGroup>
                      </Form>
                    </Popup>
                    <Button variant="default"  style={{ color: "black", background:'#F28F8F', width: '250px', height: '40px', fontSize: '20px' }} onClick ={refreshPage}  >  Actualizar datos </Button>
                    </Col>
                </Row>
                </Card>
                <h1 className="p-4"><FormattedMessage id="EditProfile"/></h1>

                
                <Form>
                    <Row>

                    <Col>
                    <Form.Group className="p-3" controlId="nameSignUp">
                    <Form.Label> <FormattedMessage id="Fullname"/> </Form.Label>
                    <Form.Control type="text" placeholder= {props.nombre} value = {nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group className="p-3" controlId="emailSignUp">
                        <Form.Label> <FormattedMessage id="email"/></Form.Label>
                        <Form.Control type="email" placeholder= {props.email} value = {email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    </Col>
                    
                    </Row>

                    <Row>

                    <Col>
                    <Form.Group className="p-3" controlId="userProfile">
                    <Form.Label> <FormattedMessage id="username"/> </Form.Label>
                    <Form.Control type="text"  placeholder= {props.usuario} value = {usuario} onChange={(e) => setUsuario(e.target.value)}/>
                    </Form.Group>
                    </Col>

                    <Col>

                    <Form.Group className="p-3" controlId="dateBirthSignUp">
                    <Form.Label className = "fw-bold mr-4"><FormattedMessage id="dateOfBirth"/></Form.Label>
                    <Form.Control type="date" name='dateBirth'  placeholder= {props.cumpleanios} value = {date} onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>
                    </Col>
                    </Row>

                    <Row>


                    <Col>
                    <Form.Group className="p-3" controlId="emailSignUp">
                        <Form.Label> <FormattedMessage id="bio"/></Form.Label>
                        <Form.Control type="email" placeholder= {props.bio} value = {bio} onChange={(e) => setBio(e.target.value)}/>
                    </Form.Group>
                    </Col>

                    <Col className="mb-5">
                    <Form.Group controlId="genderSignUp" placeholder= {props.genero} value = {genero} onChange={(e) => setGenero(e.target.value)}>
                    <Form.Label className = "fw-bold mr-4"><FormattedMessage id="gender"/></Form.Label>
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
                    </Col>
                    </Row>

                    <Row>

                    <Col>
                    <Form.Group className="p-3" controlId="budgetSignUp">
                    <Form.Label> <FormattedMessage id="budget"/></Form.Label>
                    <Form.Control type="number" placeholder= {props.presupuesto} value = {budget} onChange={(e) => setBudget(e.target.value)} />
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group className="p-3" controlId="availabilityProfile">
                        <Form.Label> <FormattedMessage id="availability"/></Form.Label>
                        <Form.Control type="text" placeholder= {props.disponibilidadDeTiempo} value = {availability} onChange={(e) => setAvailability(e.target.value)} />
                    </Form.Group>
                    </Col>

                    </Row>
                    <Button onClick = {editprofile} variant="default" className = 'mt-4' style={{ color: "white", background:'#F28F8F', width: '150px', height: '40px' }} >
                    <FormattedMessage id="save"/>
                    </Button>







                </Form>
                
                




                </Card.Body>
            </Card>


        </Container>
        






    );

}