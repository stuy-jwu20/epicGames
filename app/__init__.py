# Epic Games | Jonathan Wu (Loki), Jesse Xie (Polly), William Chen (Cheap), Josephine Lee (Kitty)
# SoftDev
# P04 -- SoftDev Project 2021-22
# 2022-05-24
# 0 minutes

from flask import Flask, render_template, request, redirect
import sqlite3
import html

app = Flask(__name__)

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

@app.route("/")
def pythnx():
    return render_template("index.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
