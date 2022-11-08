import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {editUser} from "../../../store/session"

const EditUserForm = ({editedUser, onClick}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
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
    }
}

export default EditUserForm


