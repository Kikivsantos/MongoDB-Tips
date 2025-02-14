// ATENÇÃO - SCRIPT FEITO PARA MONGODB VERSÃO 7
use interop-data
// Para atualizar de 1k em 1k e evitar uma carga muito grande de updates em paralelo:
let bulkArray = [];
let result =   db["INC0019662"].find();
    result.forEach(function (data) {
    if (data) {
      print(data._id);
      bulkArray.push({ updateMany: { filter: {'CustomerDocument': '09089356000118', 'DocumentNumber': data._id}, update: { $set: { Enabled: false } }} });
    }
//update de 1k em 1k
  if (bulkArray.length >= 1000) { 
    try {
      let execute = db['commercial-establishment'].bulkWrite(bulkArray);
      print( "Documents modifiedCount: " + execute.modifiedCount);
      print( "Documents matchedCount: " + execute.matchedCount);;
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
  }
});

//executar após o trecho acima
if (bulkArray.length > 0) {
  try {
//      printjson(bulkArray);
      let execute = db['commercial-establishment'].bulkWrite(bulkArray);
      print( "Documents modifiedCount: " + execute.modifiedCount);
      print( "Documents matchedCount: " + execute.matchedCount);
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
}




