/**Created by Parta Cana */

//importing the state components from react-redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./slices/fetchUsersSlice";

//importing from react-bootstrap for styling and responsiveness of the app
import { Navbar, Form, Button, Row, Col,Container} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

//importing from react-router-dom for routing
import { BrowserRouter, Routes, Route} from "react-router-dom";

//importing pages and components
import './App.css'
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import UserDetails from "./pages/UserDetails";

function App() {
 
  const dispatch = useDispatch();
  const {users,loading,error} = useSelector((state) => state.users);

  console.log(users,loading,error);

  //fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
       {/*Navbar with search bar*/}
        <Navbar collapseOnSelect expand="lg" className="justify-content-between bg-dark" variant="dark">
          <Container className="bg-dark" variant="dark">
            <Row className="g-2">
                <Navbar.Brand href="#home" className="text-3xl font-bold bg-dark" variant="dark"> 
            User Management App
              </Navbar.Brand>
            </Row>
            <Row className="g-2">
              <Form className="d-flex flex-column flex-lg-row flex-sm-col gap-2 w-100">
                <Col sm={12} md={6} lg={8}>
                  <Form.Control
                  required
                  type="text"
                  placeholder="Name or Email"
                  className="mr-lg-2 "
                  />
                </Col>
                <Col sm={12} md={6} lg={4}>
                  <Button variant="info" type="submit">Search</Button>
                </Col>
              </Form>
            </Row>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home users={users} loading={loading} error={error} />} />
          <Route path="/newuser" element={<NewUser />}/>
          <Route path="/user" element={<UserDetails/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
