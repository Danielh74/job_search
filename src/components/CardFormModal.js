import axios from "axios";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { ListContext } from "../contexts/ListContext";
import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function CardFormModal({ show, role, handleClose, job }) {

    const { items, setList, addItems, jobCategories } = useContext(ListContext);
    const { cardTheme } = useContext(ThemeContext);
    const [bearerToken, setBearerToken] = useState(localStorage.getItem("userToken"));
    const projectID = "a3dea4e1-45c5-41da-9a30-3351a1116941";
    const [showModal, setShowModal] = useState(show);
    const [modalRole, setModalRole] = useState(role);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newJob, setNewJob] = useState(job);
    const [loading, setLoading] = useState(false);
    const [titleBorder, setTitleBorder] = useState("");
    const [categoryBorder, setCategoryBorder] = useState("false");

    const handleChange = (e) => {
        setNewJob((prev) => (
            { ...newJob, Data: { ...prev.Data, [e.target.name]: e.target.value } }));
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        if (selectedCategory !== "new") {
            setNewJob((prev) => (
                { ...newJob, Data: { ...prev.Data, [e.target.name]: e.target.value } }));
        }
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory((e.target.value).toUpperCase())
        setNewJob((prev) => (
            { ...newJob, Data: { ...prev.Data, [e.target.name]: (e.target.value).toUpperCase() } }));
    };

    const handleSave = async (item) => {
        if (item.Data.title === "") {
            setTitleBorder("border-danger")
        } else if (selectedCategory === "new" && newCategory === "") {
            setCategoryBorder("border-danger")
        } else {
            const config = bearerToken
                ? { headers: { Authorization: `Bearer ${bearerToken}` } }
                : {};
            setLoading(true);
            if (modalRole === "Edit") {
                try {
                    const response = await axios.put(
                        `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}/${item.ItemID}`,
                        item,
                        config
                    );

                    let updatedList = items.map((i) => i.ItemID === item.ItemID ? item : i)
                    setList(updatedList, "items");
                } catch (error) {
                    console.error(error);
                }
            } else if (modalRole === "Add") {
                addItems(item, "all");
            }
            setLoading(false);
            handleClose();
        }
    };

    const handleDelete = async (item) => {
        const config = bearerToken
            ? { headers: { Authorization: `Bearer ${bearerToken}` } }
            : {};
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/${projectID}/${item.ItemID}`,
                config
            );
            setList(items.filter((u) => u.ItemID !== item.ItemID), "items");
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose} >
            <Container className={`${cardTheme}`}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalRole} Card:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalRole === "Delete" ? <> Are you sure you want to delete?</> :
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    className={`${titleBorder}`}
                                    type="text"
                                    name="title"
                                    value={newJob.Data.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div className="row">
                                <Form.Group className={`mb-3 ${selectedCategory === "new" ? "col-6" : ""}`}>
                                    <Form.Label >Category:</Form.Label>
                                    <Form.Select name="category" value={newJob.Data.category} onChange={handleCategoryChange}>
                                        <option disabled value="" className=" text-secondary">--Select a category--</option>
                                        {jobCategories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                        <option value="new">New Category</option>
                                    </Form.Select>
                                </Form.Group>
                                {selectedCategory === "new" && (
                                    <Form.Group className="col-6">
                                        <Form.Label>New Category</Form.Label>
                                        <Form.Control
                                            className={`${categoryBorder}`}
                                            type="text"
                                            name="category"
                                            value={newCategory}
                                            onChange={handleNewCategoryChange}
                                        />
                                    </Form.Group>)}
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Job description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={newJob.Data.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Info</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="info"
                                    value={newJob.Data.info}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={newJob.Data.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div className="row">
                                <Form.Group className="col-6">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={newJob.Data.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="col-6">
                                    <Form.Label>Location:</Form.Label>
                                    <Form.Select name="location" value={newJob.Data.location} onChange={handleChange}>
                                        <option selected>--Select a location--</option>
                                        <option value="North District">North District</option>
                                        <option value="Center District">Center District</option>
                                        <option value="South District">South District</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Form>}
                </Modal.Body>
                <Modal.Footer className="row">
                    <Button className="me-auto col-auto" variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {loading ? <Container className="col text-center">
                        <Spinner animation="border" variant="primary" />
                    </Container> : <></>}
                    {modalRole === "Delete" ? <Button className="col-auto" variant="danger" onClick={() => { handleDelete(newJob); handleClose(); }}>
                        Delete
                    </Button> :
                        <Button className="col-auto" variant="primary" onClick={() => handleSave(newJob)}>
                            Save Changes
                        </Button>}
                </Modal.Footer>
            </Container>
        </Modal>);
}

export default CardFormModal;