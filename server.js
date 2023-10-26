const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./usersSchema');
const productList = require('./productList.json'); 


const SECRET_KEY = 'hahahah';

//connect to the express app
const app = express();


//connect to mongobd
const dbURI = 'mongodb+srv://purnoy:4ijH22EAaEaHUwNo@cluster0.xa4nntp.mongodb.net/user-db?retryWrites=true&w=majority'
mongoose
.connect(dbURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    app.listen(3001, () => {
        console.log('Server connected to port 3001 and MongoDb')
    })
})
.catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB', error)
})


// middleware
app.use(bodyParser.json())
app.use(cors())



//Routes

app.get('/api/products', (req, res) => {
    res.json(productList);
});


// REGISTER
//POST REGISTER
app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully', username, id: newUser._id, role: newUser.role })
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' })
    }
})


//LOGIN

// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body
//         const user = await User.findOne({ username })
//         console.log(user)
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid credentials'})
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password)
//         if(!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid credentials' })
//         }
//         const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
//         res.json({ message: 'Login successful', username: user.username, token: token, expiresIn: 10 })
        
//     } catch (error) {
//         res.status(500).json({ error: 'Error logging in' })
//     }
// })



app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });

        const responseObject = {
            token: token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        };

        res.json({ message: 'Login successful', ...responseObject });
        
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});
