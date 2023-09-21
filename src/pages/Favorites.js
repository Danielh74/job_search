import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";
import '../css/cardCSS.css';

import { ThemeContext } from "../contexts/ThemeContext";
import Cards from "../components/Cards";

function Favorites() {

    const { favList, isPressed, pressed, isLiked } = useContext(ListContext);
    const { cardTheme, pageTheme } = useContext(ThemeContext);

    return (
        <>
            {favList.length > 0 ? <><div className={`container-fluid pb-1 ${pageTheme} ${favList.length > 0 ? "" : "full-container"}`}>

                {isPressed ? <Cards /> :
                    <>
                        <h1 className="fw-light p-3">My favorite jobs:</h1>
                        <ul className={`row mt-5 pb-5 `}>
                            {favList.map((item) => (
                                <div className="col-6 col-sm-5 col-md-4 col-lg-3 mb-5 p-0 mx-4 " key={item.ItemID}>
                                    <div className={`${cardTheme}`} >
                                        <img src={item.Data.img} className=" card-img-top rounded-top" alt={item.Data.title} />
                                        <div className="card-body m-0 p-2" >
                                            <h5 className='card-title '>{item.Data.title}</h5>
                                            <p className={`card-text `}>{item.Data.description}</p>
                                            <div className="row">
                                                <button className="btn col-4 ms-2 btn-primary" onClick={() => { pressed(item) }}>Details</button>
                                                {isLiked(item)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul >
                    </>}
            </div >
            </> :
                <div className={`container-fluid ${pageTheme} full-container`}>
                    <h1 className="fw-light p-3">My favorite jobs:</h1>
                    <h6 >You have no favorite jobs yet...</h6>
                </div>}
        </>
    );
}

export default Favorites;