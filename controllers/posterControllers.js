const { v4 } = require("uuid");
const Poster = require("../models/posterModel");
const User = require("../models/userModel");
module.exports.getPostersPage = async (req, res) => {
  try {
    const posters = await Poster.find().lean();
    res.render("poster/posters", {
      title: "All posters",
      url: process.env.URL,
      user: req.session.user,
        isLogged: req.session.isLogged,
      posters: posters.reverse(),
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.addNewPosterPage = (req, res) => {
  res.render("poster/addPoster", {
    title: "Yangi e'lon qo'shish",
    user: req.session.user,
        isLogged: req.session.isLogged,
    url: process.env.URL,
  });
};
module.exports.addNewPoster = async (req, res) => {
  try {
    const { title, region, amount, describe } = req.body;
    const newPoster = new Poster({
      isActive: true,
      title,
      image: req.file.filename,
      region,
      amount,
      describe,
    });
    await User.findByIdAndUpdate(
      req.session.user._id,
      { $push: { posters: newPoster._id } },
      { new: true, upsert: true }
    );
    const saved = await newPoster.save();

    const posterId = saved._id;
    res.redirect("/posters/" + posterId);
  } catch (e) {
    console.log(e);
  }
};
module.exports.getOnePoster = async (req, res) => {
  try {
    poster = await Poster.findByIdAndUpdate(
      req.params.id,
      { $inc: { visits: 1 } },
      { new: true }
    )
    .lean()
    res.render("poster/one", {
      title: poster.title,
      user: req.session.user,
      isLogged: req.session.isLogged,
      poster,
      url: process.env.URL,
    });
  } catch (error) {
    res.render("poster/one", {
      title: "Elon mavjud emas",
      url: process.env.URL,
      poster: null,
    });
    console.log(error);
  }
};
module.exports.getEditPosterPage = async (req, res) => {
  try {
    poster = await Poster.findById(req.params.id).lean();
    res.render("poster/edit-poster", {
      user: req.session.user,
        isLogged: req.session.isLogged,
      title: "Edit poster",
      url: process.env.URL,
      poster,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.updatePoster = async (req, res) => {
  try {
    const { title, image, region, amount, describe } = req.body;
    await Poster.findByIdAndUpdate(req.params.id, {
      title,
      image,
      region,
      amount,
      describe,
    });
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};
module.exports.deletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndDelete(req.params.id);
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};
