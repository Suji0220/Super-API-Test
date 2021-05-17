//require('dotenv').config();

//import {} from 'dotenv/config';
import dotenv from 'dotenv'
dotenv.config()


import request from '../config/common.js';
//const faker  = require ('faker');

//import {faker} from 'faker';

//import pkg from 'faker';
//const {faker} = pkg;

import faker from 'faker';
//First Commit

import {expect} from 'chai';
import {createRandomUser} from '../helper/userhelper.js';
import {createRandomUserWithFaker} from '../helper/userhelper.js';


const TOKEN = process.env.USER_TOKEN;


describe('User Posts', () => {
    let postId, userId;
    
   
    before( async () => {

       userId =  await createRandomUserWithFaker();
          
    });
    it('/posts', async () => { 
        const data = {
                user_id: userId,
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs(),
            
        };
        const postRes = await request
        .post('posts')
        .set("Authorization",  TOKEN)
        .send(data);  
        console.log('This is the token ' + TOKEN);
        console.log(data);
        //expect(postRes.body.data).to.deep.include(data);
        expect(postRes.body.code).to.eq(201);
        postId = postRes.body.data.id;
        console.log(postId);
    });


    it('GET / posts/:id', async() => {
        await request
        .get(`posts/${postId}`)
        .set('Authorization',  TOKEN)
        .expect(200);
        
    });

    describe.only('Negative Tests', () => {
        it('401 Authentication Failed', async () => {
            const data = {
                user_id: userId,
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs(),
        };
        const postRes = await request
        .post('posts')
        .send(data);   
        
        console.log(postRes);
        expect(postRes.body.code).to.eq(401);
        expect(postRes.body.data.message).to.eq('Authentication failed');
        }); 
        
        it('422 Validation Failed', async () => {
            const data = {
                user_id: userId,
                title: faker.lorem.sentence(),
        };
        const postRes = await request
        .post('posts')
        .set('Authorization', TOKEN)
        .send(data);   
        console.log('This is the token: ' + TOKEN)
        console.log(postRes.body);
        expect(postRes.body.code).to.eq(422);
       expect(postRes.body.data[0].field).to.eq('body');
        expect(postRes.body.data[0].message).to.eq("can't be blank");
        }); 
    });
    
});
