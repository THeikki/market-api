let db = require("../db");
let userSchema = require('../schemas/user');
const lp = require('../routes/users')
const server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

/*
    *** BEFORE RUNNING THESE TESTS YOU HAVE TO DISABLE MIDDLEWARE  [validateUser] FROM REGISTER AND LOGIN QUERIES 
    *** AND COMMENT FIRST 4 LINES IN FIRST mySQL QUERIE FROM USER
*/

describe("Test user", () =>{

    /* 
    *** Test user register
    */
    describe('POST /user/register', () => {
        it.skip('it should REGISTER a user', (done) => {
            const user = {
                UserName: "tester",
                Pwd: "password"
            }
            chai.request(server)
                .post('/user/register')
                .send(user)
                .then((res) => {                    
                    const body = res.body;
                    expect(body).to.be.an('object');
                    expect(res).to.have.status(201);                
                    done();
                })
                .catch((error) => done(error));
            });
    
        it.skip('it should NOT REGISTER a user without UserName', (done) => {
            const user = {
                //UserName: "tester",
                Pwd: "password"
            }
            chai.request(server)
                .post('/user/register')
                .send(user)
                .then((res) => {                    
                    const body = res.body;
                    expect(body).to.be.an('object');
                    expect(res).to.have.status(400);                
                    done();
                })
                .catch((error) => done(error));
        });
    });

    /* 
    *** Test user login
    */
   describe('POST /user/login', () => {
    it.skip('it should Login a user', (done) => {
        const user = {
            UserName: "tester",
            Pwd: "password"
        }
        chai.request(server)
            .post('/user/login')
            .send(user)
            .then((res) => {                    
                const body = res.body;
                expect(body).to.be.an('object');
                expect(res).to.have.status(200);       
                done();
            })
            .catch((error) => done(error));
        });

    it.skip('it should NOT LOGIN a user without correct UserName', (done) => {
        const user = {
            UserName: "ester",
            Pwd: "password"
        }
        chai.request(server)
            .post('/user/login')
            .send(user)
            .then((res) => {                    
                const body = res.body;
                expect(body).to.be.an('object');
                expect(res).to.have.status(401);                
                done();
            })
            .catch((error) => done(error));
        });
    });
});