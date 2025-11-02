import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import the User model to fetch user details

// Define the middleware function
const protect = async (req, res, next) => {
    let token;

    // 1. Check for the token in the Authorization header
    // The format is typically: Authorization: Bearer <TOKEN>
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract the token string (the part after "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify and decode the token
            // This function checks the signature against JWT_SECRET and validates expiration
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Find the user associated with the decoded userId
            // .select('-password') excludes the hashed password for security
            const user = await User.findById(decoded.userId).select('-password');

            if (!user) {
                // If the user ID in the token doesn't exist in the database
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }

            // 4. Attach the user object to the request
            // This makes user data (like user._id) available to the diagnosis route
            req.user = user;

            // 5. Proceed to the next middleware or route handler
            next();

        } catch (error) {
            console.error('Token verification error:', error.message);
            // If token is invalid (expired, wrong signature, etc.)
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is present in the header
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect };