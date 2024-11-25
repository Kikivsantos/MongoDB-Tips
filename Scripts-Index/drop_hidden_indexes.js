// Script para gerar o script de DROP dos índices que estão como HIDDEN:

// Switch to admin database and get list of databases.
use admin;
db.runCommand( { listDatabases: 1 } ).databases.forEach(function (BD) {

    if(BD.name == 'config' || BD.name =='admin' || BD.name == 'replset' || BD.name == 'local')
    { 
    }
    else {
        db = db.getSiblingDB(BD.name);
        print(" "); 
        print("use " + BD.name + ";")
                    
        db.getCollectionInfos({ type: "collection" }).forEach(function(v1) 
        {
              collection=v1.name;  
            indexes = db[collection].getIndexes();
                db[collection].getIndexes().forEach(function(indexes) {
                    // indices sem unique e sem weights:
                   if (indexes.hidden == true)
                   {
                      print("db['"+ collection+ "'].dropIndex('" + indexes.name + "');");
                   }
                   else
                   {
                         
                   }
                   
             })
             
     });
    }
});


