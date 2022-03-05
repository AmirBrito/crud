import { createConnection } from "typeorm";

createConnection().then(
    async () => {console.log("Database UP!")})
    .catch(error => console.log(error));