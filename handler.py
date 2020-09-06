import json
from spell_checker import spell_check_sentence, test_spell_check_sentence
from db import insert_registro, crear_tabla, get_registros

def spell_check(event, context):
    
    bod = event['body'].encode('latin-1')
    bod = json.loads(bod)
    text = bod['text']
    crear_tabla()
    insert_registro(text, spell_check_sentence(text))

    rta = {
        "text" :  spell_check_sentence(text)
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(rta)
    }

    return response
    
    





