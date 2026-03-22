require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { seedDefaultUsers } = require('./seeders/bootstrapUsers');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service', timestamp: new Date().toISOString() });
});

app.use('/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    if (process.env.ENABLE_BOOTSTRAP_USERS === 'true') {
      await seedDefaultUsers();
    }

    app.listen(PORT, () => {
      console.log(`User service running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start user service: ${error.message}`);
    process.exit(1);
  }
};

startServer();
