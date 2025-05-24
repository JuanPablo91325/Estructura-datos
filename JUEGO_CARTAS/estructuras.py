class Pila:
    def __init__(self):
        self.items = []

    def apilar(self, item):
        self.items.append(item)
    def desapilar(self):
        return self.items.pop() if not self.esta_vacia() else None

    def esta_vacia(self):
        return len(self.items) == 0 #Devuelve True si la pila está vacía (su tamaño es 0) y False si no lo está.


    def ver_tope(self):
        return self.items[-1] if not self.esta_vacia() else None

    def tamaño(self):
        return len(self.items) #devuelce la cantidad de elementos
    
