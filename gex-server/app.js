
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const urlEncoder = bodyParser.urlencoded({
  extended: false
});
app.use(cors());

const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  let year = JSON.stringify(date.getFullYear());
  year = year.substr(-2);
  const datevalues = `${date.getDate()}/${date.getMonth() + 1}/${year}`;
  return datevalues;
}

function formatHistoryData(data){
  data = Object.values(data)[0].forEach(item => {
    item.timestamp =formatTimestamp(item.timestamp);
  });
return data;
}

app.get('/getPriceHistory', urlEncoder, (req, res) => {
  console.log("Started my getPriceHistory request.");
  console.log(req.query);
  let my_url = `https://api.weirdgloop.org/exchange/history/rs/last90d?id=${req.query.name}`;
  const options = {
    headers: {
      'accept': 'application/json',
      'User-Agent': 'GEX Application Dev'
    }
  }
  axios
    .get(my_url, options)
    .then(response => {
      console.log(`Reponse Status: ${response.status}`);
      console.log("DATA REQUESTED");
      formatHistoryData(response.data);
      res.json(response.data);
    }).catch(error => {
      console.log(error);
      return;
    });
});


app.post('/getData', urlEncoder, (req, res) => {
  console.log("Started my data get request");
  let data = [];
  let finalData;
  let itemName = req.body.name;
  console.log(itemName);
  itemName = itemName.replaceAll(", ", "%7C");
  itemName = itemName.replaceAll(",", "%7C");
  itemName = itemName.replace(/ /g, "%20");
  itemName = itemName.replaceAll('(', "%28");
  itemName = itemName.replaceAll('(', "%29");
  itemName = itemName.replaceAll("'", "%27");



  let my_url = `https://api.weirdgloop.org/exchange/history/rs/latest?name=${itemName}`;
  const options = {
    headers: {
      'accept': 'application/json',
      'User-Agent': 'GEX Application Dev'
    }
  }

  axios
    .get(my_url, options)
    .then(response => {
      console.log(`Reponse Status: ${response.status}`);
      console.log(response.data);
      res.json(response.data);
    }).catch(error => {
      console.log(error);
      return;
    });

});

app.listen(PORT, () => {
  console.log("Server Started on Port " + PORT);
});
