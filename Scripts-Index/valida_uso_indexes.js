use admin
db.adminCommand('listDatabases').databases.forEach(function(e){
    if ((e.name == "admin" || e.name == "config" || e.name == "local")) return;
    var database=e.name;
    context=db.getSiblingDB(database);
    context.getCollectionNames({ type: "collection" }).forEach(function(collection){
        records=context.getCollection(collection).aggregate( 
                [ 
                    { $indexStats: { } },
                    {
                        "$group" :
                        {
                            _id : { name: "$name"},
                            accesses:{$sum:"$accesses.ops"},
                            since:{$min:"$accesses.since"},
                        }
                    },
                    {
                        "$project": 
                        {
                            _id:0,
                            name:"$_id.name",
                            since:{ $dateToString: { format: "%Y-%m-%d-%H:%M:%S", date: "$since" } },
                            accesses:"$accesses",
                        }
                    }
                ]
            ).forEach(function(index){
                idx=index.name;
                since=index.since;
                accesses=index.accesses;
                print(database+";"+collection+";"+idx+";"+since+";"+accesses);
            });
    });
});