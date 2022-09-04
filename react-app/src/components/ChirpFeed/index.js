import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import { getChirps} from "../../store/chirps"
import "./ChirpFeed.css"

const ChirpFeed = () => {
    const user = useSelector((state) => state.session.user)
    const chirps = useSelector((state) => Object.values(state.chirps))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChirps())
    }, [dispatch])

    return (
        <div className="chirpFeed-Main-Container">
            {chirps.map((ele) => (
                <div className="chirpFeed-chirp_content" key={ele.id}>
                    {ele.chirp_content}, 
                    <img className="chirpFeed-img" src={ele.image_url}/>
                </div>
            ))}
        </div>
    )
}

export default ChirpFeed