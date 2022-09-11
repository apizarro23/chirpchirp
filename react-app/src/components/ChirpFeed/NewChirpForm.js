import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createChirp } from "../../store/chirps";
import { getComments } from "../../store/comments";
import "./NeChirpForm.css"

const NewChirpForm = () => {
    const [errors, setErrors] = useState([]);
    const [chirp_content, setChirp_Content] = useState('');
    const [image_url, setImg_Url] = useState('');
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    // const comments = useSelector((state) => Object.values(state?.comments))
    // let { chirpId } = useParams()
    // chirpId = Number(chirpId)
    // const chirp = useSelector(state => state?.chirps[chirpId])
    // const commentsByChirp = Object.values(comments).filter(
    //     (comment) => comment?.chirp_id === chirpId)

    // console.log("THIS IS THE CHIRPID IS!!!", )

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
        // console.log('USER ID IS!!!!!!!!!!!!!!!!!!', payload.user_id)

        const res = await dispatch(createChirp(payload))
        if (res) {
            history.push('/')
            // dispatch(getComments(comments))
        }
    }

        
    const updateChirpContent = (e) => {
            setChirp_Content(e.target.value)
    }

    const updateImgUrl = (e) => {
        setImg_Url(e.target.value)
    }

    return (
        <form className="newchirpform" onSubmit={handleSubmit}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor="chirp_content"></label>
                <input
                    name="chirp_content"
                    type="text"
                    placeholder="What's Happening"
                    value={chirp_content}
                    onChange={updateChirpContent}
                />
            </div>
            <div>
                <label htmlFor="imgUrl"></label>
                <input
                    name="imgUrl"
                    type="text"
                    placeholder="Add Image Here (Optional)"
                    value={image_url}
                    onChange={updateImgUrl}
                />
                <button type="submit">chirpchirp</button>
            </div>

        </form>
    )
}

export default NewChirpForm