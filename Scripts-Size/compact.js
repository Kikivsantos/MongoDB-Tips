// Rodar compact (do log de replicação) - Rodar no secundário!
use local
db.runCommand({ "compact" : "oplog.rs" } )

// Rodar compact para outras collections:
// EX:
use agenda
db.runCommand({ "compact" : "agenda-rejected-interop" } );


// Ver quanto falta para liberar:
use local
db.getMongo().setReadPref('secondary')

db[ "oplog.rs"].stats().wiredTiger["block-manager"]["file bytes available for reuse"]/1024/1024/1024
