
const express = require('express')
const cors = require('cors')
const app = express()
const models = require('./models')
const bcrypt = require('bcrypt') 
const session = require('express-session')
const jwt = require('jsonwebtoken')
const authenticate = require('./authenticateMiddleware')

const SALT_ROUND = 10

app.use(session({
    secret: 'THISSECRETKEY',
    saveUninitialized: true,
    resave: true
}))



// enable cors 
app.use(cors())
// json parser 
app.use(express.json())

app.post('/login', async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    let user = await models.User.findOne({
        where: {
            username: username
        }
    })

    if(user!=null) {
        bcrypt.compare(password, user.password, (error,result) => {
            if(result) {
                if(req.session) {
                    req.session.user = {userId: user.id}
                    req.session.userId = user.id
                    req.session.username = user.username
                }
                res.json({message: 'Logged in!'})
            } else {
                res.json({errorMessage: 'Incorrect Password'})
            }
        })
    } else {
        res.json({errorMessage: 'Username invalid'})
    }
})


app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let persistedUser = await models.User.findOne({
        where: {
            username:username
        }
    })

    if(persistedUser == null) {

        bcrypt.hash(password, SALT_ROUND, async (error, hash) => {
            if(error) {
                res.json({errorMessage:'Error creating user'})
            } else {
                let user = models.User.build({
                    username:username,
                    password:hash
                })

                let savedUser = await user.save()
                if(savedUser != null) {
                    res.json({message: "Account Created"})
                } else {
                    res.json({errorMessage:"Username Already Exists!"})
                }
            }
        })

    } else {
        res.json({errorMessage:"Username Already Exists!"})
    }

})

app.post('/login2', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    models.User.findOne({
        where: {
            username: username
        }
    }).then(user => {

        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result) {
                    // pw is matching
                    // generate JSON Web Token
                    // dont put sensitive data into the token
                    const token = jwt.sign({username: user.username}, 'SECRETKEY')
                    res.json({success:true, token:token})
                } else {
                    res.json({success:false, message:'Not Authenticated!'})
                }
            })

        } else {
            res.json({success:false, message:'Authentication Failed!'})
        }

    })
})

app.post('/register2', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    models.User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if(user) {
           res.json({success: false, message: "Username already exists!"}) 
        }
    }).catch(error => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                models.User.build({
                    username: username,
                    password: hash
                })

                user.save().then(savedUser => {
                    res.json({success: true, message:"User has been saved!"})
                })
            })
        })       
    })
})


app.get("/profile/:username", authenticate, (req, res) => {
    const username = req.params.username
    models.User.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        res.json(user)
        
    })
})


app.post('/profile/:username/edit-email', authenticate, (req, res)  => {
    const username = req.params.username
    const email = req.body.email
    models.User.update({
        email: email,
    },{
        where:{
            username: username,
        }
    }).then(() => {
        res.json({message:"Email Edited"})
    })
})


app.get("/my-books/:username", authenticate, (req, res) => {
    const username = req.params.username
    models.Book.findAll({
        where: [{
            username : username
        }]
    }).then((books) => {
        res.json(books)
    })
})


app.get("/books", (req, res) => {
    models.Book.findAll()
    .then((books) => {
        res.json(books)
    })
})

app.get("/books/:genre", (req, res) => {
    const genre = req.params.genre
    models.Book.findAll({
        where: [{
            genre: genre
        }]
    })
    .then((filteredBooks) => {
        res.json(filteredBooks)
    })
})

app.get("/book/:bookId", (req, res) => {
    const bookId = req.params.bookId
    models.Book.findByPk(bookId)
    .then((book) =>{
        res.json(book)
    })
})

app.post("/add-book", (req, res) => {
    const title = req.body.title
    const genre = req.body.genre
    const publisher = req.body.publisher
    const year = req.body.year
    const imageURL = req.body.imageURL
    const username = req.body.username

    const bookAdded = models.Book.build({
        title:title,
        genre:genre,
        publisher:publisher,
        year:year,
        imageURL:imageURL,
        username: username,
    })
    bookAdded.save().then(() => {
        res.json({message:"Added"})
    })
})

app.get('/edit-book/:bookId', (req, res) => {
    const bookId = req.params.bookId
    models.Book.findByPk(bookId)
    .then((book) =>{
        res.json(book)
    })
})

app.post('/edit-book/:bookId/update', (req, res) => {
    const bookId = req.params.bookId
    const title = req.body.title
    const genre = req.body.genre
    const publisher = req.body.publisher
    const year = req.body.year
    const imageURL = req.body.imageURL
    models.Book.update({
        title:title,
        genre:genre,
        publisher:publisher,
        year:year,
        imageURL:imageURL,
    },{
        where:{
            id:bookId,
        }
    }).then(() => {
        res.json({message:"Book Edited"})
    })
})

app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId
    models.Book.destroy({
        where: {
            id : bookId
        }
    }).then(() => {
        res.json({message:"Deleted"})
    })
})


app.listen(8080, () => {
    console.log('Server is running')
})