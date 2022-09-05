import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editChirp } from "../../../store/chirps";

function EditChirpForm({ chirp, onClick}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [chirp_content, setChirp_Content] = useState(chirp?.chirp_content)
    const [image_url, setImg_Url] = useState(chirp?.image_url)
    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: user.id,
            chirp_content: chirp_content,
            image_url: image_url
        }

        let updatedChirp = await dispatch(editChirp(payload, chirp.id))
        if(updatedChirp) {
            history.push(`/chirps/${chirp.id}`)
        }

        onClick() //CLOSES MODAL
    }

    const editChirpContent = (e) => {
        setChirp_Content(e.target.value)
    }

    const editImgUrl = (e) => {
        setImg_Url(e.target.value)
    }

    return (
        <div className="edit-chirp-container">
            <div className="edit-chirp-top-bar">
                <div onClick={() => onClick()}>Cancel</div>
                <div style={{"font-weight": "bold"}}>Edit Chirp</div>
                <button onClick={handleSubmit} className='edit-chirp-submit-button' type="submit" >Edit Chirp</button>
            </div>
            <div className="edit-chirp-main-container">
                <form className="edit-chirp-form-container" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="chirp_content"> Chirp Content</label>
                        <input
                            name="chirp_content"
                            type="text"
                            placeholder="Edit Chirp Here"
                            value={chirp_content}
                            onChange={editChirpContent}                        
                        />
                    </div>
                    <div>
                        <label htmlFor="imgUrl"> Image URL</label>
                        <input
                            name="imgUrl"
                            type="text"
                            placeholder="Edit Image Here"
                            value={image_url}
                            onChange={editImgUrl}
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditChirpForm