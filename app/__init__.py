# Epic Games | Jonathan Wu (Loki), Jesse Xie (Polly), William Chen (Cheap), Josephine Lee (Kitty)
# SoftDev
# P04 -- SoftDev Project 2021-22
# 2022-05-24
# 0 minutes

from flask import Flask, render_template, request, redirect
import sqlite3
import html
import db
from sqlite3.dbapi2 import IntegrityError

app = Flask(__name__)

db.create_tables()
DB_FILE = "leaderboard.db"

@app.route("/")
def pythnx():
    db.create_tables()
    data = grabData()[0:3]
    print(grabData()[0:3])
    return render_template("index.html", userScore = data)

@app.route("/processing", methods = ['GET', 'POST'])
def leaderboard():
    statement = "hey"
    if request.method == "POST":
       if 'username' in request.form:
           db = sqlite3.connect(DB_FILE)
           c = db.cursor()
           c.execute("""
               INSERT INTO scores (user_id, waveReached, teamComposition) VALUES (?,?,?)
               """, ((request.form['username'], request.form['waveReached'], request.form['teamComposition'])))
           statement += request.form['username'] + request.form['waveReached'] + request.form['teamComposition']
           c.execute("""SELECT * FROM scores ORDER BY waveReached ASC""")
           data = c.fetchall()
           db.commit()
           db.close()
           return redirect("/")

def grabData():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("""SELECT * FROM scores ORDER BY waveReached ASC""")
    data = c.fetchall()
    db.commit()
    db.close()
    return data;

if __name__ == "__main__":
    app.debug = True
    app.run()
