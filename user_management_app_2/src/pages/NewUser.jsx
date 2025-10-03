/**Created by Parta Cana */

//Importing from react and react-router-dom
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addUser } from '../slices/fetchUsersSlice';

//Importing from react-bootstrap for styling the form of the new user
import { Container, Form, Row, Col,Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError] = useState(null);

  const [newUserData, setNewUserData] = useState({
    name:"",
    username:"",
    email:"",
    address:{
      street:"",
      suite:"",
      city:"",
      zipcode:"",
      geo:{
        lat:"",
        lng:"",
      },
    },
    phone:"",
    website:"",
    company:{
      name:"",
      catchPhrase:"",
      bs:"",
    },
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    let newUserDataCopy = {...newUserData};

    //This is for not nested fields in JSON
    if(["name","username","email","phone","website"].includes(name)){
      newUserDataCopy[name] = value;
    } 
    //This is for the nested address fields in JSON
    else if(name.startsWith("address.")){

      const field = name.split(".")[1];
      if(["street","suite","city","zipcode"].includes(field)){
        newUserDataCopy.address = {
          ...newUserDataCopy.address,
          [field]: value,
        };
       } else if(field === "geo"){
          const geoField = name.split(".")[2];
          newUserDataCopy.address.geo = {
            ...newUserDataCopy.address.geo,
            [geoField]: value,
          };
       }
  }
  //This is for the nested company fields in JSON
  else if(name.startsWith("company.")){
      const field = name.split(".")[1];
      newUserDataCopy.company = {
        ...newUserDataCopy.company,
        [field]: value,
      };
  }

  setNewUserData( newUserDataCopy );
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if(!newUserData.name || 
      !newUserData.username || 
      !newUserData.email || 
      !newUserData.phone || 
      !newUserData.website ||
      !newUserData.address.street ||
      !newUserData.address.suite ||
      !newUserData.address.city ||
      !newUserData.address.zipcode ||
      !newUserData.address.geo.lat ||
      !newUserData.address.geo.lng ||
      !newUserData.company.name ||
      !newUserData.company.catchPhrase ||
      !newUserData.company.bs){
        setError("Please fill in all the information!");
        return;
      }

    dispatch(addUser(newUserData));  
    console.log("New User Data:", newUserData);
    
    navigate("/");
  } 

  return (
    <Container className="mt-6">
      <h1>Add a new user</h1>
      <h3>Don't forget to fill up all the information!</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" 
            name="name"
            value={newUserData.name}
            onChange={handleChange}
            placeholder="Name" required />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username"
            onChange={handleChange}
             name="username" value={newUserData.username}
             required/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
              name="email" onChange={handleChange} value={newUserData.email} 
            placeholder="Email" required/>
          </Form.Group>
        </Row>
        <h3>The Address Information</h3>
        <Row>
          <Form.Group>
            <Form.Label>Street</Form.Label>
            <Form.Control type="text" 
            name="address.street" value={newUserData.address.street}
            onChange={handleChange}
            placeholder="Street" required/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Suite</Form.Label>
            <Form.Control type="text"
             name="address.suite" value={newUserData.address.suite}
             onChange={handleChange}
             placeholder="Suite" required/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" 
            name="address.city"
            onChange={handleChange}
             value={newUserData.address.city}
            placeholder="City" required/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Zipcode</Form.Label>
            <Form.Control type="text" 
            onChange={handleChange}
            name="address.zipcode" value={newUserData.address.zipcode}
            placeholder="Zipcode" required/>
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>lat</Form.Label>
              <Form.Control type="number" onChange={handleChange}
              name="address.geo.lat" value={newUserData.address.geo.lat}
              placeholder="lat" required/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>lng</Form.Label>
              <Form.Control type="number" onChange={handleChange}
              name="address.geo.lng" value={newUserData.address.geo.lng}
              placeholder="lng" required/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" 
            name="phone" value={newUserData.phone} onChange={handleChange}
            placeholder="Phone" required/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" 
            name="website" value={newUserData.website} onChange={handleChange}
            placeholder="Website" required/>
          </Form.Group>
        </Row>
        
        <h3>The Company Information</h3>
        <Row>
          <Form.Group>
            <Form.Label>Company's Name</Form.Label>
            <Form.Control type="text" 
            name="company.name" value={newUserData.company.name} onChange={handleChange}
            placeholder="Name of the company" required/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Company's CatchPhrase</Form.Label>
            <Form.Control type="text" 
            name="company.catchPhrase" value={newUserData.company.catchPhrase} onChange={handleChange}
            placeholder="Catchphrase of the company" required/>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Company's bs</Form.Label>
            <Form.Control type="text" 
            name="company.bs" value={newUserData.company.bs} onChange={handleChange}
            placeholder="Bs of the company" required/>
          </Form.Group>
        </Row>
        {/*the buttons*/}
        <Row>
          <Col><Button variant="info" type="submit" 
          className="mt-3">Add User</Button></Col>
          <Col><Button variant="danger" onClick={() => navigate(-1)}
          className="mt-3">Cancel</Button></Col>
        </Row>
      </Form>
    </Container>
  )
}

export default NewUser