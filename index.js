const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes')
const app = express();

app.use(express.json());

//load env
dotenv.config();

//port ki value ko call kiya hai .env file se 
const port = process.env.PORT

//connect to database
connectDB();


app.get('/', (req, res) => {
  res.send('Hello World! aap sab kese hai ')
})
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Product app listening on port ${port}`)
})