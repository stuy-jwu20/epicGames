# Epic Games | Jonathan Wu (Loki), Jesse Xie (Polly), William Chen (Cheap), Josephine Lee (Kitty)
# SoftDev
# P04 -- SoftDev Project 2021-22
# 2022-05-24
# 0 minutes

from flask import Flask, render_template, request, redirect
import sqlite3
import html

app = Flask(__name__)

MAIN_DB = "leaderboard.db"

db = sqlite3.connect(MAIN_DB)
c = db.cursor()

@app.route("/")
def pythnx():
    return render_template("index.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
