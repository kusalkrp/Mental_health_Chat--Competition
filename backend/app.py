import requests
from flask import Flask, render_template, jsonify, request
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from datetime import datetime, timedelta
from threading import Thread
import time
from src.prompt import *
from langchain_openai import OpenAI
from langchain_openai import OpenAIEmbeddings



app = Flask(__name__)

load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')
OpenAI_API_KEY = os.environ.get('OpenAI_API_KEY')


embeddings =OpenAIEmbeddings(openai_api_key=OpenAI_API_KEY)
llm = OpenAI(openai_api_key=OpenAI_API_KEY)

# Initialize Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
index_name = "mental-chatbot"

#embeddings = download_hugging_face_embeddings()

# If we already have an index we can load it like this
docsearch = PineconeVectorStore.from_existing_index(index_name, embeddings)

PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
chain_type_kwargs = {"prompt": PROMPT}


# Initialize MongoDB connection
client = MongoClient("mongodb+srv://kusalcoc1212:Kusal01@chat-history.bjnpiqq.mongodb.net/")
db = client["M-chatbot"]
collection = db["chat_history"]

# Array to store chat history
chat_history = []

# Define the delete_old_documents function


# Define the function to delete old documents
def delete_old_documents():
    while True:
        # Calculate the timestamp 24 hours ago
        twenty_four_hours_ago = datetime.now() - timedelta(hours=24)
        
        # Delete documents older than 24 hours
        collection.delete_many({"timestamp": {"$lt": twenty_four_hours_ago}})
        
        # Sleep for 1 hour before checking again
        time.sleep(3600)  # Sleep for 1 hour (3600 seconds)


# Start the deletion process in a separate thread
delete_thread = Thread(target=delete_old_documents)
delete_thread.daemon = True  # Daemonize the thread to stop it when the main thread stops
delete_thread.start()

#API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
#headers = {"Authorization": "Bearer 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"}

#llm = CTransformers(
   # model="model\llama-2-7b-chat.ggmlv3.q4_0.bin",
    ###)



#def query(payload):
    ##return response.json()
	
qa = RetrievalQA.from_chain_type(
    llm=llm, 
    chain_type="stuff", 
    retriever=docsearch.as_retriever(search_kwargs={'k': 2}),
    return_source_documents=True, 
    chain_type_kwargs={}
)
@app.route("/")
def index():
    return render_template('chatc.html')

@app.route("/get", methods=["POST"])
def chat():
    global chat_history
    
    if request.is_json:
        data = request.json
        input_text = data.get("msg", "")

        # Print the input message forwarded by Ballerina
        print("Received message from Ballerina:", input_text)

        # Check if user wants to end the conversation
        if input_text.lower() == "end":
            # Save chat history to MongoDB
            if chat_history:
                chat_data = {
                    "conversation": chat_history,
                    "timestamp": datetime.now()
                }
                collection.insert_one(chat_data)
                chat_history = []  # Clear chat history after saving to MongoDB
            return jsonify({"response": "Thank you for chatting with us."})
        
        # Handle greetings
        if input_text.lower() in ["hello", "hi", "hey"]:
            return jsonify({"response": "How are you feeling today?"})
        else:
            result = qa({"query": input_text})
            response = str(result["result"])
            
            # Append to chat history
            chat_history.append({"input": input_text, "response": response})
            
            return jsonify({"response": response})

    else:
        return jsonify({"error": "Request must be in JSON format."})
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
