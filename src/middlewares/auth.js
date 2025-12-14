const auth = (req, res, next) => {
  console.log('estamos aqui na auth');
  //res.status(200).json('estamos aqui na auth' + req);
  next();
};

export default auth;
