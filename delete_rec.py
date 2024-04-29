from pymongo import MongoClient
from datetime import datetime, timedelta
import time
from threading import Thread

# Initialize MongoDB connection
client = MongoClient("mongodb+srv://kusalcoc1212:Kusal01@chat-history.bjnpiqq.mongodb.net/")
db = client["M-chatbot"]
collection = db["chat_history"]

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
