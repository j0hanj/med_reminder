const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/med_reminder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const MedicationSchema = new mongoose.Schema({
    name: String,
    time: String,
    userId: String,
});

const Medication = mongoose.model('Medication', MedicationSchema);

app.post('/addMedication', async (req, res) => {
    const medication = new Medication(req.body);
    await medication.save();
    res.send(medication);
});

app.get('/medications/:userId', async (req, res) => {
    const medications = await Medication.find({ userId: req.params.userId });
    res.send(medications);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});