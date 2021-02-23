const lp = require('../routes/image')
const server = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe("Test image", () =>{

    /* 
    *** Test getting image
    */
    describe('GET /uploads/images/:Image', () => {
        it('it should GET a picture', (done) => {
            const picture = '1614088540797.jpg';
            chai.request(server)
                .get('/uploads/images/' + picture)
                .then((res) => {                    
                    expect(res).to.have.status(200);                
                    done();
                })
                .catch((error) => done(error));
            });
    
        it('it should NOT GET a picture with undefined picture', (done) => {
            const picture = 'pic.jpg';
            chai.request(server)
                .get('/uploads/images/' + picture)
                .then((res) => {                    
                    expect(res).to.have.status(404);                
                    done();
                })
                .catch((error) => done(error));
        });
    });
});