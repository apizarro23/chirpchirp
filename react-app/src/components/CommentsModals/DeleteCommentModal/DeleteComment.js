import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteComment } from "../../../store/comments"

function DeleteComment({comment, onClick}) {
    let dispatch = useDispatch()
    let history = useHistory()

    console.log("ONDELETE DISPATCH", dispatch)

    const onDelete = () => {
        console.log("LOOK HERE!!!!!!!!!!!!!",comment)

        dispatch(deleteComment(comment.id))
        history.push("/")
    }

    // console.log("THIS IS THE COMMENTID FOR DELETE!!!", comment.id)

    
    return (
        <div>
            <div>
                <h3>DELETE Comment?</h3>
                <div> Are you sure you want to delete this comment?</div>
            </div>
            <div className="delete-comment-button" onClick={onDelete}>Delete</div>
            <div className="cancel-delete-comment-button" onClick={onClick}>Cancel</div>
        </div>
    )
        
}

export default DeleteComment