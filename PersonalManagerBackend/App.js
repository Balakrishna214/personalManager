const express = require("express");
const { request } = require("http");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3008, () => {
      console.log("Server Running at http://localhost:3008/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/getContacts",async (request,response)=>{
    const getContactsQuery=`
    select * from contacts;
    `
    const contactsArray=await db.all(getContactsQuery);
    response.send(contactsArray)
})

