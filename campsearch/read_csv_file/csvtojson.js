const csvtojson = require("csvtojson")
const mongodb = require("mongodb").MongoClient

let url = "mongodb://localhost:3000/"

csvtojson()
    .fromFile("michigan_state_park_campgrounds.csv")
.then(csvData =>{
    console.log(csvData)


mongodb.connect(
    url,
    {useNewUrlParser: true, usUnifiedTopology: true},
    (err, client) => {
        if (err) throw err

        client
            .db("camp-search")
            .collection("campsites")
            .insertMany(csvData, (err, res) =>{
                if(err) throw err

                console.log(`Inserted: ${res.insertedCount} rows`)
                client.close()
            })
    }
)
})