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


    // useEffect(() => {
    //     const errors = [];
    //     const imgRegex = new RegExp(
    //       /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
    //     );
    //     if (image_url && !imgRegex.test(image_url)) {
    //       errors.push(
    //         "Invalid Image Url! URL must contain a .png, .jpg, .jpeg, .gif, .png or .svg!"
    //       );
    //     }
    //     setErrors(errors);
    //   }, [image_url]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const imgRegex = new RegExp(
          /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
        );
        if (image_url && !imgRegex.test(image_url)) {
          setErrors([
            "Invalid Image Url! URL must contain a .png, .jpg, .jpeg, .gif, .png or .svg!",
          ]);
          return;
        }

        if (!chirp_content) {
            setErrors(["Chirp is required!"]);
            return;
          }
          if (chirp_content && chirp_content.trim().length === 0) {
            setErrors(["Chirp is required!"]);
            return;
          }
      
          if (chirp_content.length > 280) {
            setErrors(["Chirp length of 280 characters exceeded!"]);
            return;
          }

        const payload = {
            user_id: user.id,
            chirp_content: chirp_content,
            image_url: image_url
        }
        // console.log('USER ID IS!!!!!!!!!!!!!!!!!!', payload.user_id)

        const res = await dispatch(createChirp(payload))
        if (res) {
            setChirp_Content("")
            setImg_Url("")
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
            <div className="new-chirp-errors">
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor="chirp_content"></label>
                <input
                    className="chirp-content-input"
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
                    className="image-url-input"
                    name="imgUrl"
                    type="text"
                    placeholder="Add Image Here (Optional)"
                    value={image_url}
                    onChange={updateImgUrl}
                />
            </div>
            {/* <div>
                <input type="submit" value="chirpchirp" onClick="submitForm()" />
            </div> */}
            <button type="submit">chirpchirp</button>

        </form>
    )
}

export default NewChirpForm