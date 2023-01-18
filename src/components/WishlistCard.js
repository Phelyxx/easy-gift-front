import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function WishlistCard(props) {
    return(<Row xs={1} md={1} lg={3} className="g-4">
        {Array.from({ length: parseInt(props.amountWishlists) }).map((_, idx) => (
            <Col>
                <Card className="text-white">
                    <Card.Img src={"/images/wishlist-" + idx + ".avif"} alt="TODO: Card image" 
                        style={{filter: "brightness(70%)", width: "100%", height: "15vw", objectFit: "cover"}} />
                    <Card.ImgOverlay>
                        <Card.Title style={{textAlign: "center"}}><b>{"Wishlist " + idx}</b></Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </Col>
        ))}
    </Row>);
}

export default WishlistCard;