#! /usr/bin/env node
import { CRUD } from "./crud.js";
const [,,firstCMD,secondCMD,thirdCMD]=process.argv;

const obj = {
    add: CRUD.addFunc,
    update: CRUD.updateFunc,
    delete: CRUD.deleteFunc,
    "mark-in-progress": CRUD.markProgress,
    "mark-done": CRUD.markDone,
    "list": CRUD.listUp,
    "help": CRUD.showHelp
};

try{
    obj[firstCMD](secondCMD,thirdCMD);
}catch(error){
    console.log("Invalid COMMAND. Type help to show avaliable command");
}

