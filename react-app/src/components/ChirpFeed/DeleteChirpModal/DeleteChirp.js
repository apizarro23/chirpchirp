import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteChirp } from "../../../store/chirps"

function DeleteChirp({chirp, onClick}) {
    let dispatch = useDispatch()
    let history = useHistory()

    const onDelete = () => {
        dispatch(deleteChirp(chirp.id))
        history.push("/")
    }

    
    return (
        <div>
            <div>
                <h3>DELETE CHIRP?</h3>
                <div> Are you sure you want to delete this chirp?</div>
            </div>
            <div className="delete-chirp-button" onClick={onDelete}>Delete</div>
            <div className="cancel-delete-chirp-button" onClick={onClick}>Cancel</div>
        </div>
    )
        
}

export default DeleteChirp