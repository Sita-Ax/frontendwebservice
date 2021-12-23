import React, {useState, useEffect} from "react";
import {useHistory, NavLink} from "react-router-dom";
import UserService from "../service/UserService";

const Login = (props) => {
    const [user, setUser] = useState({username: "", password: ""});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const timerId = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timerId);
    }, [loading]);

    const loginUsers = async (user) => {
        const data = await UserService.loginUser(user.username, user.password);
        if (data !== "error") {
            props.setToken(data);
            props.setLogin(true);
            props.setUsername(user.username)
        } else {
            setLoading(true);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!user.username || !user.password) return alert("Nothing here!");
        await loginUsers(user);
        history.push("/Post");
    };

    const changeUserData = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };
    console.log(props.login + " data " + " user " + user.username + " userprops " + props.token + " data " + props.data)

    return (
        <>
            <div className="login">
                <form style={{
                    borderRadius: "10px",
                    width: "flex",
                    backgroundSize: "cover",
                    backgroundColor: "aqua",
                    height: "flex",
                    margin: "auto"
                }} onSubmit={handleLogin}>
                    <h3>{loading ? "Loading..." : "Login here"}</h3>
                    <input type="text" name="username" value={user.username} placeholder="Username"
                           style={{background: "white", width: "flex", borderRadius: "10px", height: "20px"}}
                           onChange={changeUserData} required/>
                    <input type="password" name="password" value={user.password} placeholder="Password"
                           style={{background: "white", width: "flex", borderRadius: "10px", height: "20px"}}
                           onChange={changeUserData} required autoComplete="off"/>
                    <br/>
                    <button type="submit" style={{background: "red", borderRadius: "10px"}}>Login</button>
                    <NavLink to={"/Register"}><p
                        style={{color: "white", paddingBottom: "30px", marginTop: "20px"}}>If
                        you not have an account click here to register!</p></NavLink>
                </form>
            </div>
        </>
    );
};
export default Login;