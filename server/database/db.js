import pg  from "pg";
import 'dotenv/config'
import { hashPassword } from "../auth/auth.js";
const {Pool} = pg ; 


export const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
  });
   
export const connectDB = async () => { 
    try {
        await pool.connect() ; 
        console.log('Database connected successfully');
    } catch (error) {
        throw error.message ; 
    }
}


// STORE USER INFO 
export const registerUser = async (body) => {
    const { email, password } = body;
  
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]) ; 
        if(result.rows.length > 0){
            return {status : 401 , message : 'User already exists'} ;
        }
    
      const hashedPassword = await hashPassword(password, 10); 
      await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
      return {status : 200 , message : 'User registered successfully.'}
    } catch (error) {
      cconsole.log('IN register function:', error.message);
      return { status: 500, message: 'Server error' };
    }
  }

// GET TOTAL DONATIONS 
export const dashBoardFields = async (userId) => { 
  if (!userId) { 
    return { status: 401, message: 'No user found' };
  }

  try {
    const result = await pool.query(`
      SELECT 
        SUM(amount_raised) AS total_sum,
        AVG(amount_raised) AS total_avg
      FROM 
        projects
      WHERE 
        creator_id = $1
    `, [userId]);

    const totalDonation = result.rows[0].total_sum;
    const averageDonation = result.rows[0].total_avg;
     
    console.log(totalDonation,averageDonation);
      
    if (totalDonation === null || averageDonation === null) {
      return { status: 401, message: 'No data.' };
    }

    const body = { totalDonation, averageDonation };
    return body;  
  } catch (error) {
    return { status: 500, message: 'Server error.' };
  }
}
