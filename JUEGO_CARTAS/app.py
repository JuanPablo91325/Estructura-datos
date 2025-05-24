from flask import Flask, render_template, request, jsonify, session
from model import Juego
import os
app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/')
def index():
    session['juego'] = Juego().to_dict() #juego-> diccionario
    return render_template('index.html')

@app.route('/pedir', methods=['POST']) 
def pedir():
    juego = Juego.from_dict(session['juego'])#recuperar el juego del diccionario 
    juego.pedir_carta()
    session['juego'] = juego.to_dict() #actualiza
    return jsonify(juego.to_dict())

@app.route('/plantarse', methods=['POST'])
def plantarse():
    juego = Juego.from_dict(session['juego'])
    juego.plantarse()
    session['juego'] = juego.to_dict()
    return jsonify(juego.to_dict())

@app.route('/reiniciar', methods=['POST'])
def reiniciar():
    session['juego'] = Juego().to_dict() 
    return jsonify(session['juego']) 

if __name__ == '__main__': #ejecutar el proyecto
    app.run(debug=True)
 