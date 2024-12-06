db = db.getSiblingDB("my-db");
	var myCursor = db['my-collection'].find({"tenantId" : "X1"}, {type:1, name:1, created:1});
var list = [];

	while (myCursor.hasNext()) {
	   list.push(myCursor.next());


	}
	print(tojson(list));
