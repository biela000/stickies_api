const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

mongoose.connect(
  process.env.DATABASE_ONLINE.replace('<password>', process.env.PASSWD),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Database connected successfully');
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
