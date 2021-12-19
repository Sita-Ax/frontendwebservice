import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PostService from "../service/PostService";
import {render} from "@testing-library/react";

const Post = (props) => {
    const [post, setPost] = useState({id: "", title: "", content: "", category: "", props});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const timerId = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timerId);
    }, [loading]);

    console.log(props.token)
    const changePostInfo = (e) => {
        console.log("Post 21 ")
        setPost({...post, [e.target.name]: e.target.value});
    };

    const createNewPost = () => {
        if (props.data === true) {
            if (post.title === "" || post.content === "" || post.category === "") {
                alert("you need to insert something in title or text!")
            } else
                PostService.createPost(props.token, post.id, post.title, post.content, props.username, post.category).then(res => res.valueOf())
        }
        console.log(props.data + " Post create 31 " + props.token + props.username + post.title + post.content + post.category)
    };

    async function getAllPost() {
        console.log("GETALL")
        await fetch('http://localhost:8080/post/all', {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data)
            });
    }

    useEffect(() => {
        getAllPost()
    }, [post.title]);

    const handlePost = (e) => {
        console.log("Post 90 " + post.title)
        e.preventDefault();
        if (!post.title || !post.content || !props.username || !post.category) return;
        const newP = PostService.createPost(props.token, post.id, post.title, post.content, props.username, post.category)
        alert("Created a post. " + post.id + " Title: " + post.title + " Category: " + post.category + " Content: " + post.content + " By: " + props.username);
        getAllPost();
        console.log(newP + " new " + post)
    };

    const updatePostHandler = async () => {
        const data = await PostService.updatePost(props.token, post.title, post.content, post.category);
        alert(" Update " + post.title)
    }

    const handleShow = async (e) => {
        e.preventDefault();
        await getAllPost();
        console.log("Show " + post.title)
        history.push("/PostShow");
    };

    if (props.login === false) {
        console.log("Post 122 ")
        return (
            <div>
                <div>
                    <ul>
                        {post.map((posts, index) => {
                            return (<li key={index} >
                                <div>By: {posts.username}</div>
                                Title: {posts.title} <br/> Description: {posts.content}
                            </li>);
                        })}
                    </ul>
                </div>
            </div>
        )
    } else {
        console.log(props.token + " Post 139 " + props.post + " user: " + props.user + " username " + props.username)
        return (
            <div className="post" style={{
                width: "flex",
                backgroundSize: "auto",
                height: "flex",
                color: "green",
            }}>
                <ul>{posts.map((post, index) => {
                    return (
                        <li key={index}><strong>Title:</strong> {post.title} | <strong>Content:</strong> {post.content} | <strong>Category:</strong> {post.category} |
                            <strong>Username:</strong> {props.username}  <button onClick={() => {
                                fetch('http://localhost:8080/post/delete/' + post.title, {
                                    method: 'DELETE',
                                    headers:{
                                        "Content-Type":"application/json",
                                        "token": props.token,
                                        "username": props.username
                                    }

                                }).then(response => {
                                    getAllPost();
                                });
                            }} style={{background: "#33CCFF", borderRadius: "10px"}}>Delete</button></li>
                    )
                })}</ul>
                {/*<h2>Category: {posts.category} </h2><h2>Title: {posts.title} </h2><h2> Content: {posts.content}</h2>*/}
                <h3>Welcome {props.username} !</h3>
                <form onSubmit={handlePost} style={{
                    borderRadius: "10px",
                    width: "flex",
                    backgroundSize: "100%",
                    backgroundColor: "aqua",
                    height: "flex"
                }}>
                    <h3>{loading ? " Loading... " : " Create post here! "}</h3>
                    <div>
                        <label>Title: </label>
                        <input type="text" name="title" required value={post.title} placeholder="Title"
                               style={{background: "white", width: "flex", borderRadius: "10px", height: "20px"}}
                               onChange={changePostInfo}/>
                        <br/> <br/>
                        <label>Content: </label>
                        <textarea name="content" type="text" required value={post.content} placeholder="Content"
                                  style={{background: "white", width: "flex", borderRadius: "10px", height: "flex"}}
                                  onChange={changePostInfo}/>
                        <br/> <br/>
                        <label>Category: </label>
                        <input name="category" type="text" required value={post.category} placeholder="Category"
                               style={{background: "white", width: "flex", borderRadius: "10px", height: "20px"}}
                               onChange={changePostInfo}/>
                        <br/> <br/>
                        < div className="lableForm" style={{width: "flex", direction: "left"}}>
                            <label>Made by: <h4>{props.username}</h4></label>
                            <label>Title: <h4>{post.title}</h4></label>
                            <label>Content: <h4>{post.content}</h4></label>
                            <label>Category: <h4>{post.category}</h4></label>
                            {/*<label>Hole post: {post}</label>*/}
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" style={{background: "#33CCFF", borderRadius: "10px"}}
                                onClick={createNewPost}>Create
                        </button>
                        <button type="submit" style={{background: "#33CCFF", borderRadius: "10px"}}
                                onClick={updatePostHandler}>Update
                        </button>
                    </div>
                </form>
            </div>)
        if (posts === null) {
            render(<h2>Loading posts...</h2>)
        }
        return (
            <ul className="postListing">
                {posts.map((post, index) => {
                    return (<li key={index}>
                        By: {post.username} |
                        Title: {post.title} | Content: {post.content}
                    </li>);
                })}
            </ul>
        );
    }

};

export default Post;

