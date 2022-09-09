import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createComment } from "../store/comments";

const NewCommentForm = () => {
    const [errors, setErrors] = useState([]);
    const [comment_content, setComment_Content] = useState('')
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const chirp = useSelector(state => state?.chirps[chirpId])
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        const newErrors = [];
        if (comment_content?.length > 280) {
            newErrors.push("Character limit of 280 exceeded")
        }
        if (!comment_content) {
            newErrors.push("Content Required")
        }
        if (newErrors.length) {
            setErrors(newErrors)
        } else {
            setErrors([]);
        }
    }, [comment_content])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: user.id,
            comment_content: comment_content,
            chirp_id: chirp.id
        }
        console.log('USER ID IS!!!!!!!!!!!!!!!!!!', payload)

        const res = await dispatch(createComment(payload))
        if (res) {
            history.push(`/chirps/${chirpId}`)
        }
    }

    const updateCommentContent = (e) => {
        setComment_Content(e.target.value);
      };
    
      return (
        <div className="new-comment-form">
        <form onSubmit={handleSubmit}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor="comment_content">CREATE A COMMENT</label>
                <input
                    name="comment_content"
                    type="text"
                    placeholder="Chirp"
                    value={comment_content}
                    onChange={updateCommentContent}
                />
                <button type="submit">Comment</button>
            </div>

        </form>
        </div>
    )
}

export default NewCommentForm