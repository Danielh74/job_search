import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../contexts/ListContext";
import { LoginContext } from "../contexts/LoginContext";
import { ThemeContext } from "../contexts/ThemeContext";

function Footer() {

    const { loggedInUser } = useContext(LoginContext)
    const { items, favList, appliedList, setList, setIsPressed } = useContext(ListContext);
    const { pageTheme, layoutTheme } = useContext(ThemeContext)
    let copyrightMargin = "mb-0";

    const fetchItems = async () => {
        let likedList = [], appliedList = [];
        for (let i = 0; i < items.length; i++) {
            let likedArr = items[i].Data.whoLiked.length, appliedArr = items[i].Data.whoApplied.length;
            for (let j = 0; j < likedArr; j++) {
                if (items[i].Data.whoLiked[j].Email === loggedInUser.Email) {
                    likedList = [...likedList, items[i]];
                }
            }
            for (let j = 0; j < appliedArr; j++) {
                if (items[i].Data.whoApplied[j].Email === loggedInUser.Email) {
                    appliedList = [...appliedList, items[i]];
                }
            }
        }
        setList(likedList, "favorites");
        setList(appliedList, "applications");
    };

    useEffect(() => {
        fetchItems();
    }, [items])

    if (loggedInUser) {
        copyrightMargin = "mb-3";
    } else {
        copyrightMargin = "mb-0";
    }
    return (
        <>
            <p className={`text-center copy-right py-5 ${copyrightMargin} ${pageTheme} `}>
                &copy; {new Date().getFullYear()} Hired! - Job Finding Site. All Rights
                Reserved.
            </p>
            {loggedInUser ? <nav className={`navbar navbar-expand ${layoutTheme} fixed-bottom p-0`}>
                <div className="container-fluid">
                    <div className="row collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item d-flex justify-content-center text-center col-2 offset-1 ">
                                <small>
                                    <Link className='nav-link' onClick={() => setIsPressed(false)} to="/favorites">
                                        {favList.length > 0 ? favList.length : <></>} &nbsp;
                                        <i className="bi bi-heart-fill"></i>
                                        <br />
                                        <span className=" d-none d-md-block">Favorites</span>
                                    </Link>
                                </small>
                            </li>
                            <li className="nav-item d-flex justify-content-center text-center col-2 offset-2 ">
                                <small>
                                    <Link className='nav-link' onClick={() => setIsPressed(false)} to="/myapplications">
                                        {appliedList.length > 0 ? appliedList.length : <></>} &nbsp;
                                        <i className="bi bi-briefcase-fill "></i>
                                        <br />
                                        <span className=" d-none d-md-block">My applications</span>
                                    </Link>
                                </small>
                            </li>
                            <li className=" nav-item d-flex justify-content-center text-center col-2 offset-2">
                                <small>
                                    <Link className="nav-link" onClick={() => setIsPressed(false)} to="/aboutus">
                                        <i className="bi bi-info-circle-fill "></i>
                                        <br />
                                        <span className=" d-none d-md-block ">About us</span>
                                    </Link>
                                </small>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav > : <></>
            }
        </>
    );
}

export default Footer;