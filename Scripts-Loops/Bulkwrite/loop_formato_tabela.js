// Salvar o código abaixo num ARQUIVO.js e o executar com o comando abaixo:
// mongo HOST/BANCO ARQUIVO.js -u USUARIO -pSENHA > NOME_ARQUIVO_SAIDA.csv

db = db.getSiblingDB("my-db");
db['my-collection'].find({"tenantId" : "X1"}, {type:1, name:1}).forEach(function(doc){
	print("_id: "+ doc._id + "; type: " + doc.type +  "; name: " + doc.name)
});

