import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react"
import { getChirps, likeChirp } from "../store/chirps"
import EditChirpModal from "./ChirpFeed/EditChirpModal";
import DeleteChirpModal from "./ChirpFeed/DeleteChirpModal";
import solidHeart from "./images/solid_heart.svg"
import hollowHeart from "./images/hollow_heart.svg"
import { Link, NavLink, useHistory } from "react-router-dom";
import "./Chirp.css"


// const Chirp = ({chirp, users}) => {
const Chirp = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state?.session.user)

    const chirp = props.chirp
    const users = props.users

    const [likeCounter, setLikeCounter] = useState(chirp?.likes?.length)
    const [likesArray, setLikesArray] = useState(chirp?.likes)
    const [editActive, setEditActive] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [likedChirp, setLikedChirp] = useState(
        likesArray?.find((like) => like?.user.id === user?.id))

    const editChirp = () => {
        setShowDropdown(!showDropdown)
    }

    const handleLike = async (e) => {
        e.stopPropagation()

        if (likedChirp) {
            const unliked = fetch(`api/likes/${likedChirp?.id}`, {
                method: "DELETE",
            })

            setLikeCounter((prev) => prev - 1)
            setLikedChirp(null)

        } else {
            const like = await dispatch(likeChirp(chirp?.id))
            setLikedChirp(like)
            setLikeCounter((prev) => prev + 1)
        }
    }

    const goToPost = () => {
        history.push(`/chirps/${chirp?.id}`)
    }

    return (
        <>
          {user && user?.id == chirp?.user_id ? (
            <div className="single-chirp">
              <div className="user-and-options-container">
                <div className="user-container">
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
                <div className="chirp-options">
                  <div
                    className="Chirps-name"
                    onClick={() => {
                      editChirp();
                      setEditActive(!editActive);
                    }}
                  >
                    <button className="chirp-options-button">
                      <i className="fa-solid fa-ellipsis fa-xl"></i>
                    </button>
                  </div>
                  <div className="options-buttons">
                    {showDropdown && <EditChirpModal chirp={chirp} id={chirp?.id} />}
                    {showDropdown && <DeleteChirpModal chirp={chirp} />}
                  </div>
                </div>
              </div>
              <div className="chirp-content">
                <div className="content-container">
                  <Link to={`/chirps/${chirp?.id}`}>
                    <div className="single-chirp-content">{chirp?.content}</div>
                    <img src={chirp?.image_url} className="single-chirp-img" alt="" />
                  </Link>
                </div>
              </div>
              <div className="comment-and-like-container">
                <div className="comment-icon-container">
                  <Link to={`/chirps/${chirp?.id}`}>
                    <img
                      className="chirp icon comment"
                    //   src={commentIcon}
                      alt="comment-icon"
                    />
                    <div className="comment-counter">
                      {/* <span>{0}</span> */}
                    </div>
                  </Link>
                </div>
                <div className={`heart-info-container`}>
                  <div onClick={handleLike} className="heart-icon-container">
                    <img
                      className={`chirp icon heart ${
                        likedChirp ? "liked" : "not-liked"
                      }`}
                      src={likedChirp ? solidHeart : hollowHeart}
                      alt="heart-icon"
                    />
                  </div>
                  <div className="like-counter">
                    <span>{likeCounter}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="single-chirp">
              <div className="user-and-options-container">
                <div className="user-container">
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
                <div className="chirp-options">
                  <button className="chirp-options-button">
                    <Link to={`/chirps/${chirp?.id}`}>
                      <i className="fa-solid fa-ellipsis fa-xl"></i>
                    </Link>
                  </button>
                </div>
              </div>
              <div className="chirp-content">
                <div className="content-container">
                  <Link to={`/chirps/${chirp?.id}`}>
                    <div className="single-chirp-content">{chirp?.content}</div>
                    <img src={chirp?.image_url} className="single-chirp-img" alt="" />
                  </Link>
                </div>
              </div>
              <div className="comment-and-like-container">
                <div className="comment-icon-container">
                  <Link to={`/chirps/${chirp?.id}`}>
                    <img
                      className="chirp icon comment"
                    //   src={commentIcon}
                      alt="comment-icon"
                    />
                    <div className="comment-counter">
                      {/* <span>{0}</span> */}
                    </div>
                  </Link>
                </div>
                <div className={`heart-info-container`}>
                  <div onClick={handleLike} className="heart-icon-container">
                    <img
                      className={`chirp icon heart ${
                        likedChirp ? "liked" : "not-liked"
                      }`}
                      src={likedChirp ? solidHeart : hollowHeart}
                      alt="heart-icon"
                    />
                  </div>
                  <div className="like-counter">
                    <span>{likeCounter}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    };

export default Chirp