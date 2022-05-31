# Epic Games | Jonathan Wu (Loki), Jesse Xie (Polly), William Chen (Cheap), Josephine Lee (Kitty)
# SoftDev
# P04 -- SoftDev Project 2021-22
# 2022-05-24
# 0 minutes

import sqlite3
DB_FILE = "leaderboard.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()

def create_tables():
    c = db.cursor()
    """Creates the tables in the database to store users"""
    command = 'CREATE TABLE IF NOT EXISTS scores (user_id INTEGER, waveReached INTEGER, teamComposition TEXT)'
    c.execute(command)
    command = 'CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE)'
    c.execute(command)
    db.commit() #save changes
create_tables()

def create_user(username):
    c = db.cursor()
    create_tables()
    """Adds a user with a username into the users table of the database"""
    c.execute(f'INSERT INTO users (username) VALUES (?);', (username)) 
    db.commit()

def get_scores(user_id):
    c = db.cursor()
    result = list(c.execute(f'SELECT waveReached from scores where user_id == ?', (user_id,)))
    return [{
        "w": waveReached
    } for (waveReached) in result][0]

def inc_waveReached(user_id):
    c = db.cursor()
    c.execute(f'UPDATE scores SET waveReached = ? where user_id == ?', (get_scores(user_id)['w'] + 1, user_id))
    db.commit()