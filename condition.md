### Objetivo:
  Para o exemplo de objetos abaixo, deseja-se pegar apenas os dados dos campos:<br>
  1 - ContractKey (Se não for preenchido, usar o valor do Contract.ControlData.ContractEffectId),<br>
  2 - Contract.ControlData.ContractEffectId,<br>
  3 - TradeRepository,<br>
  4 - CreatedAt<br>

<br>

**Para isso, foi criada a query abaixo (mas que não atendia 100%)**:

// Query original:
```
db["contract-registration-request"].aggregate([
    {
    $project: {
    _id: 0,
    ContractKey: {$cond: { if: { $eq: [ "$ContractKey", null ] }, then: "$Contract.ControlData.ContractEffectId", else: "$ContractKey" }},
    ContractEffectId:"$Contract.ControlData.ContractEffectId",
    TradeRepository: 1,
    LastCreatedAt: "$CreatedAt"
    }
    },
   { $out : "contract-tw-lastUpdate" }
   ])
```

Ela não atendia quando o campo ContractKey não existia. O campo precisava ser preenchido para funcionar o código acima.

Quando o campo ContractKey não existia o resultado obtido era como o exemplo abaixo:
```
   {
    "ContractEffectId" : "AAAAAA",
    "LastCreatedAt" : ISODate("2020-11-16T01:03:18.625+0000")
    }
```


**Para atender, foi necessário alterar para o código abaixo:**
// Código que atende para quando o campo não existe ou quando é preenchido:

```
db["contract-registration-request"].aggregate([
 {
 $project: {
 _id: 0,
 ContractKey: {$cond: [{$not: ["$ContractKey"]}, "$Contract.ControlData.ContractEffectId", "$ContractKey"]},
 ContractEffectId:"$Contract.ControlData.ContractEffectId",
 TradeRepository: 1,
 LastCreatedAt: "$CreatedAt"
 }
 }
, { $out : "contract-tw-lastUpdate" }
 ])
```

**Para entendimento mais claro, abaixo um exemplo de documento:**
-> As vezes possui o campo ContractKey (null ou com valor). às vezes o campo não existe.

// Quando o campo ContractKey não existe:
```
{
    "_id" : ObjectId("5fb1d14eaf1960544a176247"),
    "CreatedAt" : ISODate("2020-11-16T01:03:18.625+0000"),
    "Key" : "KEY1",
    "IsCancelled" : false,
    "Contract" : {
        "ControlData" : {
            "CreatedDate" : "2020-11-16",
            "ReferenceDate" : "2020-11-16",
            "ContractEffectId" : "ContractEffectId1",
            "RenegotiatedContractEffectId" : null
        },
        "EffectType" : NumberInt(0),
        "WarrantyType" : NumberInt(0),
        "OperationType" : NumberInt(0),
        "ContractDueDate" : "2020-11-15",
        "SignatureDate" : "2020-11-15",
        "BalanceDue" : NumberLong(10000),
        "CommittedEffectAmount" : NumberLong(10000),
        "DivisionMethod" : NumberInt(1),
        "PercentageValue" : NumberInt(0),
        "EffectStrategy" : NumberInt(1),
        "ContractBeneficiaryDocument" : "CNPJ",
        "ContractExternId" : null
    }
}
```


//Quando o campo existe:

```
{
    "_id" : ObjectId("641af79bbb3a43f84f3991b1"),
    "CreatedAt" : ISODate("2023-03-22T12:42:03.090+0000"),
    "Key" : "Key2",
    "ProcessKey" : "ProcessKey112",
    "TradeRepository" : "TradeRepository123",
    "IsCancelled" : false,
    "IsProcessed" : false,
    "Status" : NumberInt(0),
    "Reason" : null,
    "ContractKey" : null,
    "Contract" : {
        "ControlData" : {
            "CreatedDate" : "2023-03-22",
            "ReferenceDate" : "2023-03-22",
            "ContractEffectId" : "ContractEffectId233",
            "RenegotiatedContractEffectId" : null,
            "ReceivablesCount" : NumberInt(14948)
        },
        "EffectType" : NumberInt(0),
        "PercentageValue" : NumberLong(0),
        "WarrantyType" : NumberInt(0),
        "OperationType" : NumberInt(0),
        "ContractDueDate" : "2023-04-20",
        "SignatureDate" : "2023-03-20",
        "BalanceDue" : NumberLong(13461600000),
        "CommittedEffectAmount" : NumberLong(3000),
        "DivisionMethod" : NumberInt(1),
        "EffectStrategy" : NumberInt(1),
        "ContractBeneficiaryDocument" : "ContractBeneficiaryDocument123",
        "ContractExternId" : "CT-ROBOTD631",
        "ContractStructure" : [
                    {
                        "ExpectedSettlementDate" : "2059-09-03",
                        "CommittedAmount" : NumberLong(150000),
                        "TotalConstitutedAmount" : null,
                        "RequestedEffectAmount" : NumberLong(150000),
                        "CommittedEffectAmount" : null,
                        "AmountToConstitute" : null,
                        "Priority" : null
                    },
                    ...
                    {
                        "ExpectedSettlementDate" : "2059-12-16",
                        "CommittedAmount" : NumberLong(150000),
                        "TotalConstitutedAmount" : null,
                        "RequestedEffectAmount" : NumberLong(150000),
                        "CommittedEffectAmount" : null,
                        "AmountToConstitute" : null,
                        "Priority" : null
                    },
                ],
                
            }
        ]
    }
}

```
