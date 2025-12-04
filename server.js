const express = require('express');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { verifyUser } = require('./middleware');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(verifyUser);
app.get('/', async (req, res) => {
  try{
 
    return res.json({msg: 'Hello World!'});
  }
  catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
  res.send('Hello World!');
});


app.use("/users",userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on reverse-proxy-007-9si2.vercel.app/${PORT}`);
});


