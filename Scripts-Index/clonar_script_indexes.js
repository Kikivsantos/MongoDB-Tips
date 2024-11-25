

// ############## NOVO: - Com indexes TTL e com indexes partial

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
             print("// ******* Indexes for " + collection + ":");
            indexes = db[collection].getIndexes();
                db[collection].getIndexes().forEach(function(indexes) {
                    // indices sem unique e sem weights e sem partial expression e sem expireAfterSeconds:
                    if(indexes.name != "_id_" && JSON.stringify(indexes.weights) == null && JSON.stringify(indexes.unique)  == null  && JSON.stringify(indexes.partialFilterExpression)  == null && JSON.stringify(indexes.expireAfterSeconds)  == null  )
                    {
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "', hidden: true});");
                        }
                        else
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "'});");        
                        
                        }
                        
                    }
                    // indices com unique e sem weights e sem partial expression e sem expireAfterSeconds:
                    else if(indexes.name != "_id_" && JSON.stringify(indexes.weights) == null  && JSON.stringify(indexes.partialFilterExpression)  == null && JSON.stringify(indexes.expireAfterSeconds)  == null  ) 
                    {
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + " ,{ unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "', hidden: true});");
                        }
                        else
                        {
                             print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + " ,{ unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "' });");
                        }
                     }
                    // indices sem unique e com weights e sem partial expression e sem expireAfterSeconds:
                     else if(indexes.name != "_id_" && JSON.stringify(indexes.unique)  == null && JSON.stringify(indexes.partialFilterExpression)  == null && JSON.stringify(indexes.expireAfterSeconds)  == null  )
                     {
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + ", name: '" + indexes.name + "', hidden: true});");   
                        }
                        else{
                             print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + ", name: '" + indexes.name + "'});");    
                        }
                     }
                    // indices com unique e com weights e sem partial expression e sem expireAfterSeconds:
                    else if(indexes.name != "_id_" && JSON.stringify(indexes.weights) != null && JSON.stringify(indexes.unique)  != null && JSON.stringify(indexes.partialFilterExpression)  == null && JSON.stringify(indexes.expireAfterSeconds)  == null  )
                    {
                        if (indexes.hidden == true)
                        {   
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + " , unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "', hidden: true});");
                        }
                        else {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + " , unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "'});");
                        }
                    }
                    // Indices sem unique, sem weights e com partial expression e sem expireAfterSeconds: 
                    else if (indexes.name != "_id_" && JSON.stringify(indexes.weights) == null && JSON.stringify(indexes.unique)  == null && JSON.stringify(indexes.partialFilterExpression)  != null && JSON.stringify(indexes.expireAfterSeconds)  == null ){
                        if (indexes.hidden == true)
                        {
                            printjson("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "', hidden: true, 'partialFilterExpression': " + JSON.stringify(indexes.partialFilterExpression) + "}});");
                        }
                        else
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "', 'partialFilterExpression': " + JSON.stringify(indexes.partialFilterExpression) + "}});");      
                        
                        }
                    }
                    // Indices sem unique, sem weights e com partial expression e com expireAfterSeconds: 
                    else if (indexes.name != "_id_" && JSON.stringify(indexes.weights) == null && JSON.stringify(indexes.unique)  == null && JSON.stringify(indexes.partialFilterExpression)  != null && JSON.stringify(indexes.expireAfterSeconds)  != null ){
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "', 'partialFilterExpression': " + JSON.stringify(indexes.partialFilterExpression) + " , 'expireAfterSeconds':" +  indexes.expireAfterSeconds + "', hidden: true});");        

                        }
                        else
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "', 'partialFilterExpression':" + JSON.stringify(indexes.partialFilterExpression) + " , 'expireAfterSeconds':" +  indexes.expireAfterSeconds + "});");        
                        
                        }
                    }
                    // Indices sem unique, sem weights e sem partial expression e com expireAfterSeconds:
                    else if (indexes.name != "_id_"  && JSON.stringify(indexes.weights) == null && JSON.stringify(indexes.unique)  == null && JSON.stringify(indexes.partialFilterExpression)  == null && JSON.stringify(indexes.expireAfterSeconds)  != null){
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "', hidden: true"  + "' , 'expireAfterSeconds':" +  indexes.expireAfterSeconds + "});");
                        }
                        else
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "' , 'expireAfterSeconds':" + indexes.expireAfterSeconds + "});");        
                        
                        }
                    }
                    
                    
             })
             
     });
    }
});


/*###################### ANTIGO:

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
             print("// ******* Indexes for " + collection + ":");
            indexes = db[collection].getIndexes();
                db[collection].getIndexes().forEach(function(indexes) {
                    // indices sem unique e sem weights:
                    if(indexes.name != "_id_" && JSON.stringify(indexes.weights) == null && JSON.stringify(indexes.unique)  == null )
                    {
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "', hidden: true});");
                        }
                        else
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) +  ", { name: '" + indexes.name + "'});");        
                        
                        }
                        
                    }
                    // indices com unique e sem weights:
                    else if(indexes.name != "_id_" && JSON.stringify(indexes.weights) == null) 
                    {
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + " ,{ unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "', hidden: true});");
                        }
                        else
                        {
                             print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + " ,{ unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "' });");
                        }
                     }
                    // indices sem unique e com weights:
                     else if(indexes.name != "_id_" && JSON.stringify(indexes.unique)  == null )
                     {
                        if (indexes.hidden == true)
                        {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + ", name: '" + indexes.name + "', hidden: true});");   
                        }
                        else{
                             print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + ", name: '" + indexes.name + "'});");    
                        }
                     }
                    // indices com unique e com weights:
                    else if(indexes.name != "_id_" && JSON.stringify(indexes.weights) != null && JSON.stringify(indexes.unique)  != null)
                    {
                        if (indexes.hidden == true)
                        {   
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + " , unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "', hidden: true});");
                        }
                        else {
                            print("db['"+ collection+ "'].createIndex(" + JSON.stringify(indexes.key) + ",{weights: "+ JSON.stringify(indexes.weights) + " , unique: "+ JSON.stringify(indexes.unique) + " , name: '" + indexes.name + "'});");
                        }
                    }
                    
             })
             
     });
    }
});

*/