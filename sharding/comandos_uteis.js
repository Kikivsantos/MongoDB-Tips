// Visão geral do sharding - Mostra como dados estão distribuídos entre os shards, podemos usar:
sh.status()

// Verificar a chave de sharding de uma collection:
db.runCommand({ shardCollection: "nome_do_banco.nome_da_colecao" })


// Pegar a distribuição de uma collection:
db.getCollection('nome_da_colecao').getShardDistribution()

// Para pegar informações da configuração de um sharding
db.printShardingStatus()

// Para criar uma sharding collection
// Habilita sharding no banco (se já não estiver habilitado):
sh.enableSharding("nome_do_banco")

// Criar uma collection:
db.createCollection("nome_da_colecao")


// Fazer sharding de uma collection:
sh.shardCollection("nome_do_banco.nome_da_colecao", { "campo_chave_sharding": 1 })

// COM HASH:
sh.shardCollection("nome_do_banco.nome_da_colecao", { "campo_chave_sharding": "hashed" })
//=> NÃO É PERMITIDO HASH PARA CHAVE COMPOSTA

// Sharding de uma collection com shard key composta:
sh.shardCollection("DATABSE.COLLECTION", { "FIELD1": 1, "FIELD2": 1 })

