/// <reference types="cypress" />
import Config from "../../../app/assets/js/config";
import { User } from "../../../app/assets/js/user.model";
context('Navigation Page', () => {
  beforeEach(() => {
    localStorage.removeItem(Config.KeyLS);
    cy.visit('/app/app.html')
  })
  it("Get data local storage first load", () => {
    const objUserModel = new User();
    objUserModel.Name = "Miguel Angel Angel López Monzón";
    objUserModel.Age = 30;
    objUserModel.Identity = 47878469;
    objUserModel.Direction = "Pedro Herrera #370 - Buenos Aires";

    cy.get("#txt-name").type(objUserModel.Name);
    cy.get("#txt-age").clear().type(objUserModel.Age);
    cy.get("#txt-identity").clear().type(objUserModel.Identity);
    cy.get("#txt-address").type(objUserModel.Direction);
    cy.get("#btn-send-server").click().should(()=>{
      expect(JSON.parse(localStorage.getItem(Config.KeyLS))).to.contain(objUserModel);
    });
  })
})
