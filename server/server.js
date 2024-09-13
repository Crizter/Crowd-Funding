import express, { urlencoded } from 'express' ; 
import 'dotenv/config'
import { connectDB, pool, registerUser } from './database/db.js';
import cors from 'cors' ; 
import passport from 'passport';
import { checkPassword } from './auth/auth.js';
import './auth/passport.js'
import jwt from 'jsonwebtoken';
import projects from './routes/projects.js'
import dashboard from './routes/dashboard.js'
import transactions from './routes/transactions.js'
import comments from './routes/comments.js' 
import users from './routes/users.js'
const app  = express() ; 
const port = process.env.BACKEND_PORT || 3003 ;  
const secretOrKey  = process.env.SECRETKEY
        
// MIDDLEWARES 
const corsOptions = {
  origin : 'https://crowd-funding-client-alpha.vercel.app',
  
  credentials : true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}
  app.use(cors(corsOptions)) ;

// app.use(cors())
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize()) ; 

// CONNECT TO THE DATABASE
connectDB() ; 

// TEST Route
app.get('/' , (req,res) => {  
    res.json('hello') ; 
}) ; 

// GENERATE TOKEN 
const generateToken = (user) => { 
    const payload = {
        id : user.id , 
        email : user.email 
    };
    return jwt.sign(payload,secretOrKey, { expiresIn : '365d'}) ; 
}

// REGISTER 
app.post('/register', async (req,res)=> { 
    const {email, password,name}  = req.body  ; 
    const body = {email,password,name} ; 
    try {
       const result =  await registerUser(body) ; 
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(401).json({message : 'Error registering the user.'})
    }

})
// LOGIN
app.post('/login',  async (req,res) => { 
    const {email, password} = req.body ; 
   
    try {
        const response = await pool.query('SELECT * FROM users WHERE email = ($1)', [email]) ; 
        const user = response.rows[0] ;
        console.log(user.id);
        if(!user) { 
          return  res.status(401).json({message  : 'User not found.'});
        }
        const isMatch = await checkPassword(password, user.password);
        if (isMatch) {
          const token = generateToken(user);
          const userId = user.id ;
          console.log(token);
          
          return res.status(200).json({ token , userId });
        } else {
          return res.status(401).json({ message: 'Invalid password' });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message,  });
      }
    });


  // LOGOUT
  app.delete('/logout',passport.authenticate("jwt", {session:false}), async(req,res,next) => { 
    try {

      res.status(200).json({message:'Logged out successfuly'});
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }) ; 

// PROTECTED ROUTES
    app.use('/projects', projects) ; 
    app.use('/dashboard',  dashboard  ) ; 
    app.use('/transactions',  transactions) ; 
    app.use('/comments', comments ) ; 
    app.use('/users', users) ; 

app.listen(port, () => {
    console.log(`listening on port ${port}`);
 });

 