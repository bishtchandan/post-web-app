import { useState, useRef } from "react";
export default function AddPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleChanged = (e) => {
    setTitle(e.target.value);
  };
  const descriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title: title,
      body: description,
      id: Math.random().toFixed(2).toString(),
    };
    
    if (postData.title !== "") {
      props.onSavePostData(postData);
      titleRef.current.value = "";
      descRef.current.value = "";
    }
  };

  const titleRef = useRef(null);
  const descRef = useRef(null);
  return (
    <div style={{ justifyContent: "center" }}>
      <div
        className="container mt-5 p-4"
        style={{ backgroundColor: "#aaa", borderRadius: ".8rem" }}
      >
        <h3 style={{ textAlign: "center" }}>Add Post</h3>
        <div className="" style={{ width: "70%", margin: "0 auto" }}>
          <form onSubmit={handelSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="titleText"
                aria-describedby="titleHelp"
                name="title"
                ref={titleRef}
                onChange={titleChanged}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                ref={descRef}
                onChange={descriptionChanged}
              ></textarea>
            </div>
            {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
