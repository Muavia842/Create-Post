// import { async } from "@firebase/util";
import { collection, addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({ IsAuth }) {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postCollectionRef = collection(db, 'posts');
  let navigate = useNavigate();

  const createPost1 = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
    });

    navigate('/');
  };
  useEffect(() => {
    if (!IsAuth) {
      navigate('/login');
    }
  });
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost1}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
