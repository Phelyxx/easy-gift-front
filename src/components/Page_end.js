import React from 'react';
import './Page_end.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import end_logo from '../assets/end_logo.png';
import { Container } from 'react-bootstrap';
import social_email from '../assets/social_email.png';
import social_instagram from '../assets/social_instagram.png';
import social_telefono from '../assets/social_telefono.png';
import social_twitter from '../assets/social_twitter.png';
import { FormattedMessage } from 'react-intl';

function Page_end() {
    return (
        <div className="Page_end">
            <header className="End-header" xxl={10}>
            <Container className='End-container'>
                    <Row className="End_top_row"  style={{columnGap:"5%"}} >
                        <Col className='End_col_container' style={{paddingLeft:"15%"}}>
                            <Container>
                                <Col>
                                    <Row>
                                        EasyGift
                                    </Row>
                                    
                                    <a href='/' style={{textDecoration:"None"}}>
                                    <Row className='End_top_text'>
                                    <FormattedMessage id='FooterCol0_1'/>
                                    </Row></a>
                                    
                                    <a href='/' style={{textDecoration:"None"}}>
                                    <Row className='End_top_text'>
                                    <FormattedMessage id='FooterCol0_2'/>
                                    </Row></a>
                                    
                                    <a href='/' style={{textDecoration:"None"}}>
                                    <Row className='End_top_text'>
                                    <FormattedMessage id='FooterCol0_3'/>
                                    </Row></a>
                                    
                                </Col>
                            </Container>
                        </Col>
                        <Col className='End_col_container'>
                            <Container >
                                <Col>
                                    <Row>
                                    <FormattedMessage id='FooterCol1_0'/>
                                    </Row>
                                    <a href='/' style={{textDecoration:"None"}}>
                                    <Row className='End_top_text'>
                                    <FormattedMessage id='FooterCol1_1'/>
                                    </Row></a>

                                    <a href='/' style={{textDecoration:"None"}}>
                                    <Row className='End_top_text'>
                                    <FormattedMessage id='FooterCol1_2'/>
                                    </Row></a>
                                    
                                    <a href='/' style={{textDecoration:"None"}}>
                                    <Row className='End_top_text'>
                                    <FormattedMessage id='FooterCol1_3'/>
                                    </Row></a>
                                    
                                </Col>
                            </Container>
                        </Col>
                        <Col className='End_col_container'>
                            <Col>
                                <Row>
                                <FormattedMessage id='FooterCol2_0'/>
                                </Row>
                                <Row >
                                <div className='End_social_img_container'>
                                        <Container>
                                            <Row className='g-1'>
                                                <Col>
                                                    <a href="home">
                                                        <img src={social_telefono} className="End_social_img" alt="social_telefono" />
                                                    </a>
                                                </Col>
                                                <Col>
                                                    <a href="home">
                                                        <img src={social_email} className="End_social_img" alt="social_email" />
                                                    </a>
                                                </Col>
                                                <Col>
                                                    <a href="https://www.instagram.com/">
                                                        <img src={social_instagram} className="End_social_img" alt="social_instagram" />
                                                    </a>
                                                </Col>
                                                <Col>
                                                    <a href="home">
                                                        <img src={social_twitter} className="End_social_img" alt="social_twitter" />
                                                    </a>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Row>
                            </Col>
                        </Col>
                        <Col sm={5} md={5} lg={5}>
                        </Col>
                    </Row>


                    <Row className='End_bottom_row'>
                        <Col sm={2} md={2} lg={2} className="End_logo_container">
                            <img src={end_logo} className="End-logo" alt="logo" />
                        </Col>
                        <Col sm={10} md={10} lg={10} style={{ verticalAlign: "Middle" }} >
                            <div className="End_copyright_container">
                            <FormattedMessage id='FooterEnd_0'/>
                            </div>
                        </Col >
                    </Row>
            </Container>
            </header>
        </div>
    );
}

export default Page_end;
