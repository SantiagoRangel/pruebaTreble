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

# treble.ai's technical test v1.1.1 - Part 2

This is a serverless project, refer to the [serverless installation guide](https://www.serverless.com/framework/docs/providers/aws/guide/installation/) to resolve the requirements needed to run this project. It is not needed that the project is deployed to the cloud. It is enough that the project runs locally, please use the [serverless offline plugin](https://www.npmjs.com/package/serverless-offline) to achieve this.

Once everything is setup correctly. You should be able to run:
Ejecutar npm i en raiz
npm i en front
pip install spacy
python -m pip install --user spacy
python -m spacy download es_core_news_md
npx serverless offline




```bash
$ serverless offline
```

And get something like this:

```bash
offline: Starting Offline: dev/us-east-1.
offline: Offline [http for lambda] listening on http://localhost:3002

   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │   POST | http://localhost:3000/dev/spellcheck                           │
   │   POST | http://localhost:3000/2015-03-31/functions/hello/invocations   │
   │                                                                         │
   └─────────────────────────────────────────────────────────────────────────┘

offline: [HTTP] server ready: http://localhost:3000 🚀
offline:
offline: Enter "rp" to replay the last request

offline: POST /dev/spellcheck (λ: hello)
```

To test that the endpoint is working correctly use cURL:

```bash
$ curl http://localhost:3000/dev/spellcheck> -X POST -d '{ "text": "un lgar para la hopinion"}'
{ "text" : "un lugar para la opinión" }
```
