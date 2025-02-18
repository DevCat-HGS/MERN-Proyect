const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Server', () => {
  it('it should GET the home route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
