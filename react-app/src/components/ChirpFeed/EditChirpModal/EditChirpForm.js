import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getChirps, editChirp } from "../../../store/chirps";

const EditChirpForm = ({ chirp, onClick }) => {
    const dispatch = useDispatch()
    // const history = useHistory()
    // const chirp = useSelector(state => state.chirps)
    const user = useSelector(state => state.session.user)
    const [chirp_content, setChirp_Content] = useState(chirp?.chirp_content)
    const [image_url, setImage_Url] = useState(chirp?.image_url)
    // const [showModal, setShowModal] = useState(false)
    // const [showDropdown, setShowDropdown] = useState(false)

    // console.log('OVER HERE!@@@@@@@@',chirp)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: user.id,
            chirp_content,
            image_url: image_url
        }
        await dispatch(editChirp(payload, chirp.id))

        // console.log('THIS IS THE PAYLOAD1', payload)

        // console.log('THIS IS THE RESPONSE2', response)
    
        // if (response) {
        //     await dispatch(getChirps())
        //     setShowModal(false)
        //     setShowDropdown(false)
        // }
    }

    const updateChirpContent = (e) => {
        setChirp_Content(e.target.value)
    }

    const updateImageUrl = (e) => {
        setImage_Url(e.target.value)
    }

    return (
        <div className="dropdown-container">
                    <div className="edit-chirp-modal-container">
                        <form onSubmit={handleSubmit}>
                            <label className="edit-chirp-modal-main-label">EDIT</label>
                            <label className="edit-chirp-modal-chirp-content-label">CHIRP CONTENT</label>
                            <div>
                                <input
                                    name="name"
                                    className="edit-chirp-modal-chirp-content-input"
                                    value={chirp_content}
                                    onChange={updateChirpContent}
                                />
                            </div>
                            <label className="edit-chirp-modal-image-url-label">EDIT IMAGE</label>
                            <div className="edit-buzz-modal-input-image-outer">
                                <input
                                name="server_pic"
                                className="edit-chirp-modal-image-url-input"
                                placeholder="CHANGE URL HERE"
                                value={image_url}
                                onChange={updateImageUrl}
                                />
                            </div>
                            <div className="edit-chirp-buttons-container">
                            <div className='give-me-a-border cancel' onClick={onClick}>Cancel</div>
                                {/* <button onClick={() => {
                                    setShowModal(false)
                                    setShowDropdown(false)
                                }}
                                className="edit-chirp-modal-cancel-button"
                                >
                                    CANCEL
                                </button> */}
                                <button
                                    type="submit"
                                    className="edit-chirp-modal-submit-button"
                                >
                                    SAVE CHIRP CHANGES
                                </button>
                            </div>
                        </form>
                    </div>
        </div>
    )



}

export default EditChirpForm