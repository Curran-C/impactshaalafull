// import jwt from "jsonwebtoken";

// export const cookieAuth = (req, res, next) => {
//   const token = req?.cookies?.accessToken;
//   const { id } = jwt.decode(token);
//   if (!token || !id) {
//     res.status(401).send({
//       message: "You are not authenticated",
//     });
//   }
//   req.id = id;
//   next();
// };
