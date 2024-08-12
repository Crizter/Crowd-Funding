import bcrypt from 'bcrypt' ; 

export const hashPassword = async (myPlaintextPassword, salt) => { 
    const hash = await bcrypt.hash(myPlaintextPassword, salt) ; 
    return hash ;    
}

export const checkPassword = async (myPlaintextPassword, hashPassword) => { 
    const isMatch = await bcrypt.compare(myPlaintextPassword,hashPassword) ; 
    return isMatch ; 
}