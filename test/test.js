const request = require("supertest");
const chai = require('chai');
const should = chai.should();
const expect = require("chai").expect;
const usersController = require("../controller/usersController.js");
const donorController = require("../controller/donorController.js");
const nonProfitController = require("../controller/nonProfitController.js");
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
console.log("Venti Mocha Frappuccino Extra Whip")
process.env.NODE_ENV = "test"

let donorId = 0;

//INITIAL REQUESTS
describe("The inital get requests", () => {
    let server;
    beforeEach(() => {
        delete require.cache[require.resolve('../server')];
        return require("../server.js").then(s => server = s);
    });
    before(() => {
        usersController.clearAllUsers();
        donorController.clearAllDonors();
        nonProfitController.clearAllNonProfits();
    });
    after(() => {
        usersController.clearAllUsers();
        donorController.clearAllDonors();
        nonProfitController.clearAllNonProfits();
    });
    // afterEach(done => server.close(done));
    it("should GET all of the existing users", done => {
        chai.request(server)
            .get("/api/users/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(0);
                done();
            })
    });
    it("should GET all of the existing donors", done => {
        chai.request(server)
            .get("/api/donors/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(0);
                done();
            })
    });
    it("should GET all of the existing nonprofits", done => {
        chai.request(server)
            .get("/api/nonprofits/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(0);
                done();
            })
    });
    it("should GET all of the existing food posts", done => {
        chai.request(server)
            .get("/api/foodposts/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(0);
                done();
            })
    });
});

//BRANDON YOUR CODE GOES HERE

//ERNESTO YOUR CODE GOES HERE