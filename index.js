const express = require("express");
const cors = require("cors");
const userRegister = require("./routes/userRegister");
const userLogin = require("./routes/userLogin");
const creator = require('./routes/creator');
const videoRC = require('./routes/videoRC');
const mongoose = require("mongoose");
const path = require('path');

const app = express();
const port = process.env.PORT || 3001
app.use(express.static(path.join(__dirname,'/client/build')));
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/user/register', userRegister);
app.use('/api/user/login', userLogin);
app.use('/api/creator', creator);
app.use('/api/videos', videoRC);

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname+"/client/build/index.html"))
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});