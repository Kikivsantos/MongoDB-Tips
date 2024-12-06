// Bulk delete para a collection my-db.my-collection (do que não tiver o campo consentIds preenchido)
use my-db

// Parte 1:
db["my-collection"].createIndex({"Receivables.ConsentIds":1})

db["my-collection"].count()

let bulkArray = [];
let result =   db["my-collection"].find({"Receivables.ConsentIds":null}, {_id:1});
    result.forEach(function (data) {
    if (data) {
      bulkArray.push({ deleteMany: { filter: { "_id": data._id} } });
    }
//delete de 1k em 1k
  if (bulkArray.length >= 1000) { 
    try {
      let execute = db["my-collection"].bulkWrite(bulkArray);
      print( "Documents deleted: " + execute.deletedCount);
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
  }
});

//executar após o trecho acima
if (bulkArray.length > 0) {
  try {
      let execute = db["my-collection"].bulkWrite(bulkArray);
      print( "Documents deleted: " + execute.deletedCount);
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
}


//Parte 2:

let bulkArray = [];
let result =   db["my-collection"].find({"Receivables.ConsentIds":[]}, {_id:1});
    result.forEach(function (data) {
    if (data) {
      bulkArray.push({ deleteMany: { filter: { "_id": data._id} } });
    }
//delete de 1k em 1k
  if (bulkArray.length >= 1000) { 
    try {
      let execute = db["my-collection"].bulkWrite(bulkArray);
      print( "Documents deleted: " + execute.deletedCount);
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
  }
});

//executar após o trecho acima
if (bulkArray.length > 0) {
  try {
      let execute = db["my-collection"].bulkWrite(bulkArray);
      print( "Documents deleted: " + execute.deletedCount);
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
}

