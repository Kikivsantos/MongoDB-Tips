
var db_stats;
var db_total_size;
db_stats = db.stats();
db_total_size=db_stats.dataSize+db_stats.indexSize ;
print("DB: " + db_stats.db + "; number of collections: " + db_stats.collections + "; Number of objects (across all collections): "+ db_stats.objects + "; Average Doc Size: " + db_stats.avgObjSize + "; Collections Size: " + db_stats.dataSize + "; Storage Size: "+ db_stats.storageSize + "; Number of Indexes: " + db_stats.indexes + "; Index Size: " + db_stats.indexSize + "; Total Size: " + db_total_size);

var coll_stats;
db.getCollectionNames().forEach(function(collname) {
    if (/system/i.test(collname))
    {}
    else
    {
        print("************************ " + collname + " ************************");
        coll_stats = db[collname].stats();
        print("* Size: " + coll_stats.size + " Bytes; Number of Objects: "+ coll_stats.count + "; Average Object Size: " + coll_stats.avgObjSize + " Bytes; Storage Size: " + coll_stats.storageSize + " Bytes; Number of Indexes: " + coll_stats.nindexes + "; Total Index Size:"+ coll_stats.totalIndexSize + " Bytes");
        print("* Indexes Size Detailed for collection: " + collname);
        print("* Indexes Sizes: ");
        printjson(coll_stats.indexSizes); 
    }
});