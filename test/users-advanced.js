import supertest from 'supertest';
import {expect} from 'chai';
import { equal } from 'assert';

const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = '2767caa973052960a86de893a17fb867908e043dae6c07afd427f3e92388620c';

describe('Users', () => {
    let userId;

describe('POST', () => {
    it('/users', () => {
        const data = {
                email: `test-${Math.floor(Math.random() * 9999)}@yahoo.com`,
                name:'Test Name',
                gender:'Female',
                status:'Inactive'             
        };
       return request
       .post('users')
       .set('Authorization',   `Bearer ${TOKEN}`)
       .send(data)
       .then((res) => {
           console.log(res.body.data);
           expect(res.body.data).to.deep.include(data);
           userId = res.body.data.id;
           console.log(userId);           

       });         
    });    
});

describe('GET', () => {
    it('/users', () => {
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;  
    });       
});
it('/users/:id', () => {
    return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
        //console.log(res.body);
      expect(res.body.data.id).to.be.eq(userId);
    });  
});

it('/users with query Params', () => {
    const url = `users?access-token=${TOKEN}&page=5&gender=Female&status=Active`;
    return request.get(url).then((res) => {
    expect(res.body.data).to.not.be.empty;  
    expect(res.body.meta.pagination.page).to.eq(5);
    res.body.data.forEach((data) => {
        expect(data.gender).to.eq('Female');
        expect(data.status).to.eq('Active');          
        
    });
    }); 
}); 
});      
    describe('PUT', () => {
        it('/users/:id', () => {
            const data = {
                status:'Active',
                name: `Luffy - ${Math.floor(Math.random()  * 9999)}`
            }

            return request
            .put( `users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                console.log(res.body.data);
                expect(res.body.data).to.deep.include(data);
            })
        });
        
    });
        describe('DELETE', () => {
            it('/user/:id', () => {
                return request
                .delete(`users/${userId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .then(res => {
                    console.log(res.body.data);
                    expect(res.body.data).to.be.eq(null);
                })
                
            });
            
        });

       

    
});