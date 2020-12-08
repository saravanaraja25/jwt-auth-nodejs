const express = require('express');
const app=express();
const mongoose = require('mongoose');
const authRoute=require("./routes/auth");
const postRoute=require("./routes/post");
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

app.use(express.json())
app.use("/api/users",authRoute)
app.use("/api/posts",postRoute)
app.listen(4000,()=>{
    console.log("Server is Up");
})