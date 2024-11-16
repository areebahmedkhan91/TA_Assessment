import express from 'express';
import cors from 'cors';
import currencyRoutes from './routes/currency.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to TA Assessment Test!');
});

//Routes
app.use('/api', currencyRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});