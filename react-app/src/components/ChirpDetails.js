import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChirps } from "../store/chirps";
import { getComments } from "../store/comments";
import EditChirpModal from "./ChirpFeed/EditChirpModal";
import DeleteChirpModal from "./ChirpFeed/DeleteChirpModal";
import Comments from "./Comments";
// import NewChirpForm from "./ChirpFeed/NewChirpForm";
import "./ChirpDetails.css"
import NavBar from "./NavBar";
import linked from "./images/linked-in-logo.png"
import git from "./images/github-logo.png"

const ChirpDetails = () => {
    // const [users, setUsers] = useState([]);
    const [editActive, setEditActive] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session.user)
    const chirp = useSelector(state => state?.chirps[chirpId])
    // const comments = useSelector(state => Object.values(state?.comments))

    // console.log("LOOK HERE!!!!!!!!!!!!", )

    const editChirp = () => {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        dispatch(getChirps(chirpId))
        dispatch(getComments(chirpId))


        
    }, [dispatch, chirpId])

    // console.log("THESE ARE THE USERS", users)

    return (
        <div className="chirpDetails-main-container">
            <div className="chirpDetails-left-container">
                <NavBar/>
            </div>
            <div className="chirpDetails-middle-container">
            <div key={chirp?.id}>
                {user && user?.id === chirp?.user_id ? (
                <div className="single-chirp">
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
                    <div className="ServerPage-NavBar-buttons">
                    {showDropdown && <EditChirpModal chirp={chirp} id={chirp.id} />}
                    {showDropdown && <DeleteChirpModal chirp={chirp} />}
                    </div>
                </div>
                <div className="chirp-content">
                    <div className="chirp-wrap">
                {chirp?.chirp_content}
                    </div>
                <img src={chirp?.image_url} className="single-chirp-img" alt="" />
                </div>
                </div>
                ):(
                    <div>
                    <div className="chirp-content">
                      <div>{chirp?.chirp_content}</div>
                      <img src={chirp?.image_url} className="single-chirp-img" alt="" />
                    </div>
                  </div>  
                )}
                <div className="comments-container">
                    <Comments/>
                </div>
            </div>

            </div>
            <div className="chirpDetails-right-container">
                <div className='bottom-name'>Meet Me: Antony Pizarro</div>
                <div className='HomePage-LinkedIn'><img alt='social icon' className='HomePage-logos' src={linked} /><a href='https://www.linkedin.com/in/antony-pizarro/'>LinkedIn</a></div>
                <div className='HomePage-GitHub'><img alt='social icon' className='HomePage-logos' src={git} /><a href='https://github.com/apizarro23'>GitHub</a></div>            </div>
        </div>
    )
}

export default ChirpDetails