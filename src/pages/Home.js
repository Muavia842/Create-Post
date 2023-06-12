import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

function Home({ IsAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {IsAuth && post.author.id === auth.currentUser && (
                  <button onClick={() => deletePost(post.id)}>&#128465;</button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>{post.author.name}</h3>
            <iv>
              <img src={post.author.photo} />
            </iv>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
