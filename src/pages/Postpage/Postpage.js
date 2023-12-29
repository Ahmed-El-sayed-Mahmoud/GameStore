import '../Postpage/Postpage.css';
const Postpage = ({id,posts}) => {

    const post = posts.find((post) => post.PostID === id);

  return (
    <div className="post-page-container">
      <img src={post.Image} className="post-image" />
      <h2 className="post-title">{post.Content.slice(0,10)}</h2>
      <p className="post-metadata">{post.Date.slice(0,10)}</p>
      <p className="post-metadata">{post.CreatorEmail}</p>
      <p className="post-content">{post.Content}</p>
    </div>
  );
}

export default Postpage