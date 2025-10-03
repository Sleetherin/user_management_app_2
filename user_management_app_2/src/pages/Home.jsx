/**Created by Parta Cana */
import { useNavigate } from "react-router-dom";
import {Table, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'



function Home(props) {

  const navigate = useNavigate();

  const users = props.users;
  const loading = props.loading;
  const error = props.error;

  const handleAddUser = () => {
    navigate("/newuser");
  }
    
  return (
    <div>
        {/*Add a new User button*/}
        <>
          <Button variant="success" onClick={handleAddUser}>Add a new User</Button>
        </>

        {/*Table of all the users displaying only name,email and company's name*/}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&  users.length === 0 && <p>No users found.</p>}
        {!loading &&  users.length > 0 && (
        <Table responsive bordered striped variant="dark" >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company?.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>)}
    </div>
  )
}

export default Home