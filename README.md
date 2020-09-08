# treble.ai's technical test v1.1.1 - Part 1
For this test 3 Haskell functions were created :
- match :: Answer -> [String] -> Maybe String
- containedInJustOneSentence :: String -> [String] -> Maybe String
- containedInSentences :: String -> [String] -> [Maybe String]

To run this program first install Haskell on your machine. After installation is done open your command prompt and open this proyect. Then go to /Haskell where you will find
Helloworld.hs . On your command prompt run:
```bash
$ ghci
```

To load the file run:

```bash
$ :l Helloworld.hs
```
Now we can run functions in our code. Some tests were made from the examples given in the first question´s instructions. To run test just excecute as the following:
```bash
$ mp1
```
The tests defined were:
- mp1 = match (Digit 1) ["Muy bien","Hola mundo"]
- mp2 = match (Digit 9) ["Muy bien", "Hola mundo", "Quiero saber de mas"]
- mp3 = match (Digit 3) ["Muy bien", "Hola mundo", "Ayer"]
- mp4 = match (SingleWord "Muy") ["Muy bien", "Hola mundo"]
- mp5 = match (SingleWord "Hola") ["Hola si", "Hola mundo"]

- cop1 = containedInJustOneSentence "Muy" ["Muy bien","Hola mundo"]
- cop2 = containedInJustOneSentence "Hola" ["Hola bien","Hola mundo", "Quiero saber mas"]

- cp1 = containedInSentences "hola" ["hola si", "hola no", "mas"]
- cp2 = containedInSentences "Dia" ["Hola bien", "Hola mundo", "Quiero saber de mas"]

If you want to make a custom text just run a command such as:
```bash
$ containedInJustOneSentence "mundo" ["Muy bien","Hola mundo"]
```
To exit Haskell run:
```bash
$ :q
```

**This program is case sensitive**

# treble.ai's technical test v1.1.1 - Part 2

This is a serverless project, refer to the [serverless installation guide](https://www.serverless.com/framework/docs/providers/aws/guide/installation/) to resolve the requirements needed to run this project. It is not needed that the project is deployed to the cloud. It is enough that the project runs locally, please use the [serverless offline plugin](https://www.npmjs.com/package/serverless-offline) to achieve this.

In root folder run this command to get Serverless and Serverless-Offline installed:
```bash
$ npm i
```
**Front Setup:**

Go to /front and run:
```bash
$ npm i
```
To run front-end exceute:
```bash
$ npm start
```

Front app was set on port 4000

**Python Setup:**

For this site spacy and a medium size spanish data set was used in order to match phrases. To install this packages run on the root folder:
```bash
$ pip install spacy
```
If this command fails, run:
```bash
$ python -m pip install --user spacy
```
Finally run this command to get the dataset:
```bash
$ python -m spacy download es_core_news_md
```
Once everything is setup correctly. You should be able to run:


```bash
$ serverless offline
```
If this command doesn´t work, run:
```bash
$ npx serverless offline
```
And get something like this:

```bash
offline: Starting Offline: dev/us-east-1.
offline: Offline [http for lambda] listening on http://localhost:3002


   ┌──────────────────────────────────────────────────────────────────────────────┐
   │                                                                              │
   │   POST | http://localhost:3000/dev/spellcheck                                │
   │   POST | http://localhost:3000/2015-03-31/functions/hello/invocations        │
   │   GET  | http://localhost:3000/dev/historial                                 │
   │   POST | http://localhost:3000/2015-03-31/functions/historial/invocations    │
   │   POST | http://localhost:3000/dev/classifier                                │
   │   POST | http://localhost:3000/2015-03-31/functions/classifier/invocations   │
   │   GET  | http://localhost:3000/dev/test                                      │
   │   POST | http://localhost:3000/2015-03-31/functions/test/invocations         │
   │                                                                              │
   └──────────────────────────────────────────────────────────────────────────────┘
offline: [HTTP] server ready: http://localhost:3000 🚀
offline:
offline: Enter "rp" to replay the last request

```

For this backend 4 endpoints were made:
- POST | http://localhost:3000/dev/spellcheck

Recieves:

{
    "text": "text to spellcheck"
}

Returns: 

{
    "text": "checked text"
}
   
- GET  | http://localhost:3000/dev/historial

If there is no history ir returns:
{
    "history": "No history"
}

Otherwise it returns spellchecker history:

{
    "1": [
        "En mi ezcuela no enseñan a escrivir ni a ler",
        "En mi escuela no enseñan a escribir ni a le"
    ]
}

- POST | http://localhost:3000/dev/classifier

Recives: 

{
    "text": "el producto salio mal",
    "opciones": ["Una problema con la entrega","Un problema con el pago","Un problema con el producto", "Otro tipo de problema"]
}

Returns the matched option or 0 if neither:

{
    "opcion": "3"
}

- GET  | http://localhost:3000/dev/test

If all tests were passed, returns:

{
    "result": "All tests passed"
}
