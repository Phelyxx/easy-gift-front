import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";



function resena(prop){
    return(<Row xs={1} md={1} lg={3} className="g-4">
        <Card>
        <Card.Header style={{backgroundColor: "#00B8A9"}}>{prop.resenausuario}</Card.Header>
        <Card.Body>
            <Card.Title>  style={{color: "#00B8A9"}} {prop.resenatitle}</Card.Title>
            <Card.Text>
                {prop.resenaComentario}
            </Card.Text>
            {prop.resenaPuntuacion}/10
        </Card.Body>
        </Card>
    </Row>);
}

export default resena;