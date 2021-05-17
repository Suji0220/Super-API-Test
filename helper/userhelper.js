import supertest from 'supertest';
import faker from 'faker';

const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = '2767caa973052960a86de893a17fb867908e043dae6c07afd427f3e92388620c';

export const createRandomUserWithFaker = async () => {
    const userData = {
        email: faker.internet.email(),
        name:faker.name.firstName(),
        gender:'Female',
        status:'Inactive', 
    };
    const res = await request
    .post('users')
    .set('Authorization',   `Bearer ${TOKEN}`)
    .send(userData) 

    console.log(res.body);
        return res.body.data.id;
};        


export const createRandomUser = async () => {
    const userData = {
        email: `test-${Math.floor(Math.random() * 9999)}@yahoo.com`,
        name:'Test Name',
        gender:'Female',
        status:'Inactive', 
    };
    const res = await request
    .post('users')
    .set('Authorization',   `Bearer ${TOKEN}`)
    .send(userData) 
        return res.body.data.id;
};        

   