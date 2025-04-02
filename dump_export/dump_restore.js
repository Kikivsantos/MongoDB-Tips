// dump com filtro de data - Saida para BSON:
mongodump mongodb+srv://USER:SENHA@HOST/DATABASE --db DATABASE --collection COLLECTION_NAME --query '{"DueDate" : { "$gte": { "$date": "2025-01-01T00:00:00.000Z" }, "$lt": {"$date": "2025-02-01T00:00:00.000Z"} } }' --out /Users/cristianasantos/dumps/dump_2025

//## Restore:
mongorestore mongodb+srv://USER:SENHA@HOST/DATABASE_DESTINO --collection 'COLLECTION_DESTINO'  --authenticationDatabase "admin" /Users/cristianasantos/dumps/dump_2025/DATABASE/FILE.bson


