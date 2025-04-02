// ############# SAIDA PRA CSV:
// Export com filtro de data - Saida para CSV: 
mongoexport mongodb+srv://USER:SENHA@HOST/DATABASE --db DATABASE --collection COLLECTION_NAME --query '{"DueDate" : { "$gte": { "$date": "2022-02-01T00:00:00.000Z" }, "$lt": {"$date": "2022-03-01T00:00:00.000Z"} } }' --fields "_id,Key,Status,ParticipantDocument,Message,EventType,ProcessKey,CreatedAt,RegistryAt,ServiceName,SpanContextName,FileCompactPaths,DataKey,Data" --readPreference=secondary  --type=csv --out  NOME_ARQUIVO.csv 

//## export com nohup - no secundário para csv (atenção aos campos precisam ser separados por virgula e sem espaço)!
nohup ./mongoexport 'mongodb+srv://USER:SENHA@HOST/' -d="DATABASE_NAME" -c="COLLECTION_NAME" --fields "PositionKey,UpdatedAt" --readPreference=secondary  --type=csv --out  MY_FILE.csv &



// ############ SAÍDA PARA JSON:
// Export com filtro de data - Saida para JSON:
mongoexport --uri="mongodb+srv://USER@HOST/DATABASENAME"  --authenticationDatabase "admin" -c  "COLLECTION_NAME" --query '{"AssetHolder": "44217057000112"}'  --out  teste_result.json

//## com query $gt:

mongoexport 'mongodb+srv://USER:SENHA@HOST/' --authenticationDatabase "admin" -d BANCO -c 'COLLECTION' -q='{"CAMPO": {"$gte":"2022-08-01T00:00:00.207Z"}}'  --sort '{CAMPO2: -1}' --limit 1000  --out OUTPUT.json

//## com $and:
mongoexport 'mongodb+srv://USER:SENHA@HOST/' --authenticationDatabase "admin" -d BANCO -c 'COLLECTION' -q='{ "$and": [ {"CAMPO": {"$gte":"2021-01-01T00:00:00.207Z"}} , {"CAMPO": {"$lt":"2022-01-01T00:00:00.207Z"}}] }' --out ARQ_RESULT.json

// EXPORT COM LIMIT
mongoexport  'mongodb+srv://USER:SENHA@HOST/' --authenticationDatabase "admin" -d BANCO -c COLLECTION --limit 10000 --out /Users/cristianasantos/dump/NOME_ARQUIVO.json



// IMPORT FROM JSON:
mongoimport --host HOST --port PORT_NUMER --username USER --password PASS --collection COLLECTION_NAME --db DATABASE --file mdb1-examplenet.json

// IMPORT FROM CSV:
mongoimport --db DB_Name --collection Collection_Name --type=csv --headerline --file=Name-of-file-to-import

// IMPORT FROM CSV WITHOUT HEADER:
mongoimport 
   --collection=Collection_Name 
   --file=Name-of-file-to-import 
   --type=csv 
   --fields="username,”"identifier","one time password","recovery password","recovery account","one time code","recovery code","user id","first name","last name","birth year","gender",”department”,”company”,”country”



mongoimport 
    --headerline =>Para saber q a 1a linha é cabeçalho
   --drop => Para dropar a collection se ela já existe no destino


// IMPORT FROM CSV WITHOUT HEADER:
mongoimport \
   --collection='fields_option' \
   --file=without_header_row.csv \
   --type=csv \
   --fields="tripduration","starttime","stoptime","start station id","start station name","start station latitude","start station longitude","end station id","end station name","end station latitude","end station longitude","bikeid","usertype","birth year","gender"

// OU - Ter um arquivo para os nomes dos campos:
//ex: 
cat <<EOF > field_file.txt
tripduration
starttime
stoptime
start station id
start station name
start station latitude
start station longitude
end station id
end station name
end station latitude
end station longitude
bikeid
usertype
birth year
gender
EOF


//E aí, roda o import:
mongoimport \
   --collection='fieldfile_option' \
   --file=without_header_row.csv \
   --type=csv \
   --fieldFile=field_file.txt


// Vc tb pode colocar o arquivo de fields com os tipos dos campos (após o .) e passando o seguinte parâmetro no mongoimport: --columnsHaveTypes 
cat <<EOF > field_file_with_types.txt
tripduration.auto()
starttime.date(2006-01-02 15:04:05)
stoptime.date_go(2006-01-02T15:04:05Z)
start station id.auto()
start station name.auto()
start station latitude.auto()
start station longitude.auto()
end station id.auto()
end station name.auto()
end station latitude.auto()
end station longitude.auto()
bikeid.auto()
usertype.auto()
birth year.auto()
gender.auto()
EOF

// E aí, roda o import:
mongoimport --collection='with_types' \
--file=without_header_row.csv \
--type=csv \
--columnsHaveTypes \
--fieldFile=field_file_with_types.txt
--drop 

/********* Explicação:
--drop => Serve para dropar a collection do destino se já existir
--stopOnError => Para o import em caso de erro
--ignoreBlanks =>Ignora campos/colunas com valor vazio
--headerline => se o csv tiver cabeçalho.Serve para a primeira linha o import ignorar e não a importar
--numInsertionWorkers => Default = 1. Para arquivos mto grandes, vale colocar mais, para aumentar a velocidade de importação
*/

/*
EX: considere que tenho o csv com os campos abaixo:

data_criacao,dataUltimaAlteracao,tipo_documento,num_doc,PaymentScheme,TradeRepository,Status
2021-05-28T18:33:32.776Z,2021-05-28T18:33:32.776Z,CNPJ,23018705000131,MAC,04391007000132,ATIVO
2021-05-28T18:33:32.776Z,2021-05-28T18:33:32.776Z,CNPJ,23130728000133,MAC,04391007000132,ATIVO

=> Preciso informar os types:
*/

cat <<EOF > field_file_with_types.txt
CreatedAt.date_go(2006-01-02T15:04:05Z)
UpdatedAt.date_go(2006-01-02T15:04:05Z)
CommercialEstablishmentDocumentType.string()
CommercialEstablishmentDocument.string()
PaymentScheme.string()
TradeRepository.string()
Status.string()
EOF


// E aí, roda o import:
mongoimport --collection='with_types' \
--file=without_header_row.csv \
--type=csv \
--columnsHaveTypes \
--fieldFile=field_file_with_types.txt
--drop 

// IMPORT DE CSV COM HEADER, IGNORANDO CAMPOS VAZIOS E DROPANDO A COLLECTION:
mongoimport "mongodb+srv://USER@HOST/DATABASE" --ssl  --collection COLLECTION_NAME --type=csv --headerline --columnsHaveTypes --ignoreBlanks --drop --file=with_header_row.csv

