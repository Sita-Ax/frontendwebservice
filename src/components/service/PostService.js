const url = "http://localhost:8080/post";
const PostService = {
        createPost: async (token, id, title, content, username, category) => {
            const res = await fetch(url + "/create", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({
                    id: title,
                    title: title,
                    content: content,
                    username: username,
                    category: category,
                })
            })
            if (res.status === 200) {
                return alert("Creates went well!")
            }
            if (res.status === 409) {
                return alert("There is already another post with that title or text.")
            } else
                return alert("Something went horrible wrong" + category)
        },
        addFavorites: async (props) => {
            const res = await fetch(url + "/add-favorite", {
                method: "PUT",
                body: JSON.stringify({title: props.title}),
                headers: {
                    "Content-Type": "application/json",
                    token: "token"
                },
            });
            if (res.status === 200) {
                return alert("Yes your favo,,")
            }
            if (res.status === 409) {
                return alert("It is already your favo")
            } else {
                return alert("Wrong favo ")
            }
        },
        getPost: async (post) => {
            const res = await fetch(url + "/info{title}", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: "token"
                },
                body: JSON.stringify(post)
            });
            if (res.status === 200) {
                const data = await res.text();
                console.log(data.toString() + " get single postservice ");
                return data;
            } else {
                return {message: {msgError: true}};
            }
        },
        getFavorites: async (props) => {
            const res = await fetch(url + "/favorites", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: "token"
                },
            }).then(res => res.json())
                .then(data => {
                    console.log(data.toString() + " postService 93 -> userservice");
                    return data;
                });
        },
        updatePost: async (token, title) => {
            // eslint-disable-next-line no-template-curly-in-string
            const res = await fetch(url + "/update/" + title, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            }).then(res => res.json())
            if (res.status === 200) {
                return alert("Update looks good! ")
            } else
                return alert("Something went wrong")

        },
    }
;

export default PostService;
