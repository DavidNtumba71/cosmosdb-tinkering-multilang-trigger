from dotenv import load_dotenv
from azure.cosmos import CosmosClient, PartitionKey, exceptions
import os
import csv


def init_database():
    load_dotenv()
    URL = os.getenv("COSMOS_URL")
    KEY = os.getenv("COSMOS_KEY")
    client = CosmosClient(URL, credential=KEY)
    return client.get_database_client("demodb")


def init_container(container_name, partition_key_name):
    database = init_database()
    try:
        return database.create_container(
            container_name, PartitionKey(path=f"/{partition_key_name}")
        )
    except exceptions.CosmosResourceExistsError:
        return database.get_container_client(container_name)
