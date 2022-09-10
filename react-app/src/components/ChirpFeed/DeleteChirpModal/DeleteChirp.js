import React,{ useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deleteChirp } from "../../../store/chirps"
import { getComments } from "../../../store/comments"

function DeleteChirp({chirp, onClick}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const comments = useSelector((state) => Object.values(state?.comments))
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const commentsByChirp = Object.values(comments).filter(
        (comment) => comment?.chirp_id === chirpId)

    // console.log("LOOK HERE CHIRP!!!!!!!!", chirp)
    

    const onDelete = () => {
        dispatch(deleteChirp(chirp.id))
        dispatch(getComments(chirp.id))
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