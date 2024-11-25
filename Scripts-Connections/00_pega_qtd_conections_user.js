// ### Pega qtdconexoes por cada app 
db.currentOp(true).inprog.reduce(
  (accumulator, connection) => {
      appName = connection.appName;
      accumulator[appName] = (accumulator[appName] || 0) + 1;
      accumulator["TOTAL_CONNECTION_COUNT"]++;
      return accumulator;
  },
  { TOTAL_CONNECTION_COUNT: 0 }
)   


// Pega qtd conexões para 1 app, alterando o APP_NAME pelo nome da app:

operations = db.currentOp(true);
webhook = operations.inprog.filter(item => item.appName ==  "APP_NAME");
webhook.reduce(
  (accumulator, connection) => {
      appName = connection.appName;
      accumulator[appName] = (accumulator[appName] || 0) + 1;
      accumulator["TOTAL_CONNECTION_COUNT"]++;
      return accumulator;
  },
  { TOTAL_CONNECTION_COUNT: 0 }
) ;