/// <reference types="cypress" />
import App from "../../../app/assets/js/app";
import { User } from "../../../app/assets/js/user.model";
import Config from "../../../app/assets/js/config";
context('Application Web', () => {
  beforeEach(() => {
    localStorage.removeItem(Config.KeyLS);
  })

  it("Get data local storage first load", () => {
    const objUserModel = new User();
    objUserModel.Name = "Fiorella";
    objUserModel.Age = 30;
    objUserModel.Identity = 47878480;
    objUserModel.Direction = "Pedro Herrera #371";
    localStorage.setItem(Config.KeyLS, JSON.stringify(objUserModel))
    const dataLocalStorage = (new App()).GetDataLocalStorage();
    expect(dataLocalStorage).to.instanceOf(User)
    expect(dataLocalStorage).to.include(objUserModel);
  })

  it("Get not data local storage first load", () => {
    const objUserModel = new User();
    const dataLocalStorage = (new App()).GetDataLocalStorage();
    expect(dataLocalStorage).to.instanceOf(User)
    expect(dataLocalStorage).to.include(objUserModel);
  })

  it("Get data user form first load", () => {
    const objApplication = new App();
    const objUserModel = new User();
    objUserModel.Name = "Miguel Angel";
    objUserModel.Age = 30;
    objUserModel.Identity = 47878469;
    objUserModel.Direction = "Pedro Herrera #370";
    objApplication.SetDataForm(objUserModel)
    expect(objApplication.Designer.TxtName.value).to.equal(objUserModel.Name);
    expect(objApplication.Designer.TxtAge.value).to.equal(objUserModel.Age);
    expect(objApplication.Designer.TxtIdentity.value).to.equal(objUserModel.Identity);
    expect(objApplication.Designer.TxtDirection.value).to.equal(objUserModel.Direction);
  })

  it("Save user success local storage", () => {
    const objApplication = new App();
    const objUserModel = new User();
    objUserModel.Name = "Miguel Angel";
    objUserModel.Age = 30;
    objUserModel.Identity = 47878469;
    objUserModel.Direction = "Pedro Herrera #370";
    expect(objApplication.SaveLocalStorage(objUserModel)).to.equal(true);
    const dataLocalStorage = objApplication.GetDataLocalStorage();
    expect(dataLocalStorage).to.instanceOf(User)
    expect(dataLocalStorage).to.include(objUserModel);
  })

  
  it("Validate form success", () => {
    const objApplication = new App();
    const objUserModel = new User();
    objUserModel.Name = "Miguel Angel";
    objUserModel.Age = 30;
    objUserModel.Identity = 47878469;
    objUserModel.Direction = "Pedro Herrera #370";
    const responseValidate = objApplication.ValidateDataForm(objUserModel)
    expect(responseValidate.Result).to.equal(true,JSON.stringify(responseValidate));
  })

  it("Validate form error", () => {
    const objApplication = new App();
    const objUserModel = new User();
    const responseValidate = objApplication.ValidateDataForm(objUserModel)
    expect(responseValidate.Result).to.equal(false,JSON.stringify(responseValidate));
  })

  it("Save user success client", () => {
    const objApplication = new App();
    const objUserModel = new User();
    objUserModel.Name = "Miguel Angel Angel López Monzón";
    objUserModel.Age = 30;
    objUserModel.Identity = 47878469;
    objUserModel.Direction = "Pedro Herrera #370 - Buenos Aires - Victor Larco - Trujillo - La Libertad - Perú";
    const responseServiceSave = objApplication.Save(objUserModel)
    expect(responseServiceSave.Result).to.equal(true);
    expect(responseServiceSave.Message).to.equal("Success Save");
    const dataLocalStorage = objApplication.GetDataLocalStorage();
    expect(dataLocalStorage).to.instanceOf(User)
    expect(dataLocalStorage).to.include(objUserModel);
  })


  it("Save user failed catch client", () => {
    const objApplication = new App();
    const responseServiceSave = objApplication.Save()
    expect(responseServiceSave.Result).to.equal(false);
    expect(responseServiceSave.Message).to.equal("Error processing data");
  })

  it("Save user validated failed  client", () => {
    const objApplication = new App();
    const objUserModel = new User();
    const responseServiceSave = objApplication.Save(objUserModel)
    expect(responseServiceSave.Result).to.equal(false);
    expect(responseServiceSave.Message).to.equal("Insert correct name");
  })

  it("Get model by form", () => {
    const objApplication = new App();
    const objUserModel = new User();
    objUserModel.Name = "Miguel Angel";
    objUserModel.Age = 30;
    objUserModel.Identity = 47878469;
    objUserModel.Direction = "Pedro Herrera #370";
    objApplication.SetDataForm(objUserModel);
    const dataModel = objApplication.GetModelByForm();
    expect(dataModel).to.instanceOf(User)
    expect(dataModel).to.include(objUserModel);
  })
})




