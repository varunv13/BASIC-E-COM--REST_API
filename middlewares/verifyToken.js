import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authorized!!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }
    else {
      res.status(403).json("You're not authorized to perform this action!!")
    }
  });
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.isAdmin) {
      next();
    }
    else {
      res.status(403).json("You're not authorized to perform this action!!")
    }
  });
}

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
