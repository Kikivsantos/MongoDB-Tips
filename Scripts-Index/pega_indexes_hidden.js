// Pega indexes colocados em hidden (para todas as bases.collections):

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
                    // indices hidden:
                   if (indexes.hidden == true)
                   {
                      print("COLLECTION: '"+ collection+ "' - Index_name: '" + indexes.name + "' - hidden: true);");
                   }
                   else
                   {
                         
                   }
                   
             })
             
     });
    }
});



