// Esse script pega o quanto de espaço disponível cada collection do cluster possui.
// Muito útil para quando um volume grande de dados é removido do banco (ex: Criação de TTL em base que já possuia muitos dados);
// Com isso, conseguimos avaliar se vale a pena rodar o compact ou não.
// vai printar o valor disponível para cada collection e tb o valor TOTAL disponível no cluster

var totalSize = 0;
var totalSizeColl = 0;
var totalReusableSize = 0;
var totalIndexSize = 0;
db.getMongo().getDBNames().forEach(function (d) {
{
        db.getSiblingDB(d).getCollectionInfos( {type: 'collection'}).forEach(function (v1) {
            var coll = v1.name;
            var stat = db.getSiblingDB(d).getCollection(coll).stats();
            var namespace = stat.ns;
            var count = stat.count;
            var storageSize = stat.storageSize/1024/1024/1024; 
            var IdxSize = stat.totalIndexSize/1024/1024/1024;
            var reusableSize = stat.wiredTiger["block-manager"]["file bytes available for reuse"]/1024/1024/1024;
            totalSizeColl += storageSize;
            totalReusableSize += reusableSize;
            totalIndexSize += IdxSize;
            totalSize = totalIndexSize + totalSizeColl;
            printjson({
                'namespace': namespace,
                'count': count,
                'storageSizeColl': storageSize ,
                'file bytes available for reuse': reusableSize,
                'Index Size': IdxSize,
                'Total Size': storageSize+IdxSize
            });
        });
    }
});

print("\nTotal Storage Size: " + totalSize + " GB"),("Total Reusable Size: " + totalReusableSize + " GB");

