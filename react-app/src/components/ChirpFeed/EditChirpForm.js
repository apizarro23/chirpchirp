import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getChirps, editChirp } from "../../store/chirps";
import { Modal } from "../context/Modal"

const EditChirpForm = ({ id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const chirp = useSelector(state => state.chirps)
    const [chirp_content, setChirp_Content] = useState(chirp?.chirp_content)
    const [image_url, setImage_Url] = useState(chirp?.image_url)
    const user = useSelector(state => state.session.user)


}

export default EditChirpForm