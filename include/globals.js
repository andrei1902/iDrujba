
var debug = true;
var debugUser = {
  "_type": "login",
  "partnerId": "683433c0-dbc5-11e5-90e1-8b72acb65ed4",
  "login": "andrei",
  "password": "3ecd049967fbd5b4e30dfa0ba3744631bb2c3dd335a8517b88fa969bc78e711544abb6ce$2d08f3a0b8f304c03a8f0c017e139c3025d5c750",
  "roles": [
    {
      "type": "aes",
      "id": "683433c0-dbc5-11e5-90e1-8b72acb65ed4"
    }
  ],
  "timestamp": "20160405000623065",
  "_version": 2,
  "_published": true
};
var debugPartner = {
    _type: 'partner',
    id: '683433c0-dbc5-11e5-90e1-8b72acb65ed4',
    code: 'bb',
    name: 'Big Bank'
};

global.requireAuthApi = function(req, res, next) {
    if (debug) {
        req.session.isAuthenticated = true;
        req.session.username = debugUser.login;
        req.session.user = debugUser;
        req.session.partner = debugPartner;
        next();
        return;
    }
    // check if the user is logged in
    if (req.session.isAuthenticated && (typeof req.session.username !== 'undefined')) {
        next();
    } else if (req.cookies.isAuthenticated && req.cookies.username) {
        req.session.isAuthenticated = req.cookies.isAuthenticated;
        req.session.username = req.cookies.username;
        next();
    } else {
        res.status(404).jsonp({
            result: 'err',
            code: 'err-not-logged-in',
            description: 'user not logged in'
        });
    }
}

global.requireAuth = function(req, res, next) {
    if (debug) {
        req.session.isAuthenticated = true;
        req.session.username = debugUser.login;
        req.session.user = debugUser;
        req.session.partner = debugPartner;
        next();
        return;
    }
    // check if the user is logged in
    if (req.session.isAuthenticated) {
        next();
    } else if (req.cookies.isAuthenticated && req.cookies.username) {
        req.session.isAuthenticated = req.cookies.isAuthenticated;
        req.session.username = req.cookies.username;
        next();
    } else {
        res.redirect('/account/login');
    }
}

