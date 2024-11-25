// Switch to admin database and get list of databases.
use admin;

print("Collections sem índices!")
db.runCommand( { listDatabases: 1 } ).databases.forEach(function (BD) {

    if(!(BD.name == 'config' || BD.name =='admin' || BD.name == 'replset' || BD.name == 'local'))
    { 
        db = db.getSiblingDB(BD.name);
        print(" ");
        db.getCollectionInfos({ type: "collection" }).forEach(function(v1) 
        {
            qtd_index_hiden=0;
            collection=v1.name;  
            idx = db[collection].getIndexes();
            if(idx.length == 1) 
            {
                print("Collection sem índice nenhum!");
                print( BD.name + "." + collection);
            }
            else
            {
                db[collection].getIndexes().forEach(function(indexes) {
                    if (indexes.hidden == true)
                   {
                        qtd_index_hiden=qtd_index_hiden+1;
                   }
                })   
                if(qtd_index_hiden+1 == idx.length)   
                {
                    print("Todos os idx são hidden- logo é como se não tivesse índices");
                    print( BD.name + "." + collection);
                }
 
            }
    });
    }
});

