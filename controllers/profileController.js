const User = require("../models/userModel");
const getProfilePage = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
      .populate("posters")
      .lean();

    if (!user) throw new Error("Foydalanuvchi mavjud emas");
    res.render("user/profile", {
      title: user.username,
      user,
      posters: user.posters,
      isAuth: req.session.isLoged,
      url: process.env.URL,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getProfilePage };
