let bulkArray = [];
let result = db["teste7com"].find();
result.forEach(function (data) {
    if (data) {
        // print(data._id);
        ServiceId_format = BinData(3,data.ServiceId);
        bulkArray.push({ updateMany: { filter: {'ServiceId': ServiceId_format}, update: { $set: { BillingStatus: 6, RejectedDate: ISODate("2024-06-28T00:00:00.817+0000") } }} });
    }
//update de 1k em 1k
    if (bulkArray.length >= 1000) { 
        try {
            let execute = db['billing'].bulkWrite(bulkArray);
            print( "Documents modifiedCount: " + execute.modifiedCount);
            print( "Documents matchedCount: " + execute.matchedCount);;
            bulkArray = [];
        } catch (err) {
            print(err.message);
        }
    }
});
//executar após o trecho acima
if (bulkArray.length > 0) {
    try {
        // printjson(bulkArray);
        let execute = db['billing'].bulkWrite(bulkArray);
        print( "Documents modifiedCount: " + execute.modifiedCount);
        print( "Documents matchedCount: " + execute.matchedCount);
        bulkArray = [];
    } catch (err) {
        print(err.message);
    }
}