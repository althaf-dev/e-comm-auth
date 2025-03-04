const { getUser } = require("../helpers/helpers");

function Home(req, res) {
  console.log("home::::",getUser(req))
  res.render("Home", { user: getUser(req)});
  
}

module.exports = { Home };
