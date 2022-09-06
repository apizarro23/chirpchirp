import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editChirp, getChirps } from "../store/chirps";
import EditChirpModal from "./ChirpFeed/EditChirpModal";
import DeleteChirpModal from "./ChirpFeed/DeleteChirpModal";

const ChirpDetails = () => {
    const [hideButtons, setHideButtons] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const dispatch = useDispatch()
    const history = useHistory()
    const chirps = useSelector(state => Object.values(state?.chirps))
    const chirp = useSelector(state => state?.chirps[chirpId])
    const sessionUser = useSelector(state => state.session.user)

    console.log("LOOK HERE!!!!!!!!!!!!", chirp)

    // const editChirp = () => {
    //     setShowDropdown(!showDropdown)
    // }

    useEffect(() => {
        dispatch(getChirps(chirpId))
    }, [dispatch, chirpId])

    return (
        <div>
            <div key={chirp.id} className="single-buzz">
                <div className="chirp-NavBar">
                    <div
                        className="chirps-name"
                        onClick={() => {
                        editChirp();
                        setEditActive(!editActive);
                        }}
                    >
                        <button className="chirp-options-button">
                        <i className="fa-solid fa-ellipsis fa-xl"></i>
                        </button>
                    </div>
                    <div className="ServerPage-NavBar-buttons"></div>
                    {showDropdown && <EditChirpModal chirp={chirp} id={chirp.id} />}
                    {showDropdown && <DeleteChirpModal chirp={chirp} />}

                </div>
                <div>
                {chirp.chirp_content}
                <img src={chirp.img} className="single-chirp-img" alt="" />
                </div>
            </div>
            {/* <div key={chirpId} className="chirp-detail">
                <div className="chirp-navbar" onClick={() => {
                    editChirp();
                    setEditActive(!editActive)
                }}> */}
                    {/* <button className="chirp-options-button">
                        OPTIONS
                    </button> */}
                    {/* {chirp?.chirp_content} */}
                {/* </div>
                <div className="serverpage-navbar-buttons"></div>
            </div> */}
        </div>
    )
}

export default ChirpDetails