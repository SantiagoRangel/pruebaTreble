import sqlite3
from sqlite3 import Error



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

def insert_registro(text, checked):
    conn = sqlite3.connect("..\\pruebaTreble\\DataBase\\database")
    cursor = conn.cursor()
    insert = "INSERT INTO registros (text, checked) values (?,?)"
    cursor.execute(insert, (text, checked))
    conn.commit()
    conn.close()

def get_registros():
    conn = sqlite3.connect("..\\pruebaTreble\\DataBase\\database")
    cursor = conn.cursor()
    select = "SELECT * FROM 'registros'"
    cursor.execute(select)
    rows = cursor.fetchall()
    registros = []
    for row in rows:
        registros.append(row)
    conn.close()
    return registros