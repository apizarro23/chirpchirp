import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from "../../../../store/session"

const EditUserForm = ({user, onClick}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const [ username, setUsername] = useState(state => state.session.user.username)
    const [ password, setPassword] = useState(state => state.session.user.password)
    const [ profile_pic, setProfile_pic] = useState(state => state.session.user.profile_pic)
    const [ bio, setBio] = useState(state => state.session.user.bio)
    const [ email, setEmail] = useState(state => state.session.user.email)
    // username, password, profile_pic, bio, email

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            username,
            password,
            profile_pic,
            bio,
            email
        }

        await dispatch(editUser(payload, user.id))

        onClick()
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const updateProfilePic = (e) => {
        setProfile_pic(e.target.value)
    }

    const updateBio = (e) => {
        setBio(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className="form-container">
            <div className="edit-user-form">
                <h1>Edit User Below</h1>
                <form onSubmit={handleSubmit} className="form">

                    <div className="form-username">
                    <label>Username</label>
                    <input 
                        name="username"
                        className='username-input'
                        value={username}
                        onChange={updateUsername}
                    />
                    </div>

                    <div className="form-password">
                    <label>Password</label>
                    <input 
                        name="password"
                        className='password-input'
                        value={password}
                        onChange={updatePassword}
                    />
                    </div>

                    <div className="form-profile-pic">
                    <label>Profile Pic</label>
                    <input 
                        name="profile-pic"
                        className='profile-pic-input'
                        value={profile_pic}
                        onChange={updateProfilePic}
                    />
                    </div>

                    <div className="form-bio">
                    <label>Bio</label>
                    <input 
                        name="bio"
                        className='bio-input'
                        value={bio}
                        onChange={updateBio}
                    />
                    </div>

                    <div className="form-email">
                    <label>Email</label>
                    <input 
                        name="email"
                        className='email-input'
                        value={email}
                        onChange={updateEmail}
                    />
                    </div>

                    <div className="submit-button">
                        <button
                            type="submit"
                            className='submit-button'
                        >
                            Save User Changes
                        </button>
                    </div>

                    <div>
                        <button>
                            <div className="cancel-button" onClick={onClick}>Cancel Changes</div>
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default EditUserForm


