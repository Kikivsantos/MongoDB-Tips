
// Comando utilizado para pegar ID:
db.currentOp(
   {
     "active" : true,
     "secs_running" : { "$gt" : 10 },
     "ns" : /^NOME_DO_BD\./
   }
)

// Achar i UUID que ele traz no comando acima e usar no abaixo:
db.runCommand( { killSessions: [ { id: UUID("7e097da4-4c63-4700-9683-3352f173a53c") } ] } )

// A partir da versão 4.4, se for createIndex, rodar o kill da conexão através do comando dropIndex:
// Para kill de execução de criação de indice:

db.runCommand( { dropIndexes: "settlement-obligation-index", index: "DueDate_1_PositionKey_1_UpdatedAt_1" })

	// => O drop do index mata a conexão que está rodando o create!