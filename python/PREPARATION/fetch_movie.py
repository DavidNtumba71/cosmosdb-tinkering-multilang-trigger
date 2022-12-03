import csv
import os
import random

"""1. process csv"""
PARTITION_ATTRIBUTE = "primary_genre"


def data_from_csv(file_name):
    with open(file_name, "r", encoding="utf-8-sig") as file:
        return [record for record in csv.DictReader(file, delimiter=";")]


def set_primary_genre(record):
    record[f"{PARTITION_ATTRIBUTE}"] = record["genres"].split("|")[0]
    return record


def map_identifiers(record):
    record["RowID"] = record["id"]
    record["id"] = record["original_title"]
    return record


def init_movies_dataset():
    data = data_from_csv("movies_part_2.csv")

    for operation in (set_primary_genre, map_identifiers):
        data = [operation(record) for record in data]
    return data


def at_random():
    return random.choice(init_movies_dataset())
