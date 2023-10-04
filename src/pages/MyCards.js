import { useContext, useState } from "react";
import { ListContext } from "../contexts/ListContext";
import { LoginContext } from "../contexts/LoginContext";
import { ThemeContext } from "../contexts/ThemeContext";
import Cards from "../components/Cards";
import CardFormModal from "../components/CardFormModal";

function MyCards() {

    const { items, pressed, isLiked, isPressed } = useContext(ListContext);
    const { loggedInUser } = useContext(LoginContext);
    const { cardTheme, pageTheme } = useContext(ThemeContext);
    const [modalShow, setModalShow] = useState(false);
    const [modalRole, setModalRole] = useState("");
    const [newJob, setNewJob] = useState({
        Data: {
            title: "",
            description: "",
            info: "",
            category: "",
            img: `https://picsum.photos/id/${items.length}/200/200`,
            phone: "",
            email: "",
            location: "",
            whoLiked: [],
            whoApplied: [],
            creator: loggedInUser.Email
        }
    });

    const openModal = (role) => {
        setModalShow(true);
        setModalRole(role);
        setNewJob({
            Data: {
                title: "",
                description: "",
                info: "",
                category: "",
                img: `https://picsum.photos/id/${items.length}/200/200`,
                phone: "",
                email: "",
                location: "",
                whoLiked: [],
                whoApplied: [],
                creator: loggedInUser.Email
            }
        })
    };

    const closeModal = () => {
        setModalShow(false);
        setModalRole("");
    }

    return (
        <div className={`${(items.filter((u) => u.Data.creator === loggedInUser.Email))[0] ? "container-fluid" : "full-container"} pt-4 ${pageTheme}`}>
            {!isPressed ? <> <h1 className="fw-light p-3">My cards:</h1>
                <button className="btn btn-primary ms-2" onClick={() => openModal("Add")}>Create card</button>
                <div className="row mt-4">
                    {(items.filter((u) => u.Data.creator === loggedInUser.Email)).map((item) => (
                        <div className="col-7 col-sm-5 col-md-4 col-lg-3 mb-5" key={item.ItemID}>
                            <div className={`${cardTheme} shadow`} >
                                <img src={item.Data.img} className=" card-img-top" alt={item.Data.title} />
                                <div className="card-body m-0 p-2" >
                                    <h5 className='card-title '>{item.Data.title}</h5>
                                    <p className={`card-text `} >{item.Data.description}</p>
                                    <div className="row">
                                        <button className="btn col-4 ms-3 me-5 btn-primary" onClick={() => pressed(item)} >Details</button>
                                        <button className="btn col-1 p-0 ms-2 me-2" onClick={() => { setNewJob({ ...item }); setModalShow(true); setModalRole("Delete") }} >
                                            <i className="bi bi-trash3-fill fs-4 text-danger"></i>
                                        </button>
                                        <button className="btn col-1 p-0" onClick={() => { setModalShow(true); setNewJob({ ...item }); setModalRole("Edit"); }} >
                                            <i className="bi bi-pencil-square fs-4 text-warning"></i>
                                        </button>
                                        {isLiked(item)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </> : <Cards />}

            {modalShow && <CardFormModal show={modalShow} handleClose={closeModal} role={modalRole} job={newJob} />}
        </div >
    );
}

export default MyCards;