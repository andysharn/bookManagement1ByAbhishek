const app = require("./app");
const dotenv = require("dotenv");
const connectdatabase = require("./config/database");

// setting up dotenv 
dotenv.config({ path: "./config/config.env" });

// for handling uncaught exception
process.on("uncaughtException",(err)=>{
console.error(`error is  : ${err.message}`);
console.log(`shutting down the server due to uncaught exception `);
process.exit(1);
});

// for unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`error:${err.message}`)
    console.log(`shutting down the server due to unhandled promise rejection `);
    server.close(()=>{
        process.exit(1);
    })
});

//connection of database
connectdatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
