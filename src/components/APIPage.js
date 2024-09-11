import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Import Bootstrap components

function APIPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  // Fetch posts from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  // Delete a post from the list
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // Open modal for adding a new post
  const handleShowModal = () => setShowModal(true);

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Handle form submit to create a new post
  const handleSubmitPost = (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setPosts([json, ...posts]); // Add the new post to the top of the list
        setNewPost({ title: "", body: "", userId: 1 }); // Clear form inputs
        handleCloseModal(); // Close the modal
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>API Posts</h2>
      
      {/* Button to open modal */}
      <Button className="mb-4" variant="primary" onClick={handleShowModal}>
        Add New Post
      </Button>

      {/* Modal for adding a new post */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitPost}>
            <Form.Group className="mb-3" controlId="formPostTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter post title"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPostBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter post body"
                name="body"
                value={newPost.body}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* List of posts */}
      <ul className="list-group mt-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{post.title}</h5>
              <p>{post.body}</p>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default APIPage;
