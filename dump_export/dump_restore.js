// ##### DUMP RESTORE com paralelismo:

// dump de todos os BDs (paralelizando as collections):
mongodump mongodb+srv://USER@HOST  --authenticationDatabase "admin" --numParallelCollections=8 --out /dumps/

//Restore - com paralelismo:
mongorestore  mongodb+srv://USER@HOST --authenticationDatabase "admin" --numInsertionWorkersPerCollection=8 /dumps/

// dump de um BD específico (paralelizando as collections):
mongodump mongodb+srv://USER@HOST/DATABASE  --authenticationDatabase "admin" --numParallelCollections=8 --out /dumps/

//Restore de um BD - com paralelismo:
mongorestore  mongodb+srv://USER@HOST/DATABASE --authenticationDatabase "admin" --numInsertionWorkersPerCollection=8 /dumps/DATABASE/

// com forceTableScan: => As vezes dá erro: mongodump Failed: error writing data for collection  to disk: error reading collection. O tablescan tende a resolver isso
mongodump  mongodb+srv://USER@HOST/DATABASE --authenticationDatabase "admin" --forceTableScan  --out /Users/cristiana.santos/dump/


//## para 1 collection:
mongodump  mongodb+srv://USER@HOST/DATABASE --collection NOME_COLLECTION --authenticationDatabase "admin"  --out ~/dumps


// dump com filtro de data - Saida para BSON:
mongodump mongodb+srv://USER:SENHA@HOST/DATABASE --db DATABASE --collection COLLECTION_NAME --query '{"DueDate" : { "$gte": { "$date": "2025-01-01T00:00:00.000Z" }, "$lt": {"$date": "2025-02-01T00:00:00.000Z"} } }' --out /Users/cristianasantos/dumps/dump_2025

//## Restore:
mongorestore mongodb+srv://USER:SENHA@HOST/DATABASE_DESTINO --collection 'COLLECTION_DESTINO'  --authenticationDatabase "admin" /Users/cristianasantos/dumps/dump_2025/DATABASE/FILE.bson



//## RESTORE LOCAL
mongorestore mongodb://127.0.0.1:27017 --db kiki C:\Users\CristianaValentedosS\dumps\billing

//## restore de 1 collection só (alterando o nome da collection no destino)
mongorestore mongodb+srv://USER@HOST/DATABASE --collection 'COLLECTION_NAME'  --authenticationDatabase "admin" C:\Users\CristianaValentedosS\dumps\billing\kiki3.bson


//Mongodump de uma collection com nome com caracteres inválidos:

mongodump --host HOST --username USUARIO -pSENHA --db BASE -c 'catchups, /api/catchups' --out - > foo.bson

//E o restore disso:
mongorestore --host HOST -u u_USUARIO -pSENHA --db BASE -c 'teste_novo_nome' foo.bson

//### Pegando com query (queryfile)
//** Isso as vezes dá erro:
mongodump  mongodb+srv://USER:SENHA@HOST/DATABASE -c COLLECTION_NAME --query '{"CreatedAt": {"$lte":{"$date":"2022-01-01T00:00:00.000Z"}}}' --authenticationDatabase "admin"  --out ~\dumps\

//** Para solucionar, usa-se o queryfile:

//Cria o arquivo queryfile.json com o seguinte conteúdo:
{"CreatedAt": {"$lte":{"$date":"2022-01-01T00:00:00.000Z"}}}

//Roda o dump passando o queryfile:
mongodump  mongodb+srv://dbre_cristianavs@HOST/DATABASE -c COLLECTION_NAME --queryFile queryfile.json --authenticationDatabase "admin"  --out ~\dumps\

