
// Cria um array vazio para armazenar os dados dos índices (um para indexes usados e outro para sem uso)
var indexesUsadosArray = [];
var indexesSemUsoArray = [];

// Lê todas as bases de dados:
dbs = db.getMongo().getDBNames();
dbs.forEach(function (d) {
    if (!["admin", "config", "local"].includes(d)) {
        // Para cada base, lê todas as coleções:
        collections = db.getSiblingDB(d).getCollectionNames();
        collections.forEach(function (coll) {
            if (/system/i.test(coll)) {
                // Ignora coleções de sistema
            } else {
                // Para cada coleção, lê as informações dos índices:
                indexStats = db.getSiblingDB(d).getCollection(coll).aggregate([{
                    $indexStats: {}
                }]);

                indexStats.forEach(function (indexS) {
                    var index_name = indexS.name;
                    var num_accesses = indexS.accesses.ops;
                    var sinceAccess = indexS.accesses.since;

                    // Se o número de acessos for maior que 0, armazene os dados no array indexesUsadosArray
                    if (num_accesses > 0) {
                        // Cria um documento para armazenar os dados do índice
                        var indexDoc = {
                            database: d,
                            collection: coll,
                            index_name: index_name,
                            num_accesses: num_accesses,
                            sinceAccess: sinceAccess
                        };

                        // Adiciona o documento ao array de Indexes usados:
                        indexesUsadosArray.push(indexDoc);

                        // Exibe as informações no console, caso necessário
                        //print("Index: " + index_name + " - Number of accesses: " + num_accesses + " - Since: " + sinceAccess);
                    }
                    else{
                        // Cria um documento para armazenar os dados do índice no array de Indexes sem uso (indexesSemUsoArray)
                        var indexDoc = {
                            database: d,
                            collection: coll,
                            index_name: index_name,
                            num_accesses: num_accesses,
                            sinceAccess: sinceAccess
                        };

                        // Adiciona o documento ao array
                        indexesSemUsoArray.push(indexDoc);

                        // Exibe as informações no console, caso necessário
                        //print("Index: " + index_name + " - Number of accesses: " + num_accesses + " - Since: " + sinceAccess);
                    }
                });
            }
        });
    }
});

// Exibe a quantidade de índices usados e não usados
print("Número de índices usados: " + indexesUsadosArray.length);
// Exibe todos os indexes em uso:
printjson(indexesUsadosArray);
print("Número de índices sem uso: " + indexesSemUsoArray.length);
// Exibe todos os indexes sem uso:
printjson(indexesSemUsoArray);
