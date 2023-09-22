import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { LoginContext } from "../contexts/LoginContext";

function Main() {

    const { changeLoggedInUser } = useContext(LoginContext)
    const { pageTheme, cardTheme } = useContext(ThemeContext);
    const nav = useNavigate();

    useEffect(() => {
        changeLoggedInUser();
        localStorage.removeItem("userToken");
    }, [])

    return (
        <div className={`container-fluid ${pageTheme}`}>
            <div className="row text-center">
                <h1 className="mt-5 mb-0 fst-italic">Hired!</h1>
                <h2 className="fw-lighter">Your Ultimate Job Application Platform!</h2>
            </div>
            <div className="row pt-5">
                <div className="col-md-3 col-sm-5 col-7 offset-1 me-5">
                    <div className={`${cardTheme} shadow`}>
                        <img src="https://govbooktalk.files.wordpress.com/2012/05/uncle-sam-get-a-job1.png" className="card-img-top rounded" alt="uncle sam- we want you" />
                        <div className=" m-0 p-2" >
                            <h5 className='card-title '>We want you!</h5>
                            <p className={`card-text p-2 `} >Sign up today to be closer to work at your dream job!</p>
                            <div className="row">
                                <button className="btn col-5 ms-3 me-5 btn-primary" onClick={() => nav('/signup')} >Details</button>
                                <button className="btn col-2 fs-4 p-0 ms-auto" onClick={() => nav('/signup')}  >
                                    <i className="bi bi-heart-fill text-danger"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 offset-1">
                    <div className="row justify-content-center text-center ">
                        <button className="btn btn-primary mt-4 col-5 " onClick={() => nav("/signup")}>Sign up</button>
                        <span className=" ">Already have an account? <Link to={"/login"}>log in</Link></span>
                    </div>
                    <div className="row pt-5 justify-content-center text-center">
                        <h3 className="fw-light ms-4">Where do we seat</h3>
                        <iframe className="rounded-4 p-0 shadow col-5" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53669.7293488788!2d35.57024969623188!3d32.78276336914521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c3e4505b6d063%3A0xf6f4a023d4faf69f!2z15jXkdeo15nXlA!5e0!3m2!1siw!2sil!4v1695321751395!5m2!1siw!2sil" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="company location"></iframe>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Main;