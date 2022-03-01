
const express = require('express')
const cors = require('cors')
const app = express()
const models = require('./models')
const bcrypt = require('bcrypt') 
const session = require('express-session')

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





app.get("/my-books/:username", (req, res) => {
    const username = req.params.username
    models.Book.findAll({
        where: {
            username:username
        }
    }).then((books) => {
        console.log(books)
        res.json(books)
    })
})





app.get("/books", (req, res) => {
    models.Book.findAll()
    .then((books) => {
        res.json(books)
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