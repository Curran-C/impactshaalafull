import Company from "../modals/company.modal.js";
import Collaboration from "../modals/collaboration.modal.js";
import Post from "../modals/post.modal.js";
import { sendMail } from "../utils/mailHelper.js";
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
    const user = await Company.findOne({
      email: req.body.email,
      status: "active",
    });
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
          httpOnly: true,
          // Set the domain to match your online environment's domain.
          domain: "impactshaala-testsite.tech", // Replace with your actual domain.
          // Set the 'secure' flag to true if your backend is hosted over HTTPS.
          // secure: true,
          // Set the path to '/' to make the cookie accessible on all paths.
          path: "/",
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

    // }
  }
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

//Admin

//get no of stakeholders
export const getNoOfStakeholders = async (req, res) => {
  try {
    const ngos = await Company.countDocuments({ stakeholder: "NGO" });
    const corporates = await Company.countDocuments({
      stakeholder: "Corporate",
    });
    const educationalInstitutions = await Company.countDocuments({
      stakeholder: "Educational Institution",
    });
    const workingProfessional = await Company.countDocuments({
      stakeholder: "Working Professional",
    });
    const totalUsers = await Company.countDocuments();
    const totalProjects = await Collaboration.countDocuments();
    res.status(200).send({
      ngos,
      corporates,
      educationalInstitutions,
      workingProfessional,
      totalUsers,
      totalProjects,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

//get user activity
export const getUserActivity = async (req, res) => {
  try {
    const userStatus = req.params.userstatus;
    if (userStatus === "allusers") {
      const users = await Company.find();
      res.status(200).send(users);
    } else if (userStatus === "notactive") {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      const allPosts = await Post.find();
      const twoMonthsAgoPosts = await Post.find({
        createdAt: { $lt: twoMonthsAgo },
      });
      const userWithNoPosts = await Company.find({
        _id: {
          $nin: [...new Set(allPosts.map((post) => post.createdById).flat())],
        },
        createdAt: { $lte: twoMonthsAgo },
      });
      const userWithPostTwoMonthsAgo = await Company.find({
        _id: {
          $in: [
            ...new Set(
              twoMonthsAgoPosts.map((post) => post.createdById).flat()
            ),
          ],
        },
      });
      res.status(200).send([...userWithNoPosts, ...userWithPostTwoMonthsAgo]);
    } else if (userStatus === "removed") {
      const removedUser = await Company.find({ status: "inactive" });
      res.status(200).send(removedUser);
    } else {
      res.status(500).send("Invalid Status");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//send warning notification to inactive user
export const sendNotification = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const response = await sendMail(name, email, subject, message);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

//remove inactive user
export const removeUser = async (req, res) => {
  try {
    const { reason } = req.body;
    const subject = "Account has been removed";
    const user = await Company.findByIdAndUpdate(req.params.id, {
      status: "inactive",
    });
    console.log(user);
    await sendMail(user.name, user.email, subject, reason);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// set score to stakeholder
export const addScore = async (req, res) => {
  try {
    const user = await Company.findById(req.params.id);
    user.score += req.body.score;
    user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUserStat = async (req, res) => {
  try {
    const user = await Company.findById(req.params.id);
    const collabs = await Collaboration.countDocuments({
      fromId: req.params.id,
    });
    const posts = await Post.countDocuments({ createdById: req.params.id });
    const ongoingProjects = await Collaboration.countDocuments({
      $or: [{ fromId: req.params.id }, { toId: req.params.id }],
      completed: "ongoing",
    });
    res.status(200).send({
      userScore: user.score,
      collabs,
      posts,
      ongoingProjects,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

//get company from stakeholder
export const getAllUsersByStakeholder = async (req, res) => {
  try {
    const { stakeholder } = req.params;
    const user = await Company.find({ stakeholder });
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};
