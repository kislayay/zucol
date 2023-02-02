const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
 
const app = express()
 
app.use(bodyParser.urlencoded({
    extended: true
}))
 
mongoose.connect("mongodb://localhost:27017/blogApi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 
const blogSchema = {
    title: String,
    content: String,
}
 
const Blog = mongoose.model("Blog", blogSchema);
 
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blog) => {
        if (err) {
            res.send(err);
        } else {
            res.send(blog);
        }
    })
})
 
app.get('/blogs/:blogTitle', (req, res) => {
    Blog.find({ title: req.params.blogTitle },
    (err, blog) => {
        if (err) {
            res.send(err);
        } else {
            res.send(blog);
        }
    })
})
 
app.post('/blogs', (req, res) => {
    const title = req.body.title
    const content = req.body.content
 
    const blog = new Blog({
        title: title,
        content: content
    })
 
    blog.save(err => {
        if(err) {  res.send(err); }
        else { res.send('blog added!'); }
    });
})
 
app.delete('/blogs', (req, res) => {
    const title = req.body.title
 
    Blog.deleteOne({ title: title }, (err, blog) => {
        if (err) {
            res.send(err);
        } else {
            res.send("blog deleted!");
        }
    })
})
 
app.listen(3000, () => {
    console.log("listening on http://localhost:3500");
})