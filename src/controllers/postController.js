const { getUser } = require("../helpers/helpers");

function posts(req, res) {
  console.log(getUser(req));
  res.render("posts.hbs", { user: getUser(req) });
}

module.exports = { posts };
