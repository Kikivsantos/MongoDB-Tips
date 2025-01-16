// EX: Pegando dados de uma collection para criar outra

// opção 2: Pegando TradeRepository quando o campo existe e é preenchido, ele vai preencher com o TradeRepository). E quando não existe (ou existe com null), fica com null
use contract-event
db["contract-registration-request"].aggregate([
 {
 $project: {
 _id: 1,
 ContractKey: "$Key",
 ContractEffectId:"$Contract.ControlData.ContractEffectId",
 TradeRepository: {$ifNull: ["$TradeRepository", null] },
 LastUpdatedAt: "$CreatedAt"
 }
 },
 { $out : "contract-tw-last-update" }
])

//### Agora, se quer que quando o campo não existir (ou quando for null) ele seja preenchido com o valor de outro campo, tenho que fazer como o código abaixo:
// Para o exemplo abaixo, quando o campo TradeRepository existir PREENCHIDO, ele trará o seu valor;
// Mas, quando o TradeRepository existir nulo ou não existir no documento, vai ser retornado o valor do campo Contract.ControlData.ContractEffectId.
db["contract-registration-request"].aggregate([
    {
    $project: {
    _id: 1,
    ContractKey: "$Key",
    ContractEffectId:"$Contract.ControlData.ContractEffectId",
    TradeRepository: {$cond: [{$not: ["$TradeRepository"]}, "$Contract.ControlData.ContractEffectId", "$TradeRepository"]},
    LastUpdatedAt: "$CreatedAt"
    }
    }
   ])
   
   