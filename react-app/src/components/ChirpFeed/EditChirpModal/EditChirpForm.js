import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getChirps, editChirp } from "../../../store/chirps";
import "./EditChirpForm.css"

const EditChirpForm = ({ chirp, onClick }) => {
    // const chirp = useSelector(state => state.chirps)
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [chirp_content, setChirp_Content] = useState(chirp?.chirp_content)
    const [image_url, setImage_Url] = useState(chirp?.image_url)
    const [showModal, setShowModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [errors, setErrors] = useState([]);


    // console.log('OVER HERE!@@@@@@@@',chirp)

    useEffect(() => {
        const errors = [];
        const imgRegex = new RegExp(
          /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
        );
        if (image_url && !imgRegex.test(image_url)) {
          errors.push(
            "Invalid Image Url! URL must contain a .png, .jpg, .jpeg, .gif, .png or .svg!"
          );
        }
        setErrors(errors);
      }, [image_url]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errors.length > 0) {
            return;
          }
      
          if (!chirp_content) {
            setErrors(["Chirp is required!"]);
            return;
          }
          if (chirp_content && chirp_content.trim().length === 0) {
            setErrors(["Chirp is required!"]);
            return;
          }
      
          if (chirp_content.length > 280) {
              setErrors(["Chirp length of 280 characters exceeded!"])
              return;
          }


        const payload = {
            user_id: user.id,
            chirp_content,
            image_url: image_url
        }
        await dispatch(editChirp(payload, chirp.id))

        await dispatch(getChirps())
        onClick()
        setShowDropdown(false)

        // console.log('THIS IS THE PAYLOAD1', payload)

        // console.log('THIS IS THE RESPONSE2', response)
    
        // if (response) {
        //     await dispatch(getChirps())
        //     onClick()
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
                        <form onSubmit={handleSubmit} className="inputs">
                        <div className="edit-comment-errors">
                            {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                            ))}
                        </div>
                            <label className="edit-chirp-modal-main-label">EDIT</label>
                            {/* <label className="edit-chirp-modal-chirp-content-label">CHIRP CONTENT</label> */}
                            <div>
                                <input
                                    name="name"
                                    className="edit-chirp-modal-chirp-content-input"
                                    value={chirp_content}
                                    onChange={updateChirpContent}
                                />
                            </div>
                            <label className="edit-chirp-modal-image-url-label">EDIT IMAGE URL (OPTIONAL)</label>
                            <div className="edit-chirp-modal-input-image-outer">
                                <input
                                name="server_pic"
                                className="edit-chirp-modal-image-url-input"
                                placeholder="CHANGE URL HERE"
                                value={image_url}
                                onChange={updateImageUrl}
                                />
                            </div>
                            <div className="edit-chirp-buttons-container">
                            <button
                                    type="submit"
                                    className="edit-chirp-modal-submit-button"
                                >
                                    SAVE CHIRP CHANGES
                            </button>
                            <button>
                            <div className='give-me-a-border cancel' onClick={onClick}>Cancel</div>
                            </button>
                                {/* <button onClick={() => {
                                    setShowModal(false)
                                    setShowDropdown(false)
                                }}
                                className="edit-chirp-modal-cancel-button"
                                >
                                    CANCEL
                                </button> */}

                            </div>
                        </form>
                    </div>
        </div>
    )



}

export default EditChirpForm