import ballerina/http;
import ballerina/io;

configurable string FLASK_API_URL = "https://d3a34988-bf91-42db-a5dc-056dd611b04f-dev.e1-us-cdp-2.choreoapis.dev/sycodoca/chatapi/chat-api-9bc/v1";

type InputRecord record {
    string prompt;
};

// Define the HTTP client configuration with timeout
http:ClientConfiguration clientConfig = {
    timeout: 24000000 // Timeout set to 400 minutes (adjust as needed)
};

// Create the HTTP client with the configuration
http:Client flaskClient = check new(FLASK_API_URL, clientConfig);

service /api on new http:Listener(9090) {
        resource function post chat(http:Caller caller, http:Request request) returns error? {
        // Extract input message from frontend request
        json receivedJson = check request.getJsonPayload();
        io:println("Received json: ", receivedJson);
        InputRecord inputRecord = check receivedJson.fromJsonWithType(InputRecord);
        string inputMessage = inputRecord.prompt;
        io:println("Received string: " + inputMessage);

        // Forward input message to Flask API
        http:Request flaskRequest = new;
        flaskRequest.setJsonPayload({"msg": inputMessage});
        http:Response|http:ClientError flaskResponse = flaskClient->post("/get", flaskRequest);

        if (flaskResponse is http:Response) {
            // Extract response message from Flask API response
            string responseMessage = check flaskResponse.getTextPayload();
            io:print(responseMessage);
            // Send response message back to frontend
            http:Response response = new;
            response.setTextPayload(responseMessage);
            check caller->respond(response);
        } else {
            // Handle connection reset error
            if (flaskResponse.message() == "Connection reset") {
                // Handle connection reset error
                // You can log the error, retry the request, etc.
            } else {
                return flaskResponse;
            }
        }
    }
}