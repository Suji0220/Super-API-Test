import supertest from 'supertest';
import {expect} from 'chai';
import { equal } from 'assert';
const request = supertest('https://gorest.co.in/public-api/');
const request1 = supertest('https://www.osmos.services/order/v1/');
const TOKEN = '2767caa973052960a86de893a17fb867908e043dae6c07afd427f3e92388620c';

describe('Users', () => {
    it('GET/users', () => {
        /* request.get('users?access-token=${TOKEN}').end((err,res) => {
           // console.log(err);
           // console.log(res.body);

            expect(res.body.data).to.not.be.empty;
            done(); */
            return request.get('users?access-token=${TOKEN}').then((res) => {
                //console.log(res.body);
                expect(res.body.data).to.not.be.empty;  
        });       
    });
    it('GET/users/:id', () => {
        return request.get('users/19?access-token=${TOKEN}').then((res) => {
            //console.log(res.body);
          expect(res.body.data.id).to.be.eq(19);
        });  
    });

    it('GET/users with query Params', () => {
        const url = 'users?access-token=${TOKEN}&page=5&gender=Female&status=Active';
        return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;  
        expect(res.body.meta.pagination.page).to.eq(5);
        res.body.data.forEach((data) => {
            expect(data.gender).to.eq('Female');
            expect(data.status).to.eq('Active');          
            
        });
        }); 
    });
        
        it('POST/users', () => {
            const data = {
                
                   email: 'test7@mail.com',
                  
                   //email: 'test-${Math.floor(Math.random() * 999)}@mail.com',
                    //'test-${Math.floor(Math.random() * 9999)}@yahoo.com',
                    name:'Swetha-2',
                    gender:'Female',
                    status:'Active'
                    
                    
            };
           return request
           .post('users')
           .set('Authorization', 'Bearer 2767caa973052960a86de893a17fb867908e043dae6c07afd427f3e92388620c')
           .send(data)
           .then((res) => {
               console.log(res.body);
              /*  expect(res.body.data.email).to.eq(data.email);
               expect(res.body.data.status).to.eq(data.status);
               expect(res.body.data.gender).to.eq(data.gender); */

               expect(res.body.data).to.deep.include(data);
               

           });
             
        });

        it('PUT/users/:id', () => {
            const data = {
                status:'Active',
                name:'Vanitha - ${Math.floor(Math.random()  * 9999)}'
            }

            return request
            .put('users/61')
            .set('Authorization', 'Bearer 2767caa973052960a86de893a17fb867908e043dae6c07afd427f3e92388620c')
            .send(data)
            .then(res => {
                console.log(res.body.data);
                expect(res.body.data).to.deep.include(data);
            })
        });

        it('Delete/user/:id', () => {
            return request
            .delete('users/61')
            .set('Authorization', 'Bearer 2767caa973052960a86de893a17fb867908e043dae6c07afd427f3e92388620c')
            .then(res => {
                console.log(res.body.data);
                expect(res.body.data).to.be.eq(null);
            })
            
        });

    
});