import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import express from 'express' ; 
import { pool } from '../database/db.js';

const secretOrKey  = process.env.SECRETKEY

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
    algorithms: ['HS256'],
    jsonWebTokenOptions: { 
      maxAge: '365d', // 365 days
      clockTimestamp: Math.floor(Date.now() / 1000),

    },
  };

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id]); 
      const user = rows[0];
    
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }));
  

const app = express() ; 
app.use(passport.initialize()) ; 