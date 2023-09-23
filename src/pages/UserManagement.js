import { Alert, Button, Container, Form, InputGroup, Modal, Spinner, Table } from "react-bootstrap";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";

function UserManagement() {

    const { users, setUsers, loggedInUser } = useContext(LoginContext);
    const { pageTheme, cardTheme } = useContext(ThemeContext);
    const nav = useNavigate();
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const [bearerToken, setBearerToken] = useState(localStorage.getItem("userToken"));
    const [selectedUser, setSelectedUser] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [msgColor, setMsgColor] = useState("warning");
    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showPassword, setShowPassword] = useState("password");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleEdit = (user) => {
        setShowModal(true);
        setIsEdit(true);
        setSelectedUser(user);
        setMessage("");
        setNewPassword("");
        setVerifyPassword("");
    };

    const handleDelete = async (user) => {
        const config = bearerToken
            ? { headers: { Authorization: `Bearer ${bearerToken}` } }
            : {};
        try {
            const response = await axios.delete(
                `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/user/object/${projectID}/${user.Email}`,
                config
            );
            setUsers(users.filter((u) => u.Email !== user.Email));
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const saveChanges = async () => {
        setLoading(true);
        const config = localStorage.getItem("userToken")
            ? { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
            : {};
        try {
            const response = await axios.put(
                `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/user/${projectID}/${selectedUser.Email}`,
                selectedUser,
                config
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.Email === selectedUser.Email ? selectedUser : user));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const handleSubmit = () => {
        if (newPassword === "" && verifyPassword === "") {
            saveChanges();
        } else if (newPassword !== verifyPassword) {
            setMessage("The verified password is incorrect");
            setMsgColor("warning");
        } else if (!passwordRegex.test(newPassword)) {
            setMessage(
                "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
            );
            setMsgColor("danger");
        } else {
            setSelectedUser((prevState) => ({
                ...prevState,
                Password: newPassword
            }));
            saveChanges();
        }
    };

    return (
        <div className={`full-container ${pageTheme}`}>
            {loggedInUser.Role === "Admin" ? <><h1 className="p-3">Users Management:</h1>
                {users && <Table className={`${cardTheme}`} striped bordered hover>
                    <thead className={`${cardTheme} text-center`}>
                        <tr>
                            <th className={`${cardTheme}`}>Name</th>
                            <th className={`${cardTheme}`}>Email</th>
                            <th className={`${cardTheme}`}>Password</th>
                            <th className={`${cardTheme}`}>Role</th>
                            <th className={`${cardTheme}`}>Action</th>
                        </tr>
                    </thead>
                    <tbody className={`${cardTheme}`}>
                        {users.map((user) => (
                            <tr key={user.Email}>
                                <td className={`${cardTheme}`}>{user.Name}</td>
                                <td className={`${cardTheme}`}>{user.Email}</td>
                                <td className={`${cardTheme}`}>{user.Password}</td>
                                <td className={`${cardTheme}`}>{user.Role}</td>
                                <td className={`${cardTheme}`}>
                                    {user.Role === "Admin" ? <>  <Button variant='warning' onClick={() => handleEdit(user)} >Edit</Button>
                                        <Button disabled className="ms-1" variant='secondary' onClick={() => { setShowModal(true); setSelectedUser(user); setIsEdit(false); }} >Delete</Button></> : <>
                                        <Button variant='warning' onClick={() => handleEdit(user)} >Edit</Button>
                                        <Button className="ms-1" variant='danger' onClick={() => { setShowModal(true); setSelectedUser(user); setIsEdit(false); }} >Delete</Button>
                                    </>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>}</> : nav('/home')}

            <Modal show={showModal} onHide={() => { setShowModal(false); setIsEdit(false); }} >
                <Container className={`${cardTheme}`}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEdit ? "Edit" : "Delete"} User:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!isEdit ? <> Are you sure you want to delete?</> :
                            <Form>
                                <Form.Group className="mt-4" controlId="name">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        value={selectedUser.Name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="email" className="mt-4">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="Email"
                                        value={selectedUser.Email}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </Form.Group>
                                <div className="row">
                                    <Form.Group controlId="changePassword" className="mt-4 col-6">
                                        <Form.Label>Change password:</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword}
                                                placeholder="New password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <Button
                                                variant="light"
                                                className="border-top border-bottom border-end"
                                                onClick={() => setShowPassword((prev) => (prev === "text" ? "password" : "text"))}>
                                                {showPassword === "password" ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="verifyPassword" className="mt-4 col-6 ">
                                        <Form.Label>Verify password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Verify password"
                                            value={verifyPassword}
                                            onChange={(e) => setVerifyPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="row">
                                    <Form.Group controlId="role" className="mt-4 offset-3 col-6">
                                        {!(selectedUser.Role === "Admin") ? <>
                                            <Form.Label>Role:</Form.Label>
                                            <Form.Select name="Role" value={selectedUser.Role} onChange={handleInputChange}>
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                                <option value="Business">Business</option>
                                                <option value="Guest">Guest</option>
                                            </Form.Select></> : <></>}
                                    </Form.Group>
                                </div>
                                {loading &&
                                    <Container className="d-flex justify-content-center mt-5">
                                        <Spinner animation="border" variant="primary" />
                                    </Container>
                                }
                                {message && <Alert className={`mt-4 text-${msgColor} text-center`} variant={msgColor}>{message}</Alert>}
                            </Form>}
                    </Modal.Body>
                    <Modal.Footer className="">
                        <Button className=" me-auto" variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        {!isEdit ?
                            <Button variant="danger" onClick={() => { handleDelete(selectedUser); setShowModal(false); }}>
                                Delete
                            </Button> :
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Save Changes
                            </Button>}
                    </Modal.Footer>
                </Container>
            </Modal>
        </div>);
}
export default UserManagement;