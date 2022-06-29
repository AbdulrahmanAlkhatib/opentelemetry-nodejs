const request = require("supertest");
const app = require("../index");

describe("GET /", () => {
  it("respond with Hello World", (done) => {
    request(app).get("/").expect("<h1>The Server is Running in the Background</h1>", done);
  })
});


