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

@app.route("/")
def pythnx():
    db.create_tables()
    return render_template("index.html")

#@app.route("/leaderboard", methods = ['GET', 'POST'])

#def leaderboard():
    #statement = ""
    #if request.method == "POST":
    #    if 'user' in request.form:
    #        db = sqlite3.connect(MAIN_DB)
    #        c = db.cursor()
    #        c.execute("""
    #            INSERT INTO LEADERBOARD (USER, SCORE, MODE) VALUES (?,?,?)
    #            """, ((request.form['user'], request.form['score'], request.form['mode'])))
    #        statement += """ 'request.form['mode']' '"""
    #        db.commit()
    #        db.close()
    #        return redirect("/leaderboard")
    #else:
    #    statement = """ SELECT USER, SCORE FROM LEADERBOARD WHERE MODE = 'NORMAL' ORDER BY SCORE DESC"""
    #db = sqlite3.connect(MAIN_DB)
    #c = db.cursor()
    #c.execute(statement)
    #data = c.fetchall()
    #db.close()
    #return render_template("leaderboard.html", userScore = data, mode = "/leaderboard")
    
if __name__ == "__main__":
    app.debug = True
    app.run()
