import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EditChirpModal from "../EditModal";
// ADD IMPORT FOR DELETE CHIRP HERE
// ADD CSS HERE
import { useHistory } from "react-router-dom";
import chirpReducer, { editChirp } from "../../../store/chirps";

function ChirpOptions({ chirp, onClick }) {
    // const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const goToChirp = () => {
        history.push(`/chirps/${chirp.id}`)
        onClick()
    }

    const copyLink = (chirp) => {
        let copiedLink = `ADD LINK FOR HEROKU HERE`

        navigator.clipboard.writeText(copiedLink)
    }

    return (
        <div className="post-options-container">
        {user && user.id == chirp.user.id ? (
            <div>
                <EditChirpModal chirp={chirp}/>
                <div className="goToChirp" onClick={goToChirp}>Go To Chirp</div>
                <div className="cancel" onClick={onClick}>Cancel</div>
            </div>
        ) : (
            <div>
                <div className="goToChirp" onClick={goToChirp}>Go To Chirp</div>
                <div className="cancel" onClick={onClick}>Cancel</div>
            </div>
        )}
        </div>
    )
}

export default ChirpOptions