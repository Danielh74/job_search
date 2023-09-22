import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { LoginContext } from "../contexts/LoginContext";
import { Alert, Button, Card, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";

function Profile() {

    const { loggedInUser, changeLoggedInUser, users, setUsers } = useContext(LoginContext);
    const { pageTheme, cardTheme } = useContext(ThemeContext);
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const [message, setMessage] = useState("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");
    const [msgColor, setMsgColor] = useState("warning");
    const [loading, setLoading] = useState(false);
    const [myUser, setMyUser] = useState({});
    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showPassword, setShowPassword] = useState("password");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        if (users) {
            setMyUser(users.find((u) => u.Email === loggedInUser.Email));
        }
        setMessage(
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
        );
        setMsgColor("warning");
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMyUser((prevState) => ({
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
                `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/user/${projectID}/${myUser.Email}`,
                myUser,
                config
            );
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.Email === myUser.Email ? myUser : user));
            changeLoggedInUser(myUser);
            setMessage("Changes saved successfully!");
            setMsgColor("success");
        } catch (error) {
            console.error(error);
            setMessage("Couldnt save changes");
            setMsgColor("danger");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
            setMyUser((prevState) => ({
                ...prevState,
                Password: newPassword
            }));
            saveChanges();
        }
    };

    return (
        <>
            <div className={`d-flex justify-content-center pt-4 container-fluid pb-5 ${pageTheme}`}>
                <Card className={`shadow ${cardTheme}`} style={{ width: "40rem", height: "31rem" }}>
                    <Card.Body>
                        <Card.Title className="text-center">My Profile:</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mt-4" controlId="name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Name"
                                    value={myUser.Name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="email" className="mt-4">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="Email"
                                    value={myUser.Email}
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
                                    <Form.Label>Role:</Form.Label>
                                    <Form.Select disabled={myUser.Role === "Admin" ? true : false} name="Role" value={myUser.Role} onChange={handleInputChange}>
                                        {users && users.find((user) => user.Role === "Admin") ?
                                            <>
                                                <option value="User">User</option>
                                                <option value="Business">Business</option>
                                                <option value="Guest">Guest</option>
                                            </>
                                            :
                                            <>
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                                <option value="Business">Business</option>
                                                <option value="Guest">Guest</option>
                                            </>
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <Button variant="primary" type="submit" className="mt-4 w-100">
                                Save changes
                            </Button>
                            {loading ?
                                <Container className="d-flex justify-content-center mt-5">
                                    <Spinner animation="border" variant="primary" />
                                </Container>
                                : <></>}
                        </Form>
                        {message && <Alert className={`mt-4 text-${msgColor} text-center`} variant={msgColor}>{message}</Alert>}
                    </Card.Body>
                </Card>
            </div >
        </>);
}

export default Profile