const GET_COMMENTS = "comments/GET_COMMENTS"
const CREATE_COMMENT = "commnets/CREATE_COMMENT"
const EDIT_COMMENT = "comments/EDIT_COMMENT"
const DELETE_COMMENT = "comments/DELETE_COMMENT"


// ***ACTIONS***
const getCommentsAction = (comments, chirpId) => ({
    type: GET_COMMENTS,
    comments,
    chirpId
})

const createCommentAction = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const editCommentAction = (comment, chirpId) => ({
    type: EDIT_COMMENT,
    comment,
    chirpId
})

const deleteCommentAction = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})


// ***THUNKS***
// get all comments from a chirpId
export const getComments = (chirpId) => async (dispatch) => {
    const response = await fetch(`/api/chirps/${chirpId}/comments`)

    if(response.ok) {
        const comments = await response.json()
        dispatch(getCommentsAction(comments, chirpId))
        return comments
    }
}

// create a comment
export const createComment = (commentData) => async (dispatch) => {
    const {comment_content, user_id, chirp_id} = commentData
    const response = await fetch(`/api/chirps/${commentData.chirp_id}/comments`, {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            comment_content,
            user_id,
            chirp_id
        })
    })
    // console.log('this is RES!!!!!!!!!!', response)

    if(response.ok) {
        const newComment = await response.json()
        dispatch(createCommentAction(newComment))

        return newComment
    }
}

// edit a comment
export const editComment = (commentData) => async (dispatch) => {
    const { id, comment_content, user_id, chirp_id } = commentData

    const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id,
            comment_content,
            user_id,
            chirp_id
        })
    })

    if(response.ok) {
        const comment = await response.json()
        dispatch(editCommentAction(comment))

        return comment
    }
}

// delete a comment
export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    console.log(response)

    if(response.ok) {
        dispatch(deleteCommentAction(commentId))
    }
}


// ***REDUCER***
const commentReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_COMMENTS: {
            newState = {...state}
            // for (let comment of action.comments) newState[comment.id] = comment
            action.comments.comments.forEach((comment) => {newState[comment.id] = comment});
            return newState
        }
        case CREATE_COMMENT: {
            newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case EDIT_COMMENT: {
            newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case DELETE_COMMENT: {
            newState = {...state}
            delete newState[action.commentId]
            return newState
        }
        default:
            return state
    }
}

export default commentReducer