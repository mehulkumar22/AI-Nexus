import jwt from 'jsonwebtoken';

// ✅ User authentication middleware
const authUser = async (req, res, next) => {
  // Extract token from headers
  const token = req.headers.token;

  // If token missing
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request object
    if (decoded.id) {
      req.user = { id: decoded.id };
      next();
    } else {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
