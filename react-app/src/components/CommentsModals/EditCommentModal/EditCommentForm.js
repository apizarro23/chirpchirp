import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getComments, editComment } from "../../../store/comments";

const EditCommentForm = ({ comment, onClick}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [comment_content, setComment_Content] = useState(comment?.comment_content)
    const user = useSelector(state => state.session.user)
    const chirp = useSelector(state => state?.buzz)
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const [showModal, setShowModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    console.log('OVER HERE!@@@@@@@@',chirpId)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id: comment?.id,
            user_id: user.id,
            comment_content: comment_content,
            chirp_id: chirpId
        }
        const response = await dispatch(editComment(payload))

        // console.log('THIS IS THE PAYLOAD1', payload)

        // console.log('THIS IS THE RESPONSE2', response)
    
        if (response) {
            await dispatch(getComments())
            setShowModal(false)
            setShowDropdown(false)
            history.pushState(`chirps/${chirpId}`)
        }
    }

    const updateCommentContent = (e) => {
        setComment_Content(e.target.value)
    }

    return (
        <div className="dropdown-container">
          <div className="edit-chirp-button" onClick={() => setShowModal(true)}>
            <form onSubmit={handleSubmit} className="block">
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
                <div className="delete-option cancel" onClick={onClick}>Cancel</div>
              </div>
            </form>
          </div>
        </div>
      )
    }

export default EditCommentForm