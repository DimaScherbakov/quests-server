const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express()

// app.use(bodyParser.json())
app.use(cors())

app.get('/quests', function (req, res){
  res.header('Content-Type','application/json');
  res.sendFile(path.join(__dirname, '../data/MainPageInfo.json'));
})

app.get('/quest',function(req,res){
  console.log(req);
  // var quest = getQuest(req)
})

app.listen(8081,
  function(){
    console.log('Server start on port  8081')})
