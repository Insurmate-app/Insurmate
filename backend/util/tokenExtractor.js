function extractToken(req) {
  // Try to extract token from Authorization header
  const authorizationHeader = req.headers?.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.split(" ")[1]; // Extract the token part
  }

  // Fallback: Try to extract token from cookies
  if (req.cookies?.token) {
    return req.cookies.token; // Extract token from 'token' cookie
  }

  // Add more fallbacks as needed, such as from query parameters
  if (req.query?.token) {
    return req.query.token; // Extract token from query string
  }

  // Return null if no token is found
  return null;
}

module.exports = extractToken;
