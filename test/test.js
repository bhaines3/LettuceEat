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

//DONOR TEST
describe("The creation of a donor", () => {
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
    // afterEach(done => server.close(done));
    it("should intially return an empty users database.", done => {
        chai.request(server)
            .get("/api/users/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(0);
                done();
            })
    });
    it("should create a user who is a donor", done => {
        let newUserInfo = {
            email: "donor@gmail.com",
            name: "DonorTest",
            location: "100 S. Stone Ave Tucson, AZ 85701",
            isDonor: "true",
            phonenumber: "5205555555",
            password: "testpassword"
        }
        chai.request(server)
            .post("/api/signup/")
            .send(newUserInfo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.success.should.be.true;
                expect(res.body.msg).to.eql("Successful created new user.");
                done();
            });
    });
    it("should login the newly created donor", done => {
        let loginUser = {
            email: "donor@gmail.com",
            password: "testpassword"
        }
        chai.request(server)
            .post("/api/login/")
            .send(loginUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.success.should.be.true;
                done();
            });
    });
    it("should GET all of the existing users and return a length of 1, accomodating new user", done => {
        chai.request(server)
            .get("/api/users/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(1);
                done();
            })
    });
    it("should GET all of the existing donors and return a length of 1, accomodating new donor", done => {
        chai.request(server)
            .get("/api/donors/")
            .end((err, res) => {
                donorId = res.body.id;
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(1);
                done();
            })
    });
});



//NONPROFIT TEST
describe("The creation of a nonprofit", () => {
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
    // afterEach(done => server.close(done));
    it("should intially return an empty users database.", done => {
        chai.request(server)
            .get("/api/users/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(0);
                done();
            })
    });
    it("should create a user who is a nonprofit", done => {
        let newUserInfo = {
            email: "nonprofit@gmail.com",
            name: "NonProfitTest",
            location: "100 S. Stone Ave Tucson, AZ 85701",
            isDonor: "false",
            phonenumber: "5205555555",
            password: "testpassword"
        }
        chai.request(server)
            .post("/api/signup/")
            .send(newUserInfo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.success.should.be.true;
                expect(res.body.msg).to.eql("Successful created new user.");
                done();
            });
    });
    it("should login the newly created donor", done => {
        let loginUser = {
            email: "nonprofit@gmail.com",
            password: "testpassword"
        }
        chai.request(server)
            .post("/api/login/")
            .send(loginUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.success.should.be.true;
                done();
            });
    });
    it("should GET all of the existing users and return a length of 1, accomodating new user", done => {
        chai.request(server)
            .get("/api/users/")
            .end((err, res) => {
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(1);
                done();
            })
    });
    it("should GET all of the existing donors and return a length of 1, accomodating new donor", done => {
        chai.request(server)
            .get("/api/nonprofits/")
            .end((err, res) => {
                donorId = res.body.id;
                expect(200)
                res.body.should.be.a('array')
                expect(res.body).to.have.lengthOf(1);
                done();
            })
    });
});