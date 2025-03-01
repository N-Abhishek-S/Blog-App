import confige from "../confige/conf";
import {Client, Account, ID} from "appwrite"

export class authentication_Service {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(confige.appwriteUrl)
        .setProject(confige.appwriteProjectID)

        this.account = new Account(this.client)
    }
  

    async createAccount({email, password, name}){

      try {
        const userAccount = await this.account.create(ID.unique(), email, password, name) 
        if (userAccount) {
          return this.Login({email, password});
        } else {
          return userAccount
        }
      } catch (error) {
        console.error("Signup error:", error);
        throw error
      }

      /*Here what we extra is if user sing up successfully use should immediately Login so we create small if-else if user sign up call login
      function and execute it */

    }

    async Login({ email, password }) {
      try {
        const session = await this.account.createEmailPasswordSession(email, password);
        console.log("Login successful. Session:", session);
        return session;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    }
    
    

    async getUser(){
      try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

    async Logout(){
      try {
        await this.account.deleteSessions();
        return true; 
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
    }

    }
    /* In this nothing we do extra just create async methods because we has to use promise so we use async await then accessing account using 
    this.account we use appwrite documentation methods like (createEmailPasswordSession, deleteSession etc... ) */
}
const authentication = new authentication_Service(); 
export default authentication;

/*
What we are doing here:-
 1)Import confige which has stored a our id's
 2)Import Client, Account, Id because every thing happen with these
 3)We create a { authentication_Service } class because:-
    i) we want separate UI Logic and Backend Logic.
    ii) Because of that we create Class using this we can access all methods inside it.
  4)To access all methods from class we has to create object every where that's why
    we create one object { authen } object so we can access our methods using { .this } method.
  5)In class we create one property. Variable { Client } and store value inside it is {new Client}
  6){Client} is use to stablish communication between appwrite and react
  7){new} keyword is use to create new [Object] 
  8)create one account variable because we don't want create account in class because it will store there default and it's wast of resources 
  that's why we only create empty variable. 
  9)What we want that when some one create objects than {Client} should create
  10)For that we use {constructor} which automatically created whenever objects create in short when user create {authen} constructor will appear
  and methods inside it will execute.

  11)In constructor we choose client class using this.Client and put the Id's in setEndPoint and setProject 
  12)At last we choose {account} variable and store one object created using [new] keyword and put the all value inside it using {this.Client}
  */
