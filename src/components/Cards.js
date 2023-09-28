import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";
import { ThemeContext } from "../contexts/ThemeContext";

function Cards({ category }) {

    const { filteredItems, pressed, isPressed, selectedItem, isLiked, isApplied } = useContext(ListContext);
    const { cardTheme } = useContext(ThemeContext);

    return (
        <>
            {!isPressed ? <>{(filteredItems.filter((u) => u.Data.category === category)).map((item) => (
                <div className="col-7 col-sm-5 col-md-4 col-lg-3 mb-5" key={item.ItemID}>
                    <div className={`${cardTheme} shadow`} >
                        <img src={item.Data.img} className=" card-img-top" alt={item.Data.title} />
                        <div className="card-body m-0 p-2" >
                            <h5 className='card-title '>{item.Data.title}</h5>
                            <p className={`card-text `} >{item.Data.description}</p>
                            <div className="row">
                                <button className="btn col-5 ms-3 me-5 btn-primary rounded-5" onClick={() => pressed(item)} >Details</button>
                                {isLiked(item)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}</> : <div className=" container-fluid">
                <div className="row">
                    <img src={selectedItem.Data.img} className="rounded-4 col-6 col-sm-5 col-md-4 mt-3 ms-5 p-0 " alt={selectedItem.Data.title} />
                    <div className="col-6 offset-1">
                        <h1 className=" row mt-2">{selectedItem.Data.title}</h1>
                        <p className='mt-4 info fs-5'><b className="  fw-semibold fs-5">Description:</b><br />{selectedItem.Data.description}</p>
                    </div>

                </div>
                <div className="my-4 info fs-5">
                    <p>{selectedItem.Data.info}</p>
                    <div className="row my-4 justify-content-evenly">
                        {selectedItem.Data.location && <span className="bi bi-geo-alt-fill col-auto fs-5 text-center"> {selectedItem.Data.location}</span>}
                        {selectedItem.Data.email && <a href={`mailto:${selectedItem.Data.email}`} className="bi bi-envelope-at-fill col-auto nav-link fs-5 text-center"> Email Us</a>}
                        {selectedItem.Data.phone && <span className="bi bi-telephone-fill col-auto fs-5 text-center nav-link" > Call Us: {selectedItem.Data.phone}</span>}
                    </div>
                </div>
                <div className="row pt-4 ">
                    <button className="btn btn-warning col-2 me-5 rounded-5" onClick={pressed}>back</button>
                    {isApplied(selectedItem)}
                    {isLiked(selectedItem)}
                </div>
            </div>}
        </>
    );
}

export default Cards