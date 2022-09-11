import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import { getComments } from "../store/comments";
import NewCommentForm from "./NewCommentForm";
import DeleteCommentModal from "./CommentsModals/DeleteCommentModal";
import EditCommentModal from "./CommentsModals/EditCommentModal";
import "./Comments.css"

const Comments = () => {
    const [editActive, setEditActive] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const user = useSelector(state => state?.session?.user)
    const dispatch = useDispatch()
    const comments = useSelector((state) => Object.values(state?.comments))
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const chirp = useSelector((state) => state?.chirps[chirpId])
    const commentsByChirp = Object.values(comments).filter(
        (comment) => comment?.chirp_id === chirpId)

    // console.log("COMMENTSBY CHIRPID!!!!!!", commentsByChirp)

    const editComment = () => {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        dispatch(getComments(chirpId))

        async function fetchData() {
          const response = await fetch("/api/users/");
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData()
        }, [chirpId, dispatch])
    
    if (!comments) return null

  return (
    <div className="comments-container">
      <div className="comment-form-container">
        <NewCommentForm />
      </div>
      <div className="list-comments">
        {commentsByChirp.map((ele) => (
          <div className="single-comment">
            {`@${users[ele?.user_id - 1]?.username} said...`}
            <div className="comment-content">
              <div>{ele.comment_content}</div>
            </div>
            <div className="comment-options">
              <div
                className="Chirps-name"
                onClick={() => {
                  editComment();
                  setEditActive(!editActive);
                }}
              >
                <button className="chirp-options-button">
                  <i className="fa-solid fa-ellipsis fa-xl"></i>
                </button>
              </div>
              <div className="options-buttons">
                {showDropdown && <EditCommentModal comment={ele} />}
                {showDropdown && <DeleteCommentModal comment={ele} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
