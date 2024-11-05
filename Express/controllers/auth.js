const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1].trim() === "true";
  let message = req.flash("error");

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (user) {
    const userWasAccept = await bcrypt.compare(password, user.password);
    if (userWasAccept) {
      req.session.isLoggedIn = true;
      req.session.user = user;

      await req.session.save((err) => {
        console.log(err);
      });

      console.log("Session created");

      return res.redirect("/");
    }
  }
  req.flash("error", "Invalid email or password.");

  console.log("Usuario não encontrado");

  return res.redirect("/login");
};

exports.postLogout = async (req, res, next) => {
  try {
    await req.session.destroy();

    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  let user = await User.findOne({ email: email });

  if (user || password !== confirmPassword) {
    req.flash("error", "Email already used or Different Passwords");
    return res.redirect("/signup");
  }

  const hash_password = await bcrypt.hash(password, 12);

  user = new User({
    email: email,
    password: hash_password,
    cart: { items: [] },
  });

  await user.save();

  res.redirect("/login");
};
