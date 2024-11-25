// Se o cluster for replica set:
//Active Indexing Operations
idx = db.adminCommand(
    {
      currentOp: true,
      $or: [
        { op: "command", "command.createIndexes": { $exists: true }  },
        { op: "none", "msg" : /^Index Build/ }
      ]
    }
)

print(idx.inprog[1].msg)


// Se o cluster for sharding:
db.currentOp(
   {
     "active" : true,
     "secs_running" : { "$gt" : 0 }
    //, "ns" : /^NOME-DB\./
     , op: "command", "msg":/Index/
   }).inprog.forEach(function(op){ if(op.msg) print(op.msg) })
