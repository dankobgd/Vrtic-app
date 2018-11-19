module.exports.signup = (req, res, next) => {
  console.log('login: ', req.body);
  res.json({ msg: 'signup', body: req.body });
};
