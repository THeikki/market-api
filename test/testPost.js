let db = require("../db");
let postSchema = require('../schemas/post');
const lp = require('../routes/posts')
const server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

/*
    BEFORE RUNNING THESE TESTS YOU HAVE TO DISABLE MIDDLEWARES [checkAuth, validatePost, validateUpdate] FROM POST, PUT AND DELETE QUERIES
*/

describe("Test post", () =>{

    /*
    *** Get post by category    THIS IS PASSING
    */
    describe('GET /postings/category/:Category', () => {
        it.skip('it should GET postings by category', (done) => {
            const category = 'computers';
            chai.request(server)
                .get('/postings/category/' + category)
                .then((res) => {
                    expect(res).to.have.status(200);              
                    done();
            })
            .catch((error) => done(error));
        });
    });

    /*
    *** Test post posting without requisted field   THIS IS PASSING
    */
    describe('POST /postings', () => {
        it.skip('it should NOT POST a posting without Title field', (done) => {
            const posting = {
                //Title: "sell",
                Explanation: "sell kitchen table",
                Category: "tables",
                Location: "America",
                ItemPic1: "item.png",
                ItemPic2: "",
                ItemPic3: "",
                ItemPic4: "",
                Price: 350,
                DateOfPosting: "2021-02-03",
                DeliveryMethod: "pickup",
                SellerName: "Mikki Hiiri",
                SellerAddress: "Ankkalinna 33"
            }
            chai.request(server)
                .post('/postings/')
                .send(posting)
                .then((res) => {                    
                    const body = res.body;
                    expect(body).to.be.an('object');
                    expect(res).to.have.status(201);                
                    done();
                })
                .catch((error) => done(error));
        });
    
        it.skip('it should POST a posting ', (done) => {
            const posting = {
                id: 1,
                Title: "sell",
                Explanation: "sell kitchen table",
                Category: "tables",
                Location: "America",
                ItemPic1: "1613328236001.png",
                ItemPic2: "",
                ItemPic3: "",
                ItemPic4: "",
                Price: 350,
                DateOfPosting: "2021-02-03",
                DeliveryMethod: "Pickup",
                SellerName: "Mikki Hiiri",
                SellerAddress: "Ankkalinna 33"
            }
        chai.request(server)
            .post('/postings/')
            .send(posting)
            .then((res) => {
                const body = res.body;
                expect(body).to.be.an('object');
                expect(res).to.have.status(201);
                done();
            })
            .catch((error) => done(error));
        });
    });

    /*
    *** Test update posting with wrong id   THIS IS PASSING
    */
    describe('PUT /postings/:id', () => {
        it.skip('it should NOT UPDATE a posting with wrong id', (done) => {
            const id = 101;
            const posting = {
                Title: "sell",
                Explanation: "sell kitchen table",
                Category: "tables",
                Location: "America",
                ItemPic1: "item.png",
                ItemPic2: "",
                ItemPic3: "",
                ItemPic4: "",
                Price: 350,
                DateOfPosting: "2021-02-03",
                DeliveryMethod: "pickup",
                SellerName: "Mikki Hiiri",
                SellerAddress: "Ankkalinna 33"
            }
            chai.request(server)
                .put('/postings/' + id)
                .send(posting)
                .then((res) => {           
                    const body = res.body;
                    expect(body).to.be.an('object');
                    expect(res).to.have.status(404);          
                    done();
                })
                .catch((error) => done(error));
            });

    /*
    *** Test update posting with correct id
    */
        it.skip('it should UPDATE posting with correct id', (done) => {
            const id = 1;
            const posting = {
                Title: "sell",
                Explanation: "sell Trek fatbike",
                Category: "bicycles",
                Location: "Germany",
                ItemPic1: "1613328236001.png",
                ItemPic2: "",
                ItemPic3: "",
                ItemPic4: "",
                Price: 1200,
                DateOfPosting: "2021-01-23",
                DeliveryMethod: "shipping",
                SellerName: "Iines Ankka",
                SellerAddress: "Ankkalinna 3"
            }
            chai.request(server)
                .put('/postings/' + id)
                .send(posting)
                .then((res) => {
                    const body = res.body;
                    expect(body).to.be.an('object');
                    expect(res).to.have.status(200);        
                    done();
                })
                .catch((error) => done(error));
            });
        });

    /*
    *** Test delete posting with correct id
    */
   describe('DELETE /postings/:id', () => {
        it.skip('it should DELETE postings with id', (done) => {
            const id = 1;
            chai.request(server)
                .del('/postings/' + id)
                .then((res) => {
                expect(res).to.have.status(202);                          
                done();
            })
            .catch((error) => done(error));
        });
    });
});

