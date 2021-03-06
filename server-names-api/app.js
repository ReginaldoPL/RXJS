const mongoose = require('mongoose');
const Person = require('./person.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


mongoose
    .connect('mongodb://localhost:27017/namesdb', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

//http://localhost:9000/    
app.get('/', (req, res) => {
    //lean me retorna só os dados (sem a opção de modificar)
    Person.find({}).lean().exec((error, data) => {
        if (error) {
            return res.status(500).json({
                error: error,
                message: 'Fudeuuuu.'
            });
        } else {
            return res.status(200).json(data);
        }
    });

});

//http://localhost:9000/rose
app.get('/:text', (req, res) => {
    let text = req.params.text;

    //expressões regulares
    var query = {
        $or: [
            { firstname: { $regex: text, $options: 'i' } },
            { lastname: { $regex: text, $options: 'i' } },
            { country: { $regex: text, $options: 'i' } },
            { email: { $regex: text, $options: 'i' } },
            { city: { $regex: text, $options: 'i' } },
        ]
    };

    //lean me retorna só os dados (sem a opção de modificar)
    Person.find(query).lean().exec((error, data) => {
        if (error) {
            return res.status(500).json({
                error: error,
                message: 'Fudeuuuu.'
            });
        } else {
            setTimeout(() => {
                return res.status(200).json(data);
            }, 2000)
            
        }
    });

});

//se nenhuma rota for atendida
app.use(function (req, res, next) {
    res.status(404).send('Rota inexistente.');
});

app.listen(9000);
console.log('Rodando na porta 9000');
