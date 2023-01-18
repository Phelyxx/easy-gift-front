import React from 'react';
import './Store.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { FormattedMessage  } from 'react-intl';



const { useEffect, useState } = require("react");

function Tiendas() {

    const [tiendas, setTiendas] = useState([]);
    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpZW5kYV9hZG1pbiIsInN1YiI6NjMsInJvbGVzIjpbInRpZW5kYV9hZG1pbiJdLCJpYXQiOjE2Njg3ODY1MDR9.USJP95B_oG3W3In9xlVEDlt-3ruW6Rmu3QQTrl-neYs"
        const fetchData = async () => {
            try {
                const URL =
                    "http://localhost:3000/api/v1/tiendas";
                const response = await fetch(
                    URL,
                    {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    }
                );
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }
                const data = await response.json();
                setTiendas(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        if (token) {
            fetchData();
        }
    }, []);

    console.log(tiendas);
    return (
        <div className="Tiendas">
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col xs={12} md={12} lg={12} className="body_container">

                        <Container>

                            <Row>

                                <Col className='filter_container' xs={3} md={3} lg={3}>
                                    <Container >
                                        <Col style={{ paddingLeft: "5%" }} >
                                            <Row style={{ paddingTop: "10%" }}>
                                                <b className="filter_text_color_cyan"><FormattedMessage id='SortBy'/></b>
                                                <Form className='form_sort'>
                                                    <Form.Check style={{ paddingTop: "5%" }}
                                                        type={'checkbox'}
                                                        id={"form-check"}
                                                        name='alpha_checkbox'
                                                        label={<FormattedMessage id='Alpha'/>}
                                                        bsPrefix="form-check"
                                                    >
                                                    </Form.Check>
                                                    <Form.Check
                                                        className='subform'
                                                        type={'radio'}
                                                        name='group1'
                                                        id={"form-radio"}
                                                        label={"A-Z"}
                                                        bsPrefix="form-radio"
                                                    >
                                                    </Form.Check>
                                                    <Form.Check
                                                        className='subform'
                                                        name='group1'
                                                        type={'radio'}
                                                        id={"form-check"}
                                                        label={"Z-A"}
                                                        bsPrefix="form-radio"
                                                    >
                                                    </Form.Check>
                                                    <Form.Check style={{ paddingTop: "15%" }}
                                                        type={'checkbox'}
                                                        id={"form-check"}
                                                        name='Close_checkbox'
                                                        label={<FormattedMessage id='Close2Location'/>}
                                                        bsPrefix="form-check"
                                                    >
                                                    </Form.Check>
                                                    <Form.Check
                                                        className='subform'
                                                        type={'radio'}
                                                        name='group2'
                                                        id={"form-radio"}
                                                        label={<FormattedMessage id='Close2Far'/>}
                                                        bsPrefix="form-radio"
                                                    >
                                                    </Form.Check>
                                                    <Form.Check
                                                        className='subform'
                                                        name='group2'
                                                        type={'radio'}
                                                        id={"form-radio"}
                                                        label={<FormattedMessage id='Far2Close'/>}
                                                        bsPrefix="form-radio"
                                                    >
                                                    </Form.Check>
                                                </Form>
                                            </Row>
                                            <Row>
                                                <b className="filter_text_color_cyan"><FormattedMessage id="Category"/></b>
                                                <Form className='form_categories'>
                                                {['Technology', 'Home', 'Fashion', 'VideoGames', 'Furniture', 'Kitchen', 'Food', 'Wines', 'Jewelry', 'Accessories'].map((name) => (
                                                        <div key={`check-box-${name}`} className="mb-3">
                                                            <Form.Check
                                                                type={'checkbox'}
                                                                id={"form-check"}
                                                                label={<FormattedMessage id={name}/>}
                                                                name={<FormattedMessage id={name}/>}
                                                                bsPrefix="form-check"
                                                            >
                                                            </Form.Check>
                                                        </div>
                                                    ))}
                                                </Form>
                                            </Row>
                                        </Col>
                                    </Container>
                                </Col>
                                <Col xs={9} md={9} lg={9} className='tiendas_container'>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <h1 className='text_color_cyan'><FormattedMessage id="SearchTienda"/>s</h1>
                                                </Row>
                                                <Row xs={1} md={1} lg={2} className="g-4" style={{ paddingTop: "5%" }}>
                                                    {tiendas.map(tienda => (
                                                        <Col key={tienda.id} className="cards_container_store">
                                                            <Card className="card_tienda">



                                                                <Link to={"/tiendas/" + tienda.id}>
                                                                    <Card.Img variant="top" src={tienda.imagen}
                                                                        className="card_img" style={{
                                                                            borderRadius:
                                                                                "2%", filter: "brightness(80%)"
                                                                        }} />

                                                                </Link>
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col>
                                                                            <Card.Title style={{ textAlign: "center" }}>
                                                                            <Link to={"/tiendas/" + tienda.id}><b className='cyan_format'> {tienda.nombre}</b></Link>
                                                                
                                                                            </Card.Title>
                                                                        </Col>
                                                                    </Row>
                                                                    <Card.Text style={{ textAlign: "center" }}>
                                                                        <div className='normal_format'> </div>
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Row>

                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col className='pagination_container'>
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination justify-content-center">
                                                        <li className="page-item"><a className="page-link" href="/">{<FormattedMessage id="SearchPrevious"/>}</a></li>
                                                        <li className="page-item"><a className="page-link" href="/">1</a></li>
                                                        <li className="page-item active" aria-current="page"><a className="page-link" href="/">2</a></li>
                                                        <li className="page-item"><a className="page-link" href="/">3</a></li>
                                                        <li className="page-item"><a className="page-link" href="/">{<FormattedMessage id="SearchNext"/>}</a></li>
                                                    </ul>
                                                </nav>
                                            </Col>
                                        </Row>

                                    </Container>

                                </Col>

                            </Row>

                        </Container>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default Tiendas;
