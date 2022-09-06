import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Redirect, useHistory } from "react-router-dom";
import { createChirp } from "../../store/chirps";

const NewChirpForm = () => {
    const [errors, setErrors] = useState([]);
    const [chirp_content, setChirp_Content] = useState('');
    const [image_url, setImg_Url] = useState('');
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();

    // const createNewChirp = async (e) => {
    //     e.preventDefault();

    //     const data = await dispatch(createChirp(chirp_content, image_url))
    //     if (data) {
    //         setErrors(data)
    //     }
    // }

    useEffect(() => {
        const newErrors = [];
        if (chirp_content?.length > 280) {
            newErrors.push("Character limit of 280 exceeded")
        }
        if (!chirp_content) {
            newErrors.push("Content Required")
        }
        if (newErrors.length) {
            setErrors(newErrors)
        } else {
            setErrors([]);
        }
    }, [chirp_content, image_url])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: user.id,
            chirp_content: chirp_content,
            image_url: image_url
        }
        console.log('USER ID IS!!!!!!!!!!!!!!!!!!', payload.user_id)

        const res = await dispatch(createChirp(payload))
        if (res) {
            history.push('/')
        }
    }

        
    const updateChirpContent = (e) => {
            setChirp_Content(e.target.value)
    }

    const updateImgUrl = (e) => {
        setImg_Url(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor="chirp_content">Chirp Content</label>
                <input
                    name="chirp_content"
                    type="text"
                    placeholder="Chirp"
                    value={chirp_content}
                    onChange={updateChirpContent}
                />
            </div>
            <div>
                <label htmlFor="imgUrl">Image URL</label>
                <input
                    name="imgUrl"
                    type="text"
                    placeholder="Add Image Here"
                    value={image_url}
                    onChange={updateImgUrl}
                />
                <button type="submit">chirpchirp</button>
            </div>

        </form>
    )
}

export default NewChirpForm