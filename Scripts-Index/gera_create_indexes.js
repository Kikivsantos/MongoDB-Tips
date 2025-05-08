
// mongosh gera_create_indexes.js > result_basic.js


const connectionString = "mongodb+srv://USER:SENHA@HOST/";
const client = new Mongo(connectionString);
const db = client.getDB("DATABASE_NAME");

db.getCollectionInfos({ type: "collection" }).forEach(function(v1) {
    var collection = v1.name;
    if (collection.includes("system.")) {
        return; // Pula para a próxima iteração do loop
    }


    if (collection.includes("-")){
        print("// ******* Indexes for " + collection + ":");
        print("print('Starting to create indexes for the collection: " + collection + "');");
        
        var indexes = db[collection].getIndexes();
        
        indexes.forEach(function(index) {
            if (index.name === "_id_") {
                return; // Pula índices padrão do MongoDB
            }
    
            var options = {
                name: index.name
            };
    
            if (index.hidden) {
                options.hidden = true;
            }
            if (index.unique) {
                options.unique = index.unique;
            }
            if (index.weights) {
                options.weights = index.weights;
            }
            if (index.partialFilterExpression) {
                options.partialFilterExpression = index.partialFilterExpression;
            }
            if (index.expireAfterSeconds) {
                options.expireAfterSeconds = index.expireAfterSeconds;
            }
    
            print("db['" + collection + "'].createIndex(" + JSON.stringify(index.key) + ", " + JSON.stringify(options) + ");");
        });
    
    }

});
