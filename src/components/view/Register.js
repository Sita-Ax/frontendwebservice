import React, {useState, useEffect} from "react";
import {useHistory, NavLink} from "react-router-dom";
import UserService from "../service/UserService";

const Register = () => {
    const [user, setUser] = useState({username: "", password: "", repassword: "",});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("Invalid information, check your input!");
    const history = useHistory();

    useEffect(() => {
        const timerId = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timerId);
    }, [loading]);

    const changeUserData = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const registerUser = async (e) => {
        e.preventDefault();
        const data = await UserService.registerUser(user);
        if (data !== "error") {
            if (user.username === user.password === user.repassword) {
                setUser(user + data, true);
            }
            history.push("/Login");
        } else {
            alert(error)
            setError(error);
            setLoading(true);
        }
    };

    return (
        <div className="register">
            <form style={{
                borderRadius: "10px", width: "flex", backgroundSize: "cover", backgroundColor: "aqua",
                height: "flex", margin: "auto"
            }} onSubmit={registerUser}>
                <h3>{loading ? "Loading..." : "Register an account here"}</h3>
                <input type="text" name="username" value={user.username || ""} placeholder="Username"
                       style={{background: "white", width: "flex", borderRadius: "10px", height: "20px"}}
                       onChange={changeUserData} required/>
                <input type="password" name="password" value={user.password || ""} placeholder="Password"
                       style={{background: "white", width: "flex", borderRadius: "10px", height: "20px"}}
                       onChange={changeUserData} required autoComplete="off"/>
                <input type="password" name="repassword" value={user.repassword || ""} placeholder="Re-enter Password"
                       style={{background: "white", width: "flex", borderRadius: "10px", height: "20px"}}
                       onChange={changeUserData} required autoComplete="off"/>
                <br/>
                <button type="submit"
                        style={{background: "red", width: "flex", borderRadius: "10px", height: "25px"}}>Register
                </button>
                <NavLink to={"/Login"}><p style={{color: "white", paddingBottom: "30px", marginTop: "20px"}}>If you
                    already have an account click here!</p></NavLink>
            </form>
        </div>
    );
};

export default Register;