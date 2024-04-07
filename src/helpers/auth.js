import jwt from 'jsonwebtoken';

export const generateToken= async (userData, time) => {
  try {
    const token=  jwt.sign(
      userData,
      process.env.JWT_SECRET, 
      {
        expiresIn: time || "1d"
      }
    )
    return token
  } catch (error) {
    console.log(error)
  }
}

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get(process.env.COOKIES_NAME)?.value || '';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken._id;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const isPasswordSafe = (password) => {
  // Check if the password is 8 characters long
  if (password.length < 8) {
      return false;
  }

  // Check if the password contains at least one uppercase letter, one lowercase letter, one symbol, and one number
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const symbolRegex = /[^A-Za-z0-9]/; // Match any character that is not alphanumeric
  const numberRegex = /\d/; // Match any digit

  if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !symbolRegex.test(password) || !numberRegex.test(password)) {
      return false;
  }

  // If all criteria are met, return true
  return true;
}
