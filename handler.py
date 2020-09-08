import json
from spell_checker import spell_check_sentence, spell_check_sentence2, test_spell_check_sentence, classifier_spacy
from db import insert_registro, crear_tabla, get_registros

def spell_check(event, context):
    
    bod = event['body'].encode('latin-1')
    print(bod)
    bod = json.loads(bod)
    text = bod['text']
    crear_tabla()
    insert_registro(text, spell_check_sentence2(text))
    #test_spell_check_sentence()
    
    rta = {
        "text" :  spell_check_sentence(text)
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(rta)
    }

    return response

def historial(event, context):
    registros = get_registros()
    body = {}
    for r in registros:
        body[r[0]] = (r[1], r[2])
    #print(body)
    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }
    return response

def classifier(event, context):
    bod = event['body'].encode('latin-1')
    bod = json.loads(bod)
    text = bod['text']
    opciones = bod['opciones']
    rta = ''
    if(text[0] in ['1','2','3','4','5','6','7','8','9','10']):
       
        rta = text[0]
    else:
         rta = classifier_spacy(text, opciones)

    js = {
        "opcion" :  rta
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(js)
    }
    
    return response
def run_test(event, context):
    rta = {
        "result" :  test_spell_check_sentence()
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(rta)
    }
    return response
    
    





