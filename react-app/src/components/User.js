import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './NavBar';
import "./User.css"
import linked from "./images/linked-in-logo.png"
import git from "./images/github-logo.png"
import defaultImage from "./images/icons8-bird-96.png"

import { getChirps } from "../store/chirps"

function User() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const { userId }  = useParams();
  const dispatch = useDispatch()
  const chirps = useSelector((state) => Object.values(state?.chirps))

  // console.log("THIS IS THE CHIRPS!!!!!!!!!!!", chirps)

  
  const userChirps = chirps.filter(function(chirp) {
    return (chirp.user_id == userId)
  })
  
  // console.log("THIS IS THE USER CHIRPS!!!!!!!!!!!", userChirps)

  useEffect(() => {
    dispatch(getChirps()); // dispatch getBuzzes thunk which calls getBuzzes action



    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }


  return (
    < div className='profile-main-container'>
      <div className='profile-left-container'>
        <NavBar/>
      </div>
      <div className='profile-middle-container'>

        <stong>
          <img src={user.profile_pic} alt="main-pp" className='profile-pic' onError={e => e.currentTarget.src = defaultImage}/>
          {user.username}
        </stong>
        {/* <strong>
          {user.email}
        </strong> */}
        <strong>
          {user.bio}
        </strong>
        <div className='sort'>
          {userChirps.map((ele) => (
            <>
              <div className='user-chirps'>
                <Link to={`/chirps/${ele.id}`} key={ele.id} className='link-to-chirp'>
                  <div className="user-container">
                        {/* <img
                          src={users[ele?.user_id - 1]?.profile_pic}
                          alt=""
                          className="chirp-profile-pic"
                        /> */}
                        {`@${users[ele?.user_id - 1]?.username}`}
                  </div>
                  <div className="buzz-content">{ele.chirp_content}</div>
                  <div>
                        <img src={ele.image_url} className="single-chirp-img" alt=""/>
                  </div>
                </Link>
              </div>
            </>
          ))}
        </div>

      </div>
      <div className='profile-right-container'>
      <div className='bottom-name'>Meet Me: Antony Pizarro</div>
                <div className='HomePage-LinkedIn'>
                    <img alt='social icon' className='HomePage-logos' src={linked} />
                        <a href='https://www.linkedin.com/in/antony-pizarro/'>LinkedIn</a>
                </div>
                <div className='HomePage-GitHub'>
                    <img alt='social icon' className='HomePage-logos' src={git} />
                        <a href='https://github.com/apizarro23'>GitHub</a>
                </div>
      </div>
    </div>
    // <ul>
    //   <li>
    //     <strong>User Id</strong> {userId}
    //   </li>
    //   <li>
    //     <strong>Username</strong> {user.username}
    //   </li>
    //   <li>
    //     <strong>Email</strong> {user.email}
    //   </li>
    //   <li>
    //     <strong>Bio</strong> {user.bio}
    //   </li>
    // </ul>
  );
}
export default User;
