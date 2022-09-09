import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { Modal } from "../context/Modal";

import { getChirps} from "../../store/chirps"
import "./ChirpFeed.css"



const ChirpFeed = () => {
    // const [showDropdown, setShowDropdown] = useState(false)
    // const [showModal, setShowModal] = useState(false)
    // const [editActive, setEditActive] = useState(false)
    // const user = useSelector((state) => state.session.user)
    const chirps = useSelector((state) => Object.values(state.chirps))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChirps())
    }, [dispatch])

    return (
        <div className="chirpFeed-Main-Container">
            {chirps.map((ele) => (
                <div className="chirpFeed-chirp_content" key={ele.id}>
                    <Link to={`chirps/${ele.id}`} key={ele.id} className="link-to-chirp" >
                    {ele.chirp_content}, 
                    <img className="chirpFeed-img" src={ele.image_url} alt=""/>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ChirpFeed