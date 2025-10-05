/**Created by Parta Cana */
import { Card } from "react-bootstrap";

function UserDetails() {
  return (
    <>
      <Card bg="info" text="black" style={{ width: '28rem' }}>
        <Card.Header>Featured</Card.Header>
        <Card.Body> 
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default UserDetails