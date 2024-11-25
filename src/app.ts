import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { config } from './config/config';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

mongoose.connect(config.dbUri).then(() => console.log('MongoDB connected'));

export default app;
