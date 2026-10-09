const express = require("express");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true }));
app.set("view-engine", "ejs");

users = [{
    username: "sam",
    password: "123"
}];
let currentUser = "sam";

let posts = [
    {
        author: "Taufique",
        title: "Databases",
        content: "Databases are cool.",
        id: 1
    },
    {
        author: "Sam",
        title: "Servers",
        content: "This class",
        id: 2,
    }
];
let currentPostId = 3;

app.get("/", (req, res) => {
    res.sendFile("index.html");
})

app.get("/login", (req, res) => {
res.sendFile("login.html");
});

app.get("/blog", (req, res) => {
    res.render("blog.ejs", { posts });  
});

app.get("/post/:postID", (req, res) => {
    const postID = req.params.postID;
    let displayPost;
    posts.forEach(post => {
        console.log(post);
        if (post.id == postID) displayPost = post; 
    });
    if (displayPost) res.render("post.ejs", {post: displayPost});
    else res.redirect("/blog");
    
})

app.post("/new-blog-post", (req, res) => {
    let content = req.body["new-post"];
    let author = currentUser;
    /* Assigning ids
        - Use the post title
            - Are the titles unique?
            - Changing title means changing id?
        - Assign a number
            - start at 1 and increment for each post
                - deleted posts cause missing ids
                - easy to guess valid ids and ids of near time posts
                - this gets hard to synchonise across servers
        - Use the post hash as the id (SHA256)
            - A hash acts as a summary of the data
    */
    const id = currentPostId++
    posts.push({author, content, id});
    res.redirect("/blog");
})

// app.get("/", (req, res) => {
//     res.render("index.ejs");
// });

// app.get("/sign-up", (req, res) => {
//     res.render("sign-up.ejs");
// })

// app.post("/sign-up", (req, res) => {
//     let username = req.body.username;
//     console.log(username);
//     users.push({
//         username: req.body.username,
//         email: req.body.email,
//         // Keeping password in plain text is VERY bad (sometimes illegal) practice
//         password: req.body.password
//     });
//     res.redirect("login");
// })

// app.get("/login", (req, res) => {
//     res.render("login.ejs", { loginError: "" });
// })

// app.post("/login", (req, res) => {
//     users.forEach(user => {
//         if (user.username == req.body.username) {
//             console.log(user);
//             if (user.password == req.body.password) {
//                 currentUser = user;
//                 res.redirect("welcome");
//             } else res.render("login.ejs", {loginError: "Incorrect Password"});
//         }
//     });
//     res.render("login.ejs", { loginError: "Username not found" });
//     // let loginError = "Username not found"
// });

// app.get("/welcome", (req, res) => {
//     console.log(`Welcome page current user is: ${currentUser} with the username: ${currentUser.username}`)
//     // { variableInEJS: variableInServer}
//     res.render("welcome.ejs", { username: currentUser.username} );
// })

app.listen(PORT, () => {
    console.log(`${new Date()}: Listening at port ${PORT}`);
});