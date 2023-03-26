const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const getLoginPage = (req,res)=>{
  if(!req.session.isLogged){
    res.render('auth/login',{
      title: 'Login page',
      url: process.env.URL,
      loginError: req.flash('loginError')
    })
  }
    
}
const getRegisterPage = (req,res)=>{
  if(!req.session.isLogged){
    res.render('auth/signup',{
        title: 'Registration page',
        url: process.env.URL,
        regError: req.flash('regError')
    })
  }
}
const registerNewUser = async (req,res)=>{
    try {
        const {email, username,phone,password,password2} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const userExist = await User.findOne({email});
        if(userExist){
           req.flash('regError','Bunday foydalanuvchi mavjud');
           return res.redirect('/auth/signup')
        }
        if(password!==password2){
          req.flash('regError','Parollar mos tushmayapti');
            return res.redirect('/auth/signup')
        }
        await User.create({email, username, phone, password: hashedPassword})
        return res.redirect('/auth/login')
    } catch (error) {
        console.log(error)
    }
}
const loginUser = async (req,res)=>{
    try {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        const matchPassword = await bcrypt.compare(req.body.password,userExist.password);
        if (matchPassword) {
          req.session.user = userExist;
          req.session.isLogged = true;
            req.session.save((err) => {
              if (err) throw err;
              res.redirect("/profile/" + req.session.user.email);
            });
        } else {
          req.flash('loginError',`Login yoki parol xato kirtildi`)
          res.redirect("/auth/login");
        }
      } else {
        req.flash('loginError',`Bunday foydalanuvchi mavjud emas`)
        res.redirect("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
}
const logout = (req,res)=>{
  req.session.destroy(()=>{
  })  
}
module.exports = {
    getRegisterPage,
    getLoginPage,
    registerNewUser,
    loginUser,
    logout
}