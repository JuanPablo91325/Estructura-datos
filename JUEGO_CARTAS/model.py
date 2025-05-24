import random
from estructuras import Pila 

class Juego:
    def __init__(self):
        self.baraja = Pila()
        cartas = [1,2,3,4,5,6,7,10,11,12] * 4 
        random.shuffle(cartas) 
        for carta in cartas:
            self.baraja.apilar(carta) 
        self.jugador = []
        self.maquina = []
        self.terminado = False 
        self.resultado = ""

    def pedir_carta(self):
        if not self.terminado and not self.baraja.esta_vacia(): 
            carta = self.baraja.desapilar() 
            self.jugador.append(carta)
            if self.sumar(self.jugador) > 21: 
                self.terminado = True 
                self.resultado = "¡Perdiste! Te pasaste de 21." 

    def plantarse(self):
        while self.sumar(self.maquina) < 17 and not self.baraja.esta_vacia():
            self.maquina.append(self.baraja.desapilar()) 
        self.terminado = True 
        self.resultado = self.calcular_resultado() 
git status

    def calcular_resultado(self):
        total_jugador = self.sumar(self.jugador) 
        total_maquina = self.sumar(self.maquina) 

        if total_jugador > 21: 
            return "¡Perdiste! Te pasaste de 21."
        elif total_maquina > 21 or total_jugador > total_maquina:
            return "¡Ganaste!"
        elif total_jugador < total_maquina: 
            return "¡Perdiste! La máquina tiene más puntos."
        else:
            return "Empate."

    def sumar(self, mano):
        return sum(mano) 

    def to_dict(self):
        return {
            'jugador': self.jugador,
            'maquina': self.maquina,
            'terminado': self.terminado,
            'resultado': self.resultado 
        }

    @classmethod
    def from_dict(cls, data):
        juego = cls()
        juego.jugador = data['jugador']
        juego.maquina = data['maquina']
        juego.terminado = data['terminado']
        juego.resultado = data['resultado']
        return juego
    #ALMACENA LA INFORMACION

