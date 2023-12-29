import { useState } from "react";
import "../CreatePost/Createpost.css";
import ImageUploader from "../../Componenet/Image/image";

const Createpost = () => {
  const [text, setText] = useState("");
  const [valid, setValid] = useState("True");
  const [errorMessage, setErrorMessage] = useState("");
  const [articleId, setArticleId] = useState("");
  const [image64, setimage64] = useState(null);
  const [date, setDate] = useState(
    new Date().toJSON().slice(0, 10) + " " + new Date().toJSON().slice(11, 19)
  );

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= 1000) {
      setText(newText);
      setErrorMessage("");
    } else {
      setErrorMessage("Text content cannot exceed 1000 characters.");
    }
  };
  const handleArticleIdChange = (e) => {
    setArticleId(e.target.value);
  };
  
  const handleSave = async () => {

    let parsedInt = parseFloat(articleId, 10);

    if (!(!isNaN(parsedInt) && parsedInt % 1 === 0)){
      alert("ID must be an integer");
      return;
    }

    try{

    const post = await fetch('http://localhost:3000/post/create',{
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({
        PostID : parseInt(articleId),
        Content : text,
        DateTime : date,
        Email : localStorage.getItem("Email"),
        Img : image64,
      })
    })
    if(!post.ok) {
      throw new Error(`HTTP error! Status: ${post.status}`);
    }
    else{
      alert("Post created")
    }

  } catch (error) {
    console.error(error);
    alert("Post not created")
  }
    
  };

  return (
    <>
      {localStorage.getItem("Role") === "Creator" ? (
        <div className="article-editor">
          <h2>Create Post</h2>
          <div className="form-group">
            <label htmlFor="textArea">
              Text Content (max 1000 characters):
            </label>
            <textarea
              id="textArea"
              value={text}
              onChange={handleTextChange}
              className="text-area"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="articleIdInput">Article ID:</label>
            <input
              type="text"
              id="articleIdInput"
              value={articleId}
              onChange={handleArticleIdChange}
              className="article-id-input"
            />
          </div>

          <ImageUploader
            setvalid={setValid}
            setimage={setimage64}
            classN="LoginSignupText"
            divClass="EnterText"
          />
          <div className="form-group">
            <button onClick={handleSave} className="save-button">
              Save Article
            </button>
          </div>
        </div>
      ) : (
        <p>You cant post</p>
      )}
    </>
  );
};

export default Createpost;
