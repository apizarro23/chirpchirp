import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

import { Modal } from "../context/Modal";
import NewChirpForm from "./NewChirpForm"

import { getChirps} from "../../store/chirps"
import "./ChirpFeed.css"



const ChirpFeed = () => {
    // const [showDropdown, setShowDropdown] = useState(false)
    // const [showModal, setShowModal] = useState(false)
    // const [editActive, setEditActive] = useState(false)
    const [users, setUsers] = useState([]);
    const user = useSelector((state) => state.session.user)
    const chirps = useSelector((state) => Object.values(state.chirps))
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getChirps())

        async function fetchData() {
            const response = await fetch("/api/users/");
            const responseData = await response.json();
            setUsers(responseData.users);
          }
          fetchData()
        }, [dispatch])
        

    return (
        <div className="chirpFeed-Main-Container">
            <div className="left-container">
                <NavBar/>
            </div>
            <div className="chirpFeed-middle-container">
                <div className="create-newchirp">
                <div className="">{user.username}</div>
                <div className="at-username">{`@${user.username}`}</div>
                <NewChirpForm/>
                </div>
                {chirps.map((ele) => (
                    <div className="chirpFeed-chirp_content" key={ele.id} id={ele.id}>
                        <div className="chirp-owner">
                        {`@${users[ele?.user_id - 1]?.username}`}
                        </div>
                        <Link to={`chirps/${ele.id}`} key={ele.user_id} className="link-to-chirp" >
                        {ele.chirp_content} 
                        <img className="chirpFeed-img" src={ele.image_url} alt=""/>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="chirpFeed-right-container">
                THIS IS THE RIGHT SIDE
            </div>
        </div>
    )
}

export default ChirpFeed