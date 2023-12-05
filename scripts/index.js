const express = require('express');
const bodyParser = require('body-parser');
const {captureLayout} = require('./appiumScript');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/capture-layout', async (req, res) => {
  try {
    await captureLayout();
    res.status(200).send('Layout capture initiated');
  } catch (error) {
    console.error('Failed to capture layout:', error);
    res.status(500).send('Error triggering layout capture');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
