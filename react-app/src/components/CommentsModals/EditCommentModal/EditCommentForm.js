import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getComments, editComment } from "../../../store/comments";
import "./EditCommentForm.css"

const EditCommentForm = ({ comment, onClick}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [comment_content, setComment_Content] = useState(comment?.comment_content)
    const user = useSelector(state => state.session.user)
    const chirp = useSelector(state => state?.chirp)
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    // console.log('OVER HERE!@@@@@@@@',chirpId)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!comment_content) {
          setErrors(["Comment is required!"]);
          return;
        }
    
        if (comment_content && comment_content.trim().length === 0) {
          setErrors(["Comment is required!"]);
          return;
        }
    
        if (comment_content.length > 280) {
          setErrors(["Comment length of 280 characters exceeded!"]);
          return;
        }
    

        const payload = {
            id: comment?.id,
            user_id: user.id,
            comment_content: comment_content,
            chirp_id: chirpId
        }
        await dispatch(editComment(payload))
        onClick()
        
        // console.log('THIS IS THE PAYLOAD1', payload)

    }

    const updateCommentContent = (e) => {
        setComment_Content(e.target.value)
    }

    return (
        <div className="dropdown-container">
          <div className="edit-chirp-button" onClick={() => setShowModal(true)}>
            <form onSubmit={handleSubmit} className="edit-comment-form">
            <div className="edit-comment-errors">
                {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
                ))}
            </div>
              <div>
                <div className="edit-it-chirp-modal-content">
                  <label className="edit-it-chirp-modal-main-label">Edit Content</label>
                  <div className="edit-it-chirp-modal-input-content-outer">
                    <input
                      name="name"
                      className="edit-it-chirp-modal-input-content-inner"
                      value={comment_content}
                      onChange={updateCommentContent}
                    />
                  </div>
                </div>
              </div>
              <div className="edit-it-chirp-buttons-container">
                <button type="submit" className="edit-it-chirp-modal-submit-button">
                  Update Comment
                </button>
                <button>
                <div className="delete-option cancel" onClick={onClick}>Cancel</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

export default EditCommentForm