import "../Postslist/Postslist.css";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
const Postslist = ({ posts }) => {


  return (
    <div className="post-list-container">
      <h1 className="post-list-title">Posts</h1>
      {posts.map((post) => (
        <div key={post.PostID} className="post-item">
          <Link to={`/Post/${post.PostID}`}>
            <img src={post.Image} alt="Post" className="post-image" />
          </Link>
          <div className="post-details">
            <Link to={`/Post/${post.PostID}`}>
              <h2 className="post-title">{post.Content.slice(0, 10)}</h2>
            </Link>
            <p className="post-metadata">{post.Date.slice(0, 10)}</p>
            <p className="post-metadata">{post.CreatorEmail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Postslist;
