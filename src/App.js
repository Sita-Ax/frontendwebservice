import "./App.css";
import React, {useState} from "react";
import {BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import Login from "./components/view/Login";
import Register from "./components/view/Register";
import Post from "./components/post/Post";
import PostShow from "./components/post/PostShow";
import UserService from "./components/service/UserService";

function App() {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [login, setLogin] = useState(false);

    const logout = (props) => {
        console.log("loggouuut")
        const data = UserService.logout(props.username, props.token);
        setLogin(false);
        setToken('');
        alert("Logout " + props.username + props.token);
    };

    if (login === false) {
        return (
            <div className="App">
                <BrowserRouter>
                    <header className="App-header" style={{display: "flex", justifyContent: "space-beetween"}}>
                        <NavLink exact activeClassName="active" to="/Register"
                                 style={{display: "flex", borderBottom: "1px solid green"}}>Register
                        </NavLink>
                        <NavLink activeClassName="active" to="/Login" style={{borderBottom: "1px solid green"}}>Login
                        </NavLink>
                        <NavLink activeClassName="active" to="/PostShow" style={{borderBottom: "1px solid green"}}>Show
                            Post
                        </NavLink>
                    </header>
                    <div className="content" style={{marginTop: "250px"}}>
                        <Switch>
                            <Route exact path="/Register" component={() => <Register/>}/>
                            <Route exact path="/Login"
                                   component={() => <Login setToken={setToken} token={token} username={username}
                                                           setUsername={setUsername} login={login}
                                                           setLogin={setLogin}/>}/>
                            <Route exact path="/PostShow"
                                   component={() => <PostShow username={username} setUsername={setUsername}
                                                              login={login} setToken={setToken} token={token}/>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    } else {
        return (
            <div className="App">
                <BrowserRouter>
                    <header className="App-header" style={{display: "flex", justifyContent: "space-beetween"}}>
                        <NavLink activeClassName="active" to="/Login" onClick={logout}
                                 style={{borderBottom: "1px solid green"}}>Logout
                        </NavLink>
                        <NavLink activeClassName="active" to="/PostShow" style={{borderBottom: "1px solid green"}}>Show
                            Post
                        </NavLink>
                        <NavLink activeClassName="active" to="/Post" style={{borderBottom: "1px solid green"}}>Post
                        </NavLink>
                    </header>
                    <div className="content" style={{marginTop: "250px"}}>
                        <Switch>
                            <Route exact path="/Register" component={() => <Register/>}/>
                            <Route exact path="/Login"
                                   component={() => <Login setToken={setToken} token={token} username={username}
                                                           setUsername={setUsername} login={login}
                                                           setLogin={setLogin}/>}/>
                            <Route exact path="/Post"
                                   component={() => <Post setToken={setToken} token={token} username={username}
                                                          login={login}/>} />
                            <Route exact path="/PostShow"
                                   component={() => <PostShow username={username} setUsername={setUsername}
                                                              login={login}
                                                              setToken={setToken} token={token}/>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
