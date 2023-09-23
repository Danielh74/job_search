import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import jwtDecode from "jwt-decode";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { ThemeContext } from "../contexts/ThemeContext";

function Login() {
    const { setLoggedInUser, changeLoggedInUser } = useContext(LoginContext);
    const { pageTheme, cardTheme } = useContext(ThemeContext);
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const nav = useNavigate();
    const [loginInputs, setLoginInputs] = useState({
        Email: "",
        Password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoggedInUser("");
        localStorage.clear();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await axios.post(`https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/login/${projectID}`,
                loginInputs
            )
            let token = response.data.token
            localStorage.setItem("userToken", token);
            changeLoggedInUser(jwtDecode(token));
            nav('/home');

        } catch (error) {
            setErrorMsg('No user found.');
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={` d-flex justify-content-center pt-5 full-container ${pageTheme}`}>
            <Card className={`shadow ${cardTheme}`} style={{ width: "30rem", height: "22rem" }}>
                <Card.Body>
                    <Card.Title className="text-center">Login:</Card.Title>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-4">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="Email"
                                placeholder="example@example.com"
                                value={loginInputs.Email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="Password"
                                placeholder="Enter your password"
                                value={loginInputs.Password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-5 w-100">
                            Login
                        </Button>
                        {loading &&
                            <Container className="d-flex justify-content-center mt-5">
                                <Spinner animation="border" variant="primary" />
                            </Container>
                        }
                    </Form>
                    {errorMsg && <Alert className="mt-5 text-danger text-center" variant="danger">{errorMsg}</Alert>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login;