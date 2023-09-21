import { useContext, useEffect, useState } from "react";
import { ListContext } from "../contexts/ListContext";
import axios from "axios";
import '../css/cardCSS.css';
import Cards from "../components/Cards";
import { ThemeContext } from "../contexts/ThemeContext";
import { Container, Spinner } from "react-bootstrap";

function Home() {

    const { chosenCategory, isPressed, setList, listTitle } = useContext(ListContext);
    const { pageTheme } = useContext(ThemeContext);
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const [bearerToken, setBearerToken] = useState(localStorage.getItem("userToken"));
    const [loading, setLoading] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        const config = bearerToken
            ? { headers: { Authorization: `Bearer ${bearerToken}` } }
            : {};
        try {
            let response = await axios.get(
                `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}`,
                config
            );
            setList(response.data, "items");
            setLoading(false);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    if (loading) {
        return <div className={`full-container ${pageTheme} `}>
            <Container className={`d-flex justify-content-center pt-4`}>
                <Spinner animation="border" variant="primary" />
            </Container>
        </div>;
    }

    return (
        <div className={`container-fluid ${pageTheme}`}>
            {!isPressed ?
                <>
                    <h1 className="p-3 text-center fw-light"><b>Unlock Your Future:</b> Find Your Dream Job With Us</h1>
                    <h1 className=" ms-3 fw-light">{listTitle}:</h1>
                    <div className="mt-5">
                        <div className="row mx-2">
                            {chosenCategory.map((jobCategory) => (
                                <Cards key={jobCategory} category={jobCategory} />
                            ))} </div>
                    </div>
                </> : <Cards />
            }
        </div>
    );
}

export default Home;