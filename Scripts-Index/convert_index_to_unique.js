// converter um índice já existente para UNIQUE:

// https://www.mongodb.com/pt-br/docs/rapid/core/index-unique/convert-to-unique/


use settlement-obligation-pointer

// Prepara do index para ser unique:
db.runCommand( {
   collMod: "settlement-obligation-pointer",
   index: {
      keyPattern: { SettlementObligationKey: 1 },
      prepareUnique: true
   }
} );

// Impossibilita que duplicados sejam inseridos:
db.runCommand( { 
   collMod: "settlement-obligation-pointer",
   index: {
      keyPattern: { SettlementObligationKey: 1 },
      unique: true
   },
   dryRun: true
} );


// Transforma o index em Unique:
db.runCommand( {
   collMod: "settlement-obligation-pointer",
   index: {
      keyPattern: { SettlementObligationKey: 1 },
      unique: true
   }
} );
    // Se o comando acima der erro, temos 2 opções:
    // 1 - Deletar o que houver duplicado (deixando apenas um elemento para cada SettlementObligationKey) e após o delete, rodar o último comando novamente
    // OU:
    // 2 - Fazer rollback:
    // O index volta a pemitir novos duplicados:
    db.runCommand( {
        collMod: "settlement-obligation-pointer",
        index: {
           keyPattern: { SettlementObligationKey: 1 },
           prepareUnique: false
        }
     } )
