// Feito na versão 7 do MongoDB
// Bulk delete para a collection my-db.my-collection (do que não tiver o campo createdAt)
use my-db

// Estimativa da qtd
db["my-collection"].count()
// 763913


db["my-collection"].createIndex({CreatedAt:1, _id:1})

let bulkArray = [];
let result =   db["my-collection"].find({CreatedAt:{$exists: false}}, {_id:1});
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

