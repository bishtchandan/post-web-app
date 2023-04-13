import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Post from "./component/Post";
import AddPost from "./component/AddPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState("");
  const ref = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  // api call

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Add new post start here

  const PostDataHandler = (newPost) => {
    setPosts((prevPost) => {
      return [newPost, ...prevPost];
    });
  };

  // update a post start here

  const editPost = (editPostId) => {
    ref.current.click();
    setPostId(editPostId);
  };

  const handelSubmit = (e) => {
    const updatedPostList = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, title: title, body: description };
      }
      return post;
    });
    if (title !== "") {
      setPosts(updatedPostList);
    }
    titleRef.current.value = "";
    descRef.current.value = "";
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  // delete post start Here
  const deletePost = (id) => {
    const postListAfterDeletion = posts.filter((post) => post.id !== id);
    console.log(postListAfterDeletion);
    setPosts(postListAfterDeletion);
  };

  return (
    <div>
      <Navbar />
      <AddPost onSavePostData={PostDataHandler} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* edit post start here */}

      <div
        className="modal fade"
        id="exampleModal"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "#aaa" }}>
              <div className="" style={{ width: "78%", margin: "0 auto" }}>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="titleText"
                      aria-describedby="titleHelp"
                      name="title"
                      onChange={updateTitle}
                      ref={titleRef}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      ref={descRef}
                      onChange={updateDescription}
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                onClick={handelSubmit}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {posts.map((post) => (
          <Post
            id={post.id}
            title={post.title}
            description={post.body}
            onEditPost={editPost}
            onDeletePost={deletePost}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
