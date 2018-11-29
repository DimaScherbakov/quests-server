const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// app.use(bodyParser.json())
app.use(cors());

app.get("/quests", function(req, res) {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "../data/MainPageInfo.json"));
});

app.get("/quest/:alias/:globalId", function(req, res) {
  // console.log(req.params);

  let allQuests = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../data/GeneralQuestsInfo.json"),
      "utf8"
    )
  );
  let respQuest = allQuests.find(x => {
    return (
      x.alias === req.params.alias &&
      x.globalId.toString() === req.params.globalId
    );
  });
  if (respQuest) {
    let passedQuests = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../data/FinishedQuestsLeafs.json"),
        "utf8"
      )
    );
    let passedQuestsCount = passedQuests.filter(
      obj => obj.questId == respQuest.id
    ).length;
    respQuest.passedQuestsCount = passedQuestsCount;

    res.setHeader("Content-Type", "application/json");
    return res.send(JSON.stringify(respQuest));
  }
  res.sendStatus(404);
  // var quest = getQuest(req)
});

app.listen(8081, function() {
  console.log("Server start on port  8081");
});
