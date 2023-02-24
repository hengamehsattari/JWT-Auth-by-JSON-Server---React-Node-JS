const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

//create server
const server = jsonServer.create();
//create user database
const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

//setup server
//receive data and url
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

//generate access token for previous users
//in secret key give random number
const SECRET_KEY = "91593543672";
//what does it take that expire token happend
const expiresIn = "1h";
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

//check if user is authenticated or not(already registered)
function isLoginAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}
//check if user is authenticated
function isRegisterAuthenticated({ email }) {
  return 
   userdb.users.findIndex(
    (user) => user.email === email)
     !== -1;
}

//register new user
server.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exist";
    //return the error
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    //if it doesn't have err
    data = JSON.parse(data.toString());
    //last_item_id+1 generates new id
    let last_item_id = data.users[data.users.length - 1].id;
    
    // users is from users.json
    data.users.push({ id: last_item_id + 1, email, password});
    let writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  //generate new token for new users
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

//login logic for server
server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

//determine the port
server.listen(5000, () => {
  console.log("server is running on port 5000");
});
