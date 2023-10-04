import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Alert, Button, Card, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { ThemeContext } from "../contexts/ThemeContext";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const { pageTheme, cardTheme } = useContext(ThemeContext);
    const { setLoggedInUser, setUsers } = useContext(LoginContext);
    const [message, setMessage] = useState("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");
    const [msgColor, setMsgColor] = useState("warning");
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;
    const [verifyPassword, setVerifyPassword] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordRegex.test(formData.Password)) {
            setMessage(
                "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
            );
            setMsgColor("danger");
        } else if (formData.Password !== verifyPassword) {
            setMessage("The verified password is incorrect");
            setMsgColor("warning");
        } else {
            saveChanges();
        }

    };

    const saveChanges = async () => {
        setLoading(true);
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
    };

    return (

        <div className={`container-fluid d-flex justify-content-center pt-5 ${pageTheme}`}>
            <Card className={`shadow ${cardTheme} rounded-4`} style={{ width: "30rem", height: "39rem" }}>
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
                        <div className="row">
                            <Form.Group controlId="password" className="mt-4 col-6">
                                <Form.Label>Password:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword}
                                        name="Password"
                                        value={formData.Password}
                                        onChange={handleInputChange}
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
                                    value={verifyPassword}
                                    onChange={(e) => setVerifyPassword(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="role" className="mt-4 offset-3 col-6">
                            <Form.Label>Role:</Form.Label>
                            <Form.Select name="Role" value={formData.Role} onChange={handleInputChange}>
                                <option value="User">User</option>
                                <option value="Business">Business</option>
                                <option value="Guest">Guest</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Login
                        </Button>
                    </Form>
                    {message && <Alert className={`mt-4 text-${msgColor} text-center`} variant={msgColor}>{message}</Alert>}
                    {loading &&
                        <Container className="d-flex justify-content-center mt-5">
                            <Spinner animation="border" variant="primary" />
                        </Container>
                    }
                </Card.Body>
            </Card>
        </div>
    );
}
export default SignUp;