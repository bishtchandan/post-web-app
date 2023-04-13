import { AiFillHeart } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

export default function Post(props) {
  const [isClicked, setIsClicked] = useState(false);
  const editPost = () => {
    props.onEditPost(props.id);
  };

  const deletePost = () =>{
    props.onDeletePost(props.id);
  }

  const favouritePost = ()=>{
    if(isClicked === false){
      setIsClicked(true);
    }
    if(isClicked === true ){
      setIsClicked(false);
    }
  }

  return (
    <div className="shadow card col-md-4 my-3 ms-4" style={{ width: "18rem" }}>
      <div className="card-body">
        <div
          className="icon"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2>{props.id}</h2>
          <div className="d-flex">
            <h4 className="mx-1">
              <AiFillHeart
                style={{ height: "1.5rem", width: "1.5rem", color: isClicked?"red":"#aaa" }}
                onClick={favouritePost}
              />
            </h4>
            <h4 className="mx-1">
              <FaPencilAlt
                onClick={editPost}
                style={{ height: "1.2rem", width: "1.2rem", color: "blue" }}
              />
            </h4>

            <h4 className="mx-1">
              <AiFillDelete onClick={deletePost}
                style={{ height: "1.5rem", width: "1.5rem", color: "blue" }}
              />
            </h4>
          </div>
        </div>
        <img src={require('../images/tech.webp')} className="img-thumbnail" style={{border:"none", borderRadius:".8rem"}} alt="loading..."></img>
        <h5 className="card-title">{props.title}</h5>
        
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
}
