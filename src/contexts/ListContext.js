import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";
import { Alert } from "react-bootstrap";

export const ListContext = createContext();

export function ListProvider({ children }) {
    const { loggedInUser } = useContext(LoginContext);
    const [items, setItems] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const [favList, setFavList] = useState([]);
    const [appliedList, setAppliedList] = useState([]);
    const [bearerToken, setBearerToken] = useState(localStorage.getItem("userToken"));
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const [chosenCategory, setChosenCategory] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [filterValue, setFilterValue] = useState("");
    const [jobCategories, setJobCategories] = useState([]);
    const [listTitle, setListTitle] = useState("All");
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const fetchItems = async () => {
        const config = bearerToken
            ? { headers: { Authorization: `Bearer ${bearerToken}` } }
            : {};
        try {
            const response = await axios.get(
                `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}`,
                config
            );
            setItems(response.data);
            setJobCategories([...new Set(response.data.map((item) => (item.Data.category)))]);
            setChosenCategory([...new Set(response.data.map((item) => (item.Data.category)))]);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const filteredItems = items.filter((item) =>
        item.Data.title.toLowerCase().includes(filterValue.toLowerCase())
    );

    const pressed = (selectedItem) => {
        setIsPressed((prev) => prev ? false : true);
        setSelectedItem(selectedItem);
    };

    const setList = (data, to) => {
        switch (to) {
            case "items":
                setItems(data);
                break;
            case "favorites":
                setFavList(data);
                break;
            case "applications":
                setAppliedList(data);
                break;
            default:
                setItems(items);
                setFavList(favList);
                setAppliedList(appliedList);
        }

    };

    const openAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };

    const addItems = async (itemToAdd, chosenCategory) => {
        const config = bearerToken
            ? { headers: { Authorization: `Bearer ${bearerToken}` } }
            : {};

        if (chosenCategory === "all") {
            try {
                const response = await axios.post(
                    `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}`,
                    itemToAdd,
                    config
                );
                setItems([...items, itemToAdd]);
                setAlertText("New job created!");
                openAlert();
            } catch (error) {
                console.error("Error adding items:", error);
            }
        } else {
            if (chosenCategory === "favorites") {
                itemToAdd.Data.whoLiked = [...itemToAdd.Data.whoLiked, loggedInUser];
                setAlertText("Job added to your favorites!");
            } else if (chosenCategory === "applications") {
                itemToAdd.Data.whoApplied = [...itemToAdd.Data.whoApplied, loggedInUser];
                setAlertText("You have successfully applied to the job!");
            }
            try {
                const response = await axios.put(
                    `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}/${itemToAdd.ItemID}`,
                    itemToAdd,
                    config
                );
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.ItemID === itemToAdd.ItemID ? itemToAdd : item
                    )
                );
                openAlert();

            } catch (error) {
                console.error("Error adding items:", error);
            }
        }
    };

    const removeFromList = async (item, category) => {
        const newItem = item;
        if (category === "favorites") {
            let index = item.Data.whoLiked.findIndex((liked) => liked.Email === loggedInUser.Email);
            newItem.Data.whoLiked.splice(index, 1);
        } else if (category === "applications") {
            let index = item.Data.whoApplied.findIndex((liked) => liked.Email === loggedInUser.Email);
            newItem.Data.whoApplied.splice(index, 1);
        }
        const config = bearerToken
            ? { headers: { Authorization: `Bearer ${bearerToken}` } }
            : {};
        try {
            let response = await axios.put(
                `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}/${item.ItemID}`,
                newItem,
                config
            );
            const index = items.findIndex(i => i.ItemID === newItem.ItemID);
            let tempItems = [...items];
            tempItems[index] = newItem;
            setList(tempItems, "items");
        }
        catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const isLiked = (item) => {
        let userLiked = item.Data.whoLiked.find((liked) => liked.Email === loggedInUser.Email);
        if (userLiked) {
            return (
                <button className="btn col-2 fs-4 p-0 ms-auto" onClick={() => removeFromList(item, "favorites")}  >
                    <i className="bi bi-heart-fill text-danger"></i>
                </button>);
        }
        return (
            <button className="btn col-2 fs-4 p-0 ms-auto" onClick={() => addItems(item, "favorites")} >
                <i className="bi bi-heart-fill text-secondary"></i>
            </button>);
    };

    const isApplied = (item) => {
        let userApplied = item.Data.whoApplied.find((applied) => applied.Email === loggedInUser.Email);
        if (userApplied) {
            return (
                <button className="btn btn-dark col-3 offset-2 rounded-5" onClick={() => removeFromList(selectedItem, "applications")} >Cancel application</button>);
        }
        return (
            <button className="btn btn-success col-3 offset-2 rounded-5" onClick={() => addItems(selectedItem, "applications")} >Apply</button>);
    };

    return (
        <>
            <Alert show={showAlert} style={{ width: "max-content", position: "fixed", zIndex: 1010, top: 60, right: 0, left: 0 }} variant="success" onClose={() => setShowAlert(false)} dismissible>
                <p>
                    {alertText}
                </p>
            </Alert >

            <ListContext.Provider value={{ items, jobCategories, filteredItems, chosenCategory, setChosenCategory, favList, pressed, isPressed, setIsPressed, setList, removeFromList, addItems, selectedItem, appliedList, isLiked, isApplied, setFilterValue, listTitle, setListTitle }}>{children}</ListContext.Provider>
        </>);
}