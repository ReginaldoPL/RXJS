const mongoose = require('mongoose');
const faker = require('faker');

const Person = require('./person.js');

mongoose.connect('mongodb://localhost:27017/namesdb'
,    { useUnifiedTopology: true }
    );

async function createRandomPeople(){
    const N = 1000;
    for (let i= 0;i<=N;i++){
        let p = new Person({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            country: faker.address.country()
        });
        try {
                p.save()
        }
        catch(err){
            throw new Error('Error generatin new person');
        }                  
    }
}
//para rodar, executar node generate.js

createRandomPeople()
.then(()=>{
    //mongoose.disconnect();
    console.log("OK");

})
.catch(error => {
    //mongoose.disconnect();
    console.error("erro: ");

});