import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChirps } from "../store/chirps";

const ChirpDetails = () => {
    const [hideButtons, setHideButtons] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const dispatch = useDispatch()
    const history = useHistory()
    const chirps = useSelector(state => Object.values(state?.chirps))
    const chirp = useSelector(state => state.chirps[chirpId])
    const sessionUser = useSelector(state => state.session.user)

    const editChirp = () => {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        dispatch(getChirps())
    }, [dispatch])

    return (
        <div>
            <div key={chirp.id} className="chirp-detail">
                <div className="chirp-navbar" onClick={() => {
                    editChirp();
                    setEditActive(!editActive)
                }}>
                    <button className="chirp-options-button">
                        OPTIONS
                    </button>
                </div>
                <div className="serverpage-navbar-buttons"></div>
            </div>
        </div>
    )
}

export default ChirpDetails