import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import NavBar from "../NavBar";
import linked from "../images/linked-in-logo.png"
import git from "../images/github-logo.png"

import NewChirpForm from "./NewChirpForm"

import { getChirps, likeChirp } from "../../store/chirps"
import "./ChirpFeed.css"

import defaultImage from "../images/icons8-bird-96.png"

import Chirp from "../Chirp"



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

            // console.log("THESE ARE THE USERS FOR THE FEED",responseData)
          }
          fetchData()
        }, [dispatch])

    if (!chirps) return null;

        

    return (
        <div className="chirpFeed-Main-Container">
            <div className="left-container">
                <NavBar/>
            </div>
            <div className="chirpFeed-middle-container">
                <div className="create-newchirp">
                    <img className="user-pic" src={user.profile_pic} alt="main-pp" onError={ e => e.currentTarget.src = defaultImage}/>
                <div className="user">
                    Hi,{user.username}
                </div>
                <div className="at-username">
                    {`@${user.username}`}
                
                </div>
                <div className="new-chirp-form">
                <NewChirpForm/>
                </div>
                </div>
                
                <div className="TEST">
                    {chirps.map(chirp => (
                    <Chirp chirp={chirp} users={users}/>
                    ))}   
                </div>
                {/* <div className="sort">
                {chirps.map((ele) => (
                    <div className="chirpFeed-chirp_content" key={ele.id} id={ele.id}>
                        <div className="chirp-owner">
                            <NavLink to={`/users/${ele.user_id}`}>
                                <img 
                                src={`${users[ele?.user_id - 1]?.profile_pic}`}
                                alt=""
                                onError={e => e.currentTarget.src = defaultImage}
                                />
                                {`@${users[ele?.user_id - 1]?.username}`}
                            </NavLink> */}
                        {/* {`@${users[ele?.user_id - 2]?.username}`} */}
                        {/* </div>
                        <Link to={`chirps/${ele.id}`} key={ele.user_id} className="link-to-chirp" >
                        {ele.chirp_content} 
                        <div>
                        <img className="chirpFeed-img" src={ele?.image_url} alt="" onError={ e => {
                            if (ele.image_url) {
                                e.currentTarget.src = defaultImage
                            }
                        }} />
                        </div>
                        </Link>
                    </div>
                ))}

                </div> */}
            </div>
            <div className="chirpFeed-right-container">
                <div className='bottom-name'>Meet Me: Antony Pizarro</div>
                <div className='HomePage-LinkedIn'>
                    <img alt='social icon' className='HomePage-logos' src={linked} />
                        <a href='https://www.linkedin.com/in/antony-pizarro/'>LinkedIn</a>
                </div>
                <div className='HomePage-GitHub'>
                    <img alt='social icon' className='HomePage-logos' src={git} />
                        <a href='https://github.com/apizarro23'>GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default ChirpFeed