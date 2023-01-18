import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Gift from './Gift'

function Feed() {
  return (
    <Container>
      <Row>
      <Col xs={0} md={2} lg={3}/>
        <Col xs={12} md={8} lg={6}>
            <Gift/>
        </Col>
        <Col xs={0} md={2} lg={3}/>
      </Row>
    </Container>
  );
}

export default Feed;