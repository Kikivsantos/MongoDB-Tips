//bsondump => Serve para converter um arquivo bson (gerado através do mongodump) para um json (human-readable format)
//link da doc: https://www.mongodb.com/docs/database-tools/bsondump/#mongodb-binary-bin.bsondump


bsondump  --outFile=ARQUIVO_DESTINO_JSON.json ARQUIVO_ORIGEM_DUMP.bson

//EX:
//Linux:
bsondump --outFile=teste.json DESTINATION.bson


//WINDOWS:
.\bsondump.exe --outFile=teste.json DESTINATION.bson

