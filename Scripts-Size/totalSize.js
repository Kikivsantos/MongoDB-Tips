
var totalSize = 0;
var totalSizeColl = 0;
var totalReusableSize = 0;
var totalIndexSize = 0;
var totalLogicalSize = 0
db.getMongo().getDBNames().forEach(function (d) {
{
        db.getSiblingDB(d).getCollectionInfos( {type: 'collection'}).forEach(function (v1) {
            var coll = v1.name;
            var stat = db.getSiblingDB(d).getCollection(coll).stats();
            var namespace = stat.ns;
            var count = stat.count;
            var storageSize = stat.storageSize/1024/1024/1024; 
            var IdxSize = stat.totalIndexSize/1024/1024/1024;
            var logicalSize = stat.size/1024/1024/1024;
            var reusableSize = stat.wiredTiger["block-manager"]["file bytes available for reuse"]/1024/1024/1024;
            totalSizeColl += storageSize;
            totalReusableSize += reusableSize;
            totalIndexSize += IdxSize;
            totalSize = totalIndexSize + totalSizeColl;
            totalLogicalSize = totalLogicalSize + logicalSize;
            printjson({
                'namespace': namespace,
                'count': count,
                'LogicalSize': logicalSize,
                'storageSizeColl': storageSize ,
                'file bytes available for reuse': reusableSize,
                'Index Size': IdxSize,
                'Total Size': storageSize+IdxSize
            });
        });
    }
});

print("Total Logical Size: "+ totalLogicalSize+ "GB"),("\nTotal Storage Size: " + totalSize + " GB"),("Total Reusable Size: " + totalReusableSize + " GB");
