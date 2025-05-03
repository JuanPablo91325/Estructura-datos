import pandas as pd

class Hospitales:
    def __init__(self, nombre: str, nit: int, sede: str, municipio: str):
     self.nombre = nombre
     self.nit= nit 
     self.sede= sede 
     self.municipio= municipio 

    def __str__(self):
       return f"Nombre: {self.nombre}, Nit: {self.nit}, Sede: {self.sede}, Municipio: {self.municipio}  " 

class Nodo:
    def __init__(self, hospitales):
     self.hospitales= hospitales
     self.izquierda= None
     self.derecha= None

hospitales = pd.read_csv('/workspaces/Estructura-datos/excel/Directorio_E.S.E._Hospitales_de_Antioquia_con_coordenadas_20250426.csv')


hospitales.rename (columns={
   'Razón Social Organización': 'nombre',
   'Número NIT': 'nit',
   'Nombre Sede':'sede',
   'Nombre Municipio':'municipio',
   }, inplace=True
)

hospitales['nit'] = hospitales ['nit'].str.replace(',' ,'')
hospitales['nit']=hospitales['nit'].astype(int)


print (hospitales.columns)
print(hospitales['nit'])

for index, row in hospitales.iterrows():
    hospital=Hospitales(
      nombre=row['nombre'],
      nit=row['nit'],
      sede=row['sede'],
      municipio=row['municipio']
    )
    print(hospital)