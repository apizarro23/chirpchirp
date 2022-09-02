const GET_CHIRPS = 'chirps/GET_CHIRPS'
const CREATE_CHIRP = 'chirps/CREATE_CHIRP'
const EDIT_CHIRP = 'chirps/EDIT_CHIRP'
const DELETE_CHIRP = 'chirps/DELETE_CHIRP'


// ***ACTIONS***
const getChirpsAction = (chirps) => ({
    type: GET_CHIRPS,
    chirps
})

const createChirpAction = (newChirp) => ({
    type: CREATE_CHIRP,
    newChirp
})

const editChirpAction = (chirp) => ({
    type: EDIT_CHIRP,
    chirp
})

const deleteChirpAction = (chirpId) => ({
    type: DELETE_CHIRP,
    chirpId
})


// ***THUNKS***
//get all chirps
export const getChirps = () => async (dispatch) => {
    const response = await fetch("/api/chirps")

    if (response.ok) {
        const chirps = await response.json()
        dispatch(getChirpsAction(chirps))

        return chirps
    }
}

//create a chirp
export const createChirp = (chirpData) => async (dispatch) => {
    const {chirp_content, image_url} = chirpData
    const response = await fetch("/api/chirps", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chirp_content,
            image_url
        })
    })

    if(response.ok) {
        const newChirp = await response.json()
        dispatch(createChirpAction(newChirp))

        return newChirp
    }
}

//edit a chirp
export const editChirp = (chirpData) => async (dispatch) => {
    const {id, chirp_content, image_url} = chirpData
    const response = await fetch(`/api/chirps/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chirp_content,
            image_url
        })
    })

    if (response.ok) {
        const chirp = await response.json()
        dispatch(editChirpAction(chirp))

        return chirp
    }
}

//delete a chirp
export const deleteChirp = (id) => async (dispatch) => {
    const response = await fetch(`/api/chirps/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const chirp = await response.json()
        dispatch(deleteChirpAction(id))
        return chirp
    }
}


// ***REDUCER***
const chirpReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_CHIRPS: {
            newState = {...state}
            for (let chirp of action.chirps) newState[chirp.id] = chirp
            return newState
        }
        case CREATE_CHIRP: {
            newState = {...state}
            newState[action.chirp.id] = action.newChirp
            return newState
        }
        case EDIT_CHIRP: {
            newState = {...state}
            newState[action.chirp.id] = action.chirp
            return newState
        }
        case DELETE_CHIRP: {
            newState = {...state}
            delete newState[action.chirpId]
            return newState
        }
        default:
            return state
    }
}

export default chirpReducer