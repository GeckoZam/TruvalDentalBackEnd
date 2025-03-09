import express from 'express';
import userRouter from './src/routes/user.route.js';
import noteTypeRouter from './src/routes/noteType.route.js';
import patientRouter from './src/routes/patient.route.js';
import treatmentRouter from './src/routes/treatment.route.js';
import appointmentRouter from './src/routes/appointment.route.js';
import noteRouter from './src/routes/note.route.js';

const app = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', patientRouter);
app.use('/api', noteTypeRouter);
app.use('/api', noteRouter);
app.use('/api', treatmentRouter);
app.use('/api', appointmentRouter);

export default app;