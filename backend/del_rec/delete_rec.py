from threading import Thread
import time
import redis
import json

# Connect to Redis
r = redis.Redis(
    host='redis-d3a34988-bf91-42db-a5dc-056dd611b04f-chatdat2762273445-ch.j.aivencloud.com',
    port=12524,
    password='AVNS_sZHnV4bsN5xu8tnARab'
)

# Define the function to delete old documents
def delete_old_documents():
    while True:
        # Delete documents older than 24 hours
        r.delete("chat_history")  # Clear the entire chat history
        # Sleep for 24 hours before clearing again
        time.sleep(86400)  # Sleep for 24 hours (86400 seconds)

# Start the deletion process in a separate thread
delete_thread = Thread(target=delete_old_documents)
delete_thread.daemon = True  # Daemonize the thread to stop it when the main thread stops
delete_thread.start()
