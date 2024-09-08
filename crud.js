import fs from "node:fs";

function addData(data){
    fs.writeFile("task.json",JSON.stringify(data),(err)=>{
        if(err) console.log("Erro Occur while saving data");
    });
}

function readData(){
    let data = {};
    try{
        data = fs.readFileSync("./data/task.json");
    }catch(err){
        data.taskData = [];
        data.nextId = 1;
        data = JSON.stringify(data);
    }
    return JSON.parse(data);
}


export class CRUD{

    static addFunc(taskName){
        if(!taskName){
            console.log("TASK NAME CANNOT BE EMPTY");
            return
        }

        const data = readData();
        const newId = data.nextId;

        data.nextId+=1;
        data.taskData.push(
            {
                id: newId,
                description: taskName,
                status: "todo",
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString()
            }
        );
        addData(data);
        console.log(`Task added successfully (ID: ${newId})`);
    }
    
    static updateFunc(taskId,newTaskName,status,updateStatus=false,deleteflg=false){
        let updataCount = 0;
        const id = Number(taskId);
        if(isNaN(id)){
            console.log("Invalid task id");
            return 
        }else if(!newTaskName && !updateStatus){
            console.log("New task name can not be empty");
            return
        }

        const data = readData();
        data.taskData = data.taskData.map(e=>{
            if(e.id==taskId){
                updataCount+=1;
                if(!deleteflg){
                    e.description = updateStatus?e.description:newTaskName;
                    e.updatedAt = new Date().toLocaleString();
                    e.status = status || e.status;
                }else{
                    return null;
                }
            }
            return e;
        })
        data.taskData = data.taskData.filter(e=>Boolean(e));
        if (updataCount<1){
            console.log(`No task with (ID: ${taskId}) found`);
        }else{
            addData(data);
            console.log(`Task ${deleteflg?"deleted":"updated"} SuccessFully ID: ${taskId}`);
        }
    }
    
    static deleteFunc(taskId){
        CRUD.updateFunc(taskId,"","",true,true);
    }

    static markProgress(taskId){
        CRUD.updateFunc(taskId,"","in-progress",true);
    }

    static markDone(taskId){
        CRUD.updateFunc(taskId,"","done",true);
    }

    static listUp(category){
        const categoryName = category || "all";
        const taskCategory = ["all","done","todo","in-progress"];
        if(taskCategory.indexOf(categoryName)<0){
            console.log("Invalid status");
            return
        }

        const data = readData();
        data.taskData.forEach(e=>{
            if(categoryName=="all" || e.status == category){
                console.log(e);
            }
        });
    }

    static showHelp(){
        const data = fs.readFileSync("./data/help.txt");
        console.log(data.toString());
    }
    
};
