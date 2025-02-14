// Comando para fazer a exclusão do embendded doc (Receivables.SettlementExpectations) para apenas 1 documento:
/*
db["agenda-receivable-external"].updateOne(
    {"_id" : ObjectId("66fc55c60156ead8de11b7da")},
    { $unset: { "Receivables.$[].SettlementExpectations": "" } }
);
*/

use interop-data

// Para fazer para toda a collection de forma mais performática (de 1k em 1k):
// Para atualizar de 1k em 1k e evitar uma carga muito grande de updates em paralelo:
let bulkArray = [];
let result =  db["agenda-receivable-external"].find({}, {_id:1});
    result.forEach(function (data) {
    if (data) {
      bulkArray.push({ updateMany: { filter: {'_id': data._id}, update: { $unset: { "Receivables.$[].SettlementExpectations": "" } }} });
    }
//update de 1k em 1k
  if (bulkArray.length >= 1000) { 
    try {
      let execute = db["agenda-receivable-external"].bulkWrite(bulkArray);
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
      let execute = db["agenda-receivable-external"].bulkWrite(bulkArray);
      print( "Documents modifiedCount: " + execute.modifiedCount);
      print( "Documents matchedCount: " + execute.matchedCount);
      bulkArray = [];
    } catch (err) {
      print(err.message);
    }
}



// Explicação do que o comando acima faz:
/*
TENHO O DOCUMENTO ABAIXO NO MEU BANCO :
 - QUERO REMOVER O SUBDOCUMENTO SettlementExpectations DE DENTRO DO SUBDOCUMENTO Receivables
{
    "_id" : ObjectId("66fc55c60156ead8de11b7da"),
    "Key" : "XXXX5",
    "CreatedAt" : ISODate("2024-10-01T20:04:22.000+0000"),
    "Receivables" : [
        {
            "ConsentIds" : [
                "xxx1344"
            ],
            "CreditorDocument" : null,
            "AcquirerDocument" : "50000000000000",
            "OriginalAssetHolderDocument" : "22222222222222",
            "PaymentScheme" : "VCC",
            "SettlementExpectations" : [
                {
                    "Reference" : null,
                    "PositionKey" : null,
                    "ExpectedSettlementDate" : "2024-03-17",
                    "TotalAmount" : NumberLong(100000000),
                    "PrePaidAmount" : NumberLong(0),
                    "Settlements" : [
                        {
                            "ObligationType" : NumberInt(1),
                            "ContractEffectId" : null,
                            "EffectPriority" : null,
                            "EffectiveDueDate" : null,
                            "EffectAmount" : null,
                            "SettlementBankAccount" : [
                                {
                                    "AccountType" : NumberInt(4),
                                    "Branch" : null,
                                    "Account" : "88888",
                                    "AccountDigit" : "88",
                                    "Ispb" : "12345678",
                                    "DocumentType" : "CNPJ",
                                    "DocumentNumber" : "92222222222222",
                                    "SettledAmount" : NumberLong(100000000),
                                    "AmountRequestedEffect" : null,
                                    "AmountCommittedEffect" : null,
                                    "AmountToConstitute" : null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}


#### APÓS O UPDATE, O DOCUMENTO ACIMA FICA ASSIM:
{
    "_id" : ObjectId("66fc55c60156ead8de11b7da"),
    "Key" : "XXXX5",
    "CreatedAt" : ISODate("2024-10-01T20:04:22.000+0000"),
    "Receivables" : [
        {
            "ConsentIds" : [
                "xxx1344"
            ],
            "CreditorDocument" : null,
            "AcquirerDocument" : "50000000000000",
            "OriginalAssetHolderDocument" : "22222222222222",
            "PaymentScheme" : "VCC"
        }
    ]
}



*/
