const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
Employees = require('./models/employees');

const uri = "mongodb+srv://seytech:Seytech2020@seytech-byvi5.mongodb.net/Seytech?retryWrites=true&w=majority"

// Connext to Mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected ...")
  })
  .catch(err => console.log(err))
  
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Employees API is running');
});

app.get('/api/employees', (req, res) => { 

    Employees.find({}, function(err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
    });
})

app.get('/api/employee/:id', (req, res) => {
    Employees.getEmployeeById(req.params.id,(err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
});

app.post('/api/employees', (req, res) => {
    const employee = req.body;
    Employees.createEmployee(employee, (err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
});


app.put('/api/employee/:id', (req, res) => {
    const id = req.params.id;
    const employee = req.body;
    Employees.updateEmployee(id, employee, {}, (err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
})

app.delete('/api/employee/:id', (req, res) => {
    console.log("params", req.params)
    const id = req.params.id;
    console.log('id-------', id)
    Employees.deleteEmployee(id, (err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
})

app.listen(5000, console.log('Running on port 5000...'));

