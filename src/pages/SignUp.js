import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Alert, Button, Card, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { ThemeContext } from "../contexts/ThemeContext";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const { pageTheme, cardTheme } = useContext(ThemeContext);
    const { setLoggedInUser } = useContext(LoginContext);
    const [message, setMessage] = useState("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");
    const [msgColor, setMsgColor] = useState("warning");
    const [users, setUsers] = useState([]);
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;
    const [showPassword, setShowPassword] = useState("password");
    const [formData, setFormData] = useState({
        Role: "",
        ID: "",
        ProjectID: projectID,
        Name: "",
        Email: "",
        Password: "",
        Favorites: {},
        Applied: {},
    });

    useEffect(() => {
        localStorage.clear();
        setLoggedInUser("");
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!passwordRegex.test(formData.Password)) {
            setMessage(
                "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
            );
            setMsgColor("danger");
        } else {
            // Add new user
            try {
                let response = await axios.post(`https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/user/`,
                    formData
                )
                setUsers((prevUsers) => [...prevUsers, formData]);
                setFormData({
                    Role: "",
                    ID: "",
                    ProjectID: projectID,
                    Name: "",
                    Email: "",
                    Password: "",
                    Favorites: {},
                    Applied: {},
                });
                nav('/login')
            }
            catch (error) {
                console.error("Error adding user:", error);
                setMsgColor("danger");
                setMessage("Wrong input");
            } finally {
                setLoading(false);
            }
        }
    };

    return (

        <div className={` d-flex justify-content-center pt-5 container-fluid ${pageTheme}`}>
            <Card className={`shadow ${cardTheme}`} style={{ width: "30rem", height: "34rem" }}>
                <Card.Body>
                    <Card.Title className="text-center">Sign up:</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-4" controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mt-4">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mt-4">
                            <Form.Label>Password:</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword}
                                    name="Password"
                                    value={formData.Password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Button
                                    variant="light"
                                    className="border-top border-bottom border-end"
                                    onClick={() => setShowPassword((prev) => (prev === "text" ? "password" : "text"))}>
                                    {showPassword === "password" ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Login
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
        </div>
    );
}
export default SignUp;