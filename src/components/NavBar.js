import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/app_Icon.png';
import { useContext, useState } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { ListContext } from '../contexts/ListContext';
function NavBar() {

    const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
    const { layoutTheme, toggleTheme } = useContext(ThemeContext)
    const { setFilterValue, jobCategories, setChosenCategory, setListTitle, setIsPressed } = useContext(ListContext);
    const nav = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilterValue(searchValue);
    };

    const handleClear = (e) => {
        e.preventDefault();
        setSearchValue("");
        setFilterValue("");
    };

    const handleLogOut = () => {
        setLoggedInUser();
        localStorage.removeItem("userToken");
        nav("/login");
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg ${layoutTheme} sticky-top p-0`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" onClick={() => setIsPressed(false)} to={loggedInUser ? "/home" : "/"}>
                        <img src={logo} alt="app Icon" className="me-2 rounded-pill" width={25} />
                        Hired!
                    </Link>

                    {loggedInUser ? (
                        <>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">

                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="row collapse navbar-collapse ms-auto" id="navbarSupportedContent">
                                <ul className="navbar-nav align-items-center">
                                    <li className="nav-item dropdown ms-auto ">
                                        <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                            <span> Categories</span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item" onClick={() => { setChosenCategory(jobCategories); setListTitle("ALL") }}>ALL</button></li>
                                            {jobCategories.map((c) => (
                                                <li key={c}><button className="dropdown-item" onClick={() => { setChosenCategory([c]); setListTitle(c) }} >{c}</button></li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="nav-item ms-3 col-5 text-center ms-auto">
                                        <form className=" input-group" onSubmit={handleSubmit}>
                                            <input
                                                className="form-control "
                                                type="text"
                                                placeholder="Search jobs..."
                                                value={searchValue}
                                                onChange={handleSearchChange}
                                            />
                                            <button className="btn btn-light form-button" type="submit">
                                                <i className="bi bi-search"></i>
                                            </button>
                                            <button className="btn btn-light form-button" onClick={handleClear}>
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </form>
                                    </li>
                                    <li className="nav-item dropdown ms-auto ">
                                        <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                            <i className="bi bi-person-fill fs-5"></i> <i>{loggedInUser.Name}</i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" onClick={() => setIsPressed(false)} to="/profile">Profile</Link></li>
                                            {loggedInUser.Role === "Business" || loggedInUser.Role === "Admin" ? <>
                                                <li><Link className="dropdown-item" onClick={() => setIsPressed(false)} to="/mycards">My cards</Link></li>
                                            </> : <></>}
                                            {loggedInUser.Role === "Admin" ?
                                                <li><Link className="dropdown-item" onClick={() => setIsPressed(false)} to={'/usermanagement'}>Users management</Link></li> : <></>}
                                            <li><button className="dropdown-item" onClick={handleLogOut}>Log-out</button></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item ms-auto">
                                        <small>
                                            <button className="nav-link" onClick={toggleTheme}>
                                                {layoutTheme === "light-layout" ? <>
                                                    <i className="bi bi-moon-fill"></i>
                                                    <br />
                                                    <span>Dark</span></> :
                                                    <>
                                                        <i className="bi bi-sun-fill text-light"></i>
                                                        <br />
                                                        <span className=' text-light'>Light</span>
                                                    </>
                                                }
                                            </button>
                                        </small>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="row collapse navbar-collapse ms-auto" id="navbarSupportedContent">
                                <ul className="navbar-nav align-items-center">
                                    <div className='row ms-auto'>
                                        <li className="nav-item col-auto ">
                                            <button className="nav-link" onClick={() => nav('/aboutus')}>About us</button>
                                        </li>
                                        <li className="nav-item col-auto">
                                            <button className="btn text-primary btn-sm nav-link" onClick={() => nav('/login')}><span>Log in</span></button>
                                        </li>
                                        <li className="nav-item mt-1 col-auto">
                                            <button className=" btn btn-primary mx-2 btn-sm rounded-3" onClick={() => nav('/signup')}><span className=' fw-lighter'>Sign up</span></button>
                                        </li>
                                        <li className="nav-item  col-auto">
                                            <small>
                                                <button className="nav-link" onClick={toggleTheme}>
                                                    {layoutTheme === "light-layout" ? <>
                                                        <i className="bi bi-moon-fill"> </i>
                                                        <span>Dark</span></> :
                                                        <>
                                                            <i className="bi bi-sun-fill text-light"> </i>
                                                            <span className=' text-light'>Light</span>
                                                        </>
                                                    }
                                                </button>
                                            </small>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </>
                    )}
                </div >
            </nav >
        </>
    );
}

export default NavBar;