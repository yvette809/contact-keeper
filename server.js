const express = require ("express");
const dotenv = require("dotenv")
const cors = require ("cors")
const mongoose = require("mongoose")
const usersRouter = require("./routes/users.js")
const contactRouter = require("./routes/contacts.js")
const authRouter = require("./routes/auth.js")
const connectDB = require('./config/db')
const path = require ("path")
// connect Database
//connectDB()

const server = express()
dotenv.config()
server.use(cors())
server.use(express.json())

// define our routes
server.use("/api/users", usersRouter)
server.use("/api/contacts", contactRouter)
server.use("/api/auth", authRouter)

// serve static assets in production
if(process.env.NODE_ENV ==='production'){
    // set static folder
    server.use(express.static('client/build'));

    server.get('*', (req,res)=> res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
         
    )
}


const port = process.env.PORT || 5001

mongoose.connect("mongodb+srv://evebabe:ub021299@cluster0.4bc5f.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(
    server.listen(port, () =>{
        console.log(`something is runnning on port ${port}`)
    })
)
.catch(error => console.log(error)

)

// server.listen (port, ()=> {
//     console.log(`server started on port ${port}`)
// })

