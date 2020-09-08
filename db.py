import sqlite3
from sqlite3 import Error


# Si la base de datos no existe, crea la base de datos. Esta funcion crea la tabla para los registros del spell checker usando sqlite
def crear_tabla():
    conn = sqlite3.connect("..\\pruebaTreble\\DataBase\\database")
    cursor = conn.cursor()
    try:
        create = "CREATE TABLE registros(id INTEGER PRIMARY KEY, text VARCHAR(200), checked VARCHAR(200));"
        cursor.execute(create)
        conn.commit()
    except:
        print("no se pudo crear la base de datos")
    conn.close()

# Esta funcion recibe el texto y el corregido para meterla en la base de datos con id autoincrementado
def insert_registro(text, checked):
    conn = sqlite3.connect("..\\pruebaTreble\\DataBase\\database")
    cursor = conn.cursor()
    insert = "INSERT INTO registros (text, checked) values (?,?)"
    cursor.execute(insert, (text, checked))
    conn.commit()
    conn.close()

# Esta funcion saca todos los registros de la base de datos y los retorna pero si esta vacia retorna: No history
def get_registros():
    conn = sqlite3.connect("..\\pruebaTreble\\DataBase\\database")
    cursor = conn.cursor()
    select = "SELECT * FROM 'registros'"
    registros = []
    try:
        cursor.execute(select)
        rows = cursor.fetchall()
        for row in rows:
            registros.append(row)
    except:
        registros = "No history"
    conn.close()
    return registros