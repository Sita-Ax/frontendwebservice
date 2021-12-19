const url = "http://localhost:8080/user";
const UserService = {
    registerUser: async (user) => {
        try {
            const res = await fetch(url + "/register", {
                method: "PUT",
                responseType: "text",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                }),
            });
            const data = await res.text();
            console.log(data + " register -> Userservice" + data.toString());
            return data;
        } catch (error) {
            return {error: error};
        }
    },
    loginUser: async (credentials) => {
        try {
            const res = await fetch(url + "/login", {
                method: "POST",
                responseType: "text",
                headers: {
                    "Content-Type": "application/json",
                    username: credentials.username,
                    password: credentials.password,
                },
            });
            // if(res.status === 200){
            //     login(true)
            //     return await res.text();
            // }else {
            //     login(false);
            //     return alert("Wrong")
            // }
            const data = await res.text();
            console.log(data.toString() + " authenticated -> userservice");
            return data === "" ? "error" : data;
        } catch (error) {
            return {error: error};
        }
    },
    logout: async (token) => {
        try {
            const res = await fetch(url + "/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access": "application/json",
                    "token": token
                },
            });
            if (res.status === 200) {
                console.log(" logout -> userservice");
                return await res.text();
            } else {
                return {
                    data: false,
                };
            }
        } catch (error) {
            return {error: error};
        }
    },
};

export default UserService;