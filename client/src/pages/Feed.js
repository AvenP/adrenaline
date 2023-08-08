// import Link from "react-router-dom";

import Auth from "../utils/auth";

const Feed = () => {
  return (
    <div className="flex-row justify-center justify-space-between-md align-center">
      {Auth.loggedIn() ? <h3>Feed</h3> : <p></p>}
    </div>
  );
};

export default Feed;

//         <form
//           className="flex-row justify-center justify-space-between-md align-center"
//           onSubmit={handleSubmit}
//         >
//           <div className="col-12">
//             <label htmlFor="postTitle">Feed title:</label>
//             <input
//               type="text"
//               className="form-input"
//               name="postTitle"
//               defaultValue="New Post"
//             />
//           </div>

//           <div className="col-12">
//             <label htmlFor="postContent">Edit your post:</label>
//             <textarea
//               name="postContent"
//               defaultValue="Add Your Post!"
//               className="form-input w-100"
//               style={{ lineHeight: "1.5", resize: "vertical" }}
//             />
//           </div>
//           <hr />
//           <button type="reset">Reset post</button>
//           <button type="submit">Save post</button>
//         </form>
