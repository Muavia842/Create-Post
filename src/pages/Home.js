import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { RiDeleteBinLine } from 'react-icons/ri';
function Home({ IsAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };
  return (
    <div>
      {IsAuth ? (
        <div className="homePage">
          {postLists.map((post) => {
            return (
              <div className="post">
                <div className="postHeader">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    <img
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '300px',
                      }}
                      src={post.author.photo}
                    />
                    <h3>{post.author.name}</h3>
                  </div>
                  <div className="deletePost">
                    {IsAuth &&
                      auth.currentUser &&
                      post.author.id === auth.currentUser.uid && (
                        <button onClick={() => deletePost(post.id)}>
                          <RiDeleteBinLine />
                        </button>
                      )}
                  </div>
                </div>
                <div className="title">
                  <h1>{post.title}</h1>
                </div>
                <div className="postTextContainer">{post.postText}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h2
            style={{
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            Welcome to Create-Post <span>Muavia Haidri</span>
          </h2>
        </div>
      )}
    </div>
  );
}

export default Home;
