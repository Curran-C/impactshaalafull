import Company from "../modals/company.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register company
export const register = async (req, res) => {
  try {
    let newCompany;
    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 5);
      newCompany = new Company({
        ...req.body,
        password: hashedPassword,
      });
    } else {
      newCompany = new Company({
        ...req.body,
      });
    }

    await newCompany.save();
    res.status(200).send(newCompany);
  } catch (err) {
    res.status(500).send(err);
  }
};

//login
export const login = async (req, res) => {
  try {
    const user = await Company.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("Email doesnt exist");
    } else {
      const isCorrectPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isCorrectPassword)
        return next(createError(400, "Wrong password or Email!"));
      // generates token than will then then be passed as cookie
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY
      );
      const { password, ...info } = user._doc;
      // localStorage.setItem("Savedtoken", token);
      res
        .cookie("accessToken", token, {
          //httpOnly: true, //generates cookie with accessToken as it's name and token variable as its value with httpOnly rule
        })
        .status(200)
        .send(info);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

export const getuser = async (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) res.status(401).send("You are not authenticated");
  // else {
  try {
    // find user
    const user = await Company.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
  // }
};

export const getAllUsers = async (req, res) => {
  try {
    // find user
    const user = await Company.find();
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};

export const getUserFromEmail = async (req, res) => {
  try {
    const user = await Company.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send("Email doesnt exist");
    } else {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY
      );

      const { ...info } = user._doc;
      res
        .cookie("accessToken", token, {
          //httpOnly: true, //generates cookie with accessToken as it's name and token variable as its value with httpOnly rule
        })
        .status(200)
        .send(info);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const findUserAndUpdate = async (req, res) => {
  try {
    const user = await Company.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Something went wrong :(");
  }
};

export const findUserByName = async (req, res) => {
  try {
    const user = await Company.find({ name: req.body.name });
    if (!user) res.status(400).send("User doesnt exist");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("user not present");
  }
};
