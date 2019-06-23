// const express = require('express');

function myLogger2(req, res, next){
    
  console.log('>>> myLogger called');

  console.log(
      ` >>> a ${req.method} method Requesteeee was made 
        >>> from url  ${req.url} 
        >>> at ${new Date().toISOString()}  from myLogger`);

  next();
};


function checkSession2(req, res, next){
  console.log('**** MW2 says req.session is \n', req.session);
  console.log('**** MW2 says req.session.user is \n', req.session.user);
  
  
  // we have session data stored
  if(req.session && req.session.user) {
    next();

  } else {
    res.status(401).json({
      message: ` You shall not pass, you are NOT MW authorized`
    })

  }
};





module.exports = {
  myLogger2,
  checkSession2
}