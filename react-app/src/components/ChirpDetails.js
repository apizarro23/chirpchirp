import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChirps, likeChirp } from "../store/chirps";
import { getComments } from "../store/comments";
import EditChirpModal from "./ChirpFeed/EditChirpModal";
import DeleteChirpModal from "./ChirpFeed/DeleteChirpModal";
import Comments from "./Comments";
// import NewChirpForm from "./ChirpFeed/NewChirpForm";
import "./ChirpDetails.css"
import NavBar from "./NavBar";
import linked from "./images/linked-in-logo.png"
import git from "./images/github-logo.png"
import defaultImage from "./images/icons8-bird-96.png"

import solidHeart from "./images/solid_heart.svg"
import hollowHeart from "./images/hollow_heart.svg"

const ChirpDetails = () => {
    const [users, setUsers] = useState([]);
    const [editActive, setEditActive] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session.user)
    const chirp = useSelector(state => state?.chirps[chirpId])
    const chirps = useSelector((state) => Object.values(state?.chirps));
    // const comments = useSelector(state => Object.values(state?.comments))

    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [likeCounter, setLikeCounter] = useState(chirp?.likes?.length);
    const [likesArray, setLikesArray] = useState(chirp?.likes ?? []);
    const [likedChirp, setLikedChirp] = useState(
      likesArray?.find((like) => like.user_id === user.id)
    );

    // console.log("LOOK HERE!!!!!!!!!!!!", )

    const editChirp = () => {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        dispatch(getChirps(chirpId))
        dispatch(getComments(chirpId))

        async function fetchData() {
            const response = await fetch("/api/users/");
            const responseData = await response.json();
            setUsers(responseData.users);
          }
          fetchData();
        
    }, [dispatch, chirpId])

    useEffect(() => {
        if (likedChirp) {
          setIsLikedByUser(true);
        }
      }, [likesArray.length, likedChirp]);
    
      if (!chirps) return null;
    
      const handleLike = async (e) => {
        e.stopPropagation();
        if (isLikedByUser) {
          const unliked = fetch(`/api/likes/${likedChirp.id}`, {
            method: "DELETE",
          });
          setIsLikedByUser(false);
          setLikeCounter((prev) => prev - 1);
          setLikedChirp(null);
        } else {
          const like = await dispatch(likeChirp(chirp.id));
          setIsLikedByUser(true);
          setLikedChirp(like);
          setLikeCounter((prev) => prev + 1);
        }
      };

    // console.log("THESE ARE THE USERS", users)

    return (
        <div className="chirpDetails-main-container">
            <div className="chirpDetails-left-container">
                <NavBar/>
            </div>
            <div className="chirpDetails-middle-container">
            <div className="test" key={chirp?.id}>
                {user && user?.id === chirp?.user_id ? (
                <div className="single-chirp">
                <div className="chirp-NavBar">
                    <div className="chirp user">
                        <Link
                        to={`/users/${chirp?.user_id}`}
                        className="user-profile-link"
                        >
                        <img
                        src={users[chirp?.user_id - 1]?.profile_pic}
                        alt=""
                        className="chirp-pfp"
                        />
                        {`@${users[chirp?.user_id - 1]?.username}`}
                        </Link>
                    </div>
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

                    <div onClick={handleLike} className="heart-icon-container">
                        <img
                        className={`buzz icon heart ${
                            likedChirp ? "liked" : "not-liked"
                        }`}
                        src={likedChirp ? solidHeart : hollowHeart}
                        alt="heart-icon"
                    />
                  </div>
                  {/* <div className="like-counter">
                    <span>{likeCounter}</span>
                  </div> */}
                        
                    </div>
                            <img src={chirp?.image_url} className="single-chirp-img" alt="" onError={ e => {
                            if (chirp.image_url) {
                                e.currentTarget.src = defaultImage
                            }
                            }} />
                            
                </div>
                </div>
                ):(
                    <div>
                    <div className="chirp user">
                        <Link
                        to={`/users/${chirp?.user_id}`}
                        className="user-profile-link"
                        >
                        <img
                        src={users[chirp?.user_id - 1]?.profile_pic}
                        alt=""
                        className="chirp-pfp"
                        />
                        {`@${users[chirp?.user_id - 1]?.username}`}
                        </Link>
                    </div>
                    <div className="chirp-content">
                        <div className="chirp-wrap">
                            {chirp?.chirp_content}

                            <div onClick={handleLike} className="heart-icon-container">
                        <img
                        className={`buzz icon heart ${
                            likedChirp ? "liked" : "not-liked"
                        }`}
                        src={likedChirp ? solidHeart : hollowHeart}
                        alt="heart-icon"
                    />
                                      </div>


                        </div>
                            
                            
                        </div>

                      <div>
                        
                      <img src={chirp?.image_url} className="single-chirp-img" alt="" onError={ e => {
                            if (chirp.image_url) {
                                e.currentTarget.src = defaultImage
                            }
                        }} /> 


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