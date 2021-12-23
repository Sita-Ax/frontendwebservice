import React, {useState, useEffect} from "react";
import "./../../App.css";
import {useHistory} from "react-router-dom";
import PostService from "../service/PostService";

const PostShow = (props) => {
    const like = 0;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [likes, setLikes] = useState(0);
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = React.useState();

    useEffect(() => {
        const timerId = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timerId);
    }, [loading]);


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
        getAllPost();
        getUsers();
        getFavorites();
    }, [])

    async function getUsers() {
        console.log("GET USER")
        await fetch('http://localhost:8080/user/all', {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data)
            });
    }

    const handleNewPost = async (e) => {
        e.preventDefault();
        history.push("/Post")
    }
    const searchPost = async () => {
        const data = await PostService.getPost(props);
        if (data !== "error") {
            await getAllPost(props.info)
        }
    }
    const changeData = (e, post) => {
        setSearch({...post, [e.target.name]: e.target.value});
    };

    const createFavorites = async (post) => {
        const data = await PostService.addFavorites(post.title);
        setFavorites(data);
        await getFavorites();
        alert("This post is your favorite Title:" + post.title + " Content: " + post.content + " Made by: " + props.username);
        alert("No post inside!");
        setLoading(true);
    }

    const getFavorites = async (props) => {
        const data = await PostService.getFavorites(props);
        setFavorites(data);
        alert("Your favorites: " + posts.title);
        setLoading(true);
    }

    const getLikes = () => {
        console.log('Get likes! ')
        posts.likes++;
    }

    return (
        <>
            <div className="searchPost">
                <form onSubmit={searchPost}><input type="text" onChange={changeData}
                                                   style={{width: "flex", borderRadius: "30px", height: "flex"}}/>
                    <input type="button" value="Search"
                           style={{background: "red", width: "flex", borderRadius: "30px", height: "flex"}}/></form>
            </div>
            <div className="getAllPost" style={{padding: '80px', background: 'yellow'}}>
                <h1>Look on all posts!</h1>
                <form className="formShow" style={{color: "red", size: '100%'}}>
                    <ul>
                        {posts.map((post, index) =>
                            (<li key={index}>
                                    <div>Made by: {post.username}</div>
                                    Title: {post.title} | Content: {post.content} | Category: {post.category}
                                </li>
                            )
                        )}
                    </ul>
                </form>
            </div>
            <form className="handle" style={{height: '100%', background: 'blue'}}>
                <h2>Users!</h2>
                <div>
                    <ul>
                        {users.map((user, index) =>
                            (<li key={index} getUsers={getUsers}>
                                    <div>Username: {user.username}</div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <h2>Favorites!</h2>
                <div>
                    <ul>
                        {favorites.map((favorite, i) =>
                            (<li key={i} getFavorites={getFavorites}>
                                    <div>Favorites: {favorites}</div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div>Likes: {likes}
                    <button style={{size: "flex", background: "hotpink", borderRadius: "20px"}}
                            onClick={getLikes}>Likes
                    </button>
                    <button style={{background: "#33CCFF", borderRadius: "10px"}} onClick={handleNewPost}>Create new
                        posts
                        here!
                    </button>
                </div>
            </form>
        </>
    );
};

export default PostShow;