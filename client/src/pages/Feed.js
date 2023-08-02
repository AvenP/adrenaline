import React from "react";

const feed = () => {

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        }
    
      return (
        <form method="post" onSubmit={handleSubmit}>
          <label>
            Feed title: <input name="postTitle" defaultValue="New Post" />
          </label>
          <label>
            Edit your post:
            <textarea
              name="postContent"
              defaultValue="Add Your Post!"
              rows={4}
              cols={40}
            />
          </label>
          <hr />
          <button type="reset">Reset post</button>
          <button type="submit">Save post</button>
        </form>
      );
    }

    export default feed;