import proxyquire from "proxyquire";
import { should } from "chai";
import sinon from "sinon";
should();

describe("transformImage", () => {
  let transformImage: any;
  const loggerStub = sinon.stub();

  before(() => {
    transformImage = proxyquire.noCallThru().load("./transformImage", {
      "../utils/logger": loggerStub,
    }).default;
  });

  describe("expected behavior when passed a string", () => {
    let result: any;

    before(() => {
      result = transformImage("test");
    });

    it("the param should be passed as is", () => {
      result.should.eql("test");
    });
  });

  describe("expected behavior when passed an array", () => {
    let result: any;

    before(() => {
      result = transformImage(["test-1", "yo"]);
    });

    it("the string at index 0 should be returned", () => {
      result.should.eql("test-1");
    });
  });

  describe("expected behavior when passed an object with a url prop", () => {
    let result: any;

    before(() => {
      result = transformImage({ url: "hiya.com" });
    });

    it("the url value should be returned", () => {
      result.should.eql("hiya.com");
    });
  });

  describe("expected behavior when something unexpected is passed", () => {
    let result: any;

    before(() => {
      loggerStub.resetHistory();
      result = transformImage({ nope: "nope.com" });
    });

    it("loggerStub should be invoked", () => {
      sinon.assert.calledOnce(loggerStub);
    });

    it("the param passed in should be returned", () => {
      result.should.eql({ nope: "nope.com" });
    });
  });
});
