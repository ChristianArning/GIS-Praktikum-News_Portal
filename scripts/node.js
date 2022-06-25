const http = require("http");

const hostname = "127.0.0.1"; // localhost
const port = 3000;

const mongodb = require("mongodb");

const url = "mongodb://localhost:27017"; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(url);

async function startServer() {
    // connect to database
    await mongoClient.connect();
    // listen for requests
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

startServer();

const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    const url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/":
            response.write("Hello World");
            break;
        case "/search":
            if (request.method === "POST") {
                let jsonString = "";
                request.on("data", (data) => {
                    jsonString += data;
                });
                request.on("end", () => {
                    console.log(JSON.parse(jsonString));
                    response.end("Success!");
                });
            }
            break;
        case "/articleobj":
            {
                const articleCollection = mongoClient.db("newsportal").collection("article");
                switch (request.method) {
                    case "GET":
                        const result = await bananaCollection.find({}).toArray();
                        response.end(JSON.stringify(result));
                        console.log("test");
                        break;
                    case "POST":
                        let jsonString = "";
                        request.on("data", (data) => {
                            jsonString += data;
                        });
                        request.on("end", async () => {
                            articleCollection.insertOne(JSON.parse(jsonString));
                        });
                        break;
                }
                break;
            }
        case "/clearAll":
            await mongoClient.db("newsportal").collection("article").drop();
            break;
        default:
            response.statusCode = 404;

    }
});