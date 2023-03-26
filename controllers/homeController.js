module.exports.getHomepage = (req,res)=>{
    res.render('home',{
        title: "Homepage",
        user: req.session.user,
        isLogged: req.session.isLogged,
        url: process.env.URL
    })
}