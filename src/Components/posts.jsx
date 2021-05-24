import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory,
  } from "react-router-dom";
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([])
    

    useEffect(() => {
        axios.get('http://localhost:8085/api/posts/')
        .then(res => {
            console.log(res.data)
            setPosts(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div className = "header">
                        <h2>Recent Posts:</h2>
                        <h4>
                        <Link to="/createpost">Create a post</Link>
                        </h4>
                    </div>
                    {posts.map(post => (
                    <div className="cardview">
                        <h2>
                            <Link to={String(post.id_post)}>{post.title}</Link>
                        </h2>
                        <p>{post.content}</p>
                    </div>
                    ))}
                </Route>
                <Route exact path="/createpost">
                    <CreatePost/>
                </Route>
                <Route path="/:id">
                    <PostComments/>
                </Route>
            </Switch>
            
            {/* </div> */}
        </Router>
    )
}

const CreatePost = () => {
    const thisToken = localStorage.getItem('token')
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [idUser, setIdUser] = useState("")

    const history = useHistory()

    const refreshPage = () => {
        history.push("/")
    }

    const create = async () => {
        const { data } = await axios.post(`http://localhost:8085/api/posts/`, {
          title: title,
          content: content,
          idUser: idUser,
        }, {
            headers: {
              'Authorization': `Bearer ${thisToken}`
            }
        });
        console.log(data)
        refreshPage()
    };

    return(
        <div>
          <div className="header">
          <h2>Create User</h2>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br/>
          <input
            type="text"
            placeholder="Content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <br/>
          <input
            type="text"
            placeholder="ID User"
            onChange={(e) => {
              setIdUser(e.target.value);
            }}
          />
          <button onClick={create}> Create Post </button>
          <div className = "header">
            <h4><a href="/">Back to home.</a></h4>
        </div>
          </div>
        </div>
    )
}

const PostComments = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8085/api/comments/post/${id}`)
        .then(res => {
            console.log(res.data)
            setComments(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Router>
            <div>
            {comments.length ? comments.map(post => (
            <div className="cardview">
                <p>{post.comment}</p>
            </div>
        )) : <div className ="header"><h4>No comments yet.</h4></div>}
        {/* {comments.map(post => (
            <div className="cardview">
                <p>{post.comment}</p>
            </div>
        ))} */}
        <div className = "header">
            <h4><a href={"/"}>Back to home.</a></h4>
        </div>
        <h4>
                <Link to = {"/comment"}>
                    Add a Comment
                </Link>
            </h4>
            
            <Switch>
                <Route exact path={"/comment"}>
                    <AddComment postid = {id}/>
                </Route>
            </Switch>
        </div>
        </Router>
        
    )
}

const AddComment = (props) => {
    const id = props.postid
    const thisToken = localStorage.getItem('token')
    const [comment, setComment] = useState("")
    // const [idPost, setIdPost] = useState("")
    const [idUser, setIdUser] = useState("")

    const create = async () => {
        // await setIdPost(id)
        const { data } = axios.post(`http://localhost:8085/api/comments/`, {
          comment: comment,
          idPost: id,
          idUser: idUser,
        }, {
            headers: {
              'Authorization': `Bearer ${thisToken}`
            }
        });
        console.log(id)
    };
    return(
    <div>
          <div className="header">
          <h2>Add a Comment</h2>
          <input
            type="text"
            placeholder="Comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <br/>
          {/* <input
            type="text"
            placeholder="IdPost"
            onChange={(e) => {
              setIdPost(e.target.value);
            }}
          />
          <br/> */}
          <input
            type="text"
            placeholder="IdUser"
            onChange={(e) => {
              setIdUser(e.target.value);
            }}
          />
          <button onClick={create}> Create Post </button>
          </div>
        </div>
    )
}

export default Posts