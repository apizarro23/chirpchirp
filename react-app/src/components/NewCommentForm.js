import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createComment } from "../store/comments";
import "./NewCommentForm.css"

const NewCommentForm = () => {
    const [errors, setErrors] = useState([]);
    const [comment_content, setComment_Content] = useState('')
    let { chirpId } = useParams()
    chirpId = Number(chirpId)
    const chirp = useSelector(state => state?.chirps[chirpId])
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!comment_content) {
            setErrors(["Comment is required!"]);
            return;
          }
      
          if (comment_content && comment_content.trim().length === 0) {
            setErrors(["Comment is required!"]);
            return;
          }
      
          if (comment_content.length > 280) {
            setErrors(["Comment length of 280 characters exceeded!"]);
            return;
          }
      
          if (comment_content.length < 4) {
            setErrors(["Comment must be more than 4 characters!"]);
            return;
          }

        const payload = {
            user_id: user.id,
            comment_content: comment_content,
            chirp_id: chirp.id
        }
        // console.log('USER ID IS!!!!!!!!!!!!!!!!!!', payload)

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
            <div className="errors">
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className="comment-form">
                <label htmlFor="comment_content"></label>
                <input
                    name="comment_content"
                    type="text"
                    placeholder="Leave a Comment"
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