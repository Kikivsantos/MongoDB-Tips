// Essa é a forma mais rápida de pegar um join de 2 collections - COLLECTION_A e COLLECTION_B (sem lookup - Sem ser tão custoso).
// Faz bulkArray com N insertOne para só quando esse array tiver >=1k ser, então, feito o insert de todos os 1k de vez.
// Salva na COLLECTION_RESULT

// ATENÇÃO - SCRIPT FEITO PARA MONGODB VERSÃO 7

let bulkArray = [];
db["COLLECTION_A"].find({}).forEach(function (doc) {
  let result = db["COLLECTION_B"].find({
    "AssetHolder": doc._id,
    "OriginalAssetHolder": doc._id,
    "Debtor": doc.AcquirerDocument,
    "PaymentScheme": doc.PaymentScheme,
    "CreatedAt": {"$gte": ISODate("2023-03-01T03:00:00.000+0000"),  
            "$lt": ISODate("2023-03-30T03:00:00.049+0000")},
      }, { "_id": 0, "PositionKey": 1 });

  result.forEach(function (data) {
    if (data) {
      bulkArray.push({
        insertOne: { "document": data }
      });
    }
  });
//alterar valor conforme volumetria
  if (bulkArray.length >= 1000) { 
    try {
      let execute = db['COLLECTION_RESULT'].bulkWrite(bulkArray);
      print('Docs executed: ' + execute.insertedCount);
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
  }
});

//executar após o trecho acima
if (bulkArray.length > 0) {
  try {
    let execute = db['COLLECTION_RESULT'].bulkWrite(bulkArray);
    print('Docs executed: ' + execute.insertedCount);
  } catch (err) {
    print(err.message);
  }
}
