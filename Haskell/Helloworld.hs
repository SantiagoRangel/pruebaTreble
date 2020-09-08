import Data.List 

data Answer = 
    Digit Int
  | SingleWord String


{----------------------------------------------}
{--------------------  MATCH ------------------}
{----------------------------------------------}


match :: Answer -> [String] -> Maybe String
match rta frases = 
    case rta of
        Digit rta -> fraseNum rta frases
        SingleWord rta -> frasePalabra rta frases

{----------------------------------------------}
{-------- CONTAINED IN SENTENCES --------------}
{----------------------------------------------}


containedInSentences  ::  String -> [String] -> [Maybe String] 
containedInSentences palabra [] =[]
containedInSentences palabra (x:xs) = esta palabra x : containedInSentences palabra xs

{----------------------------------------------}
{------- CONTAINED IN JUST ONE SENTENCE--------}
{----------------------------------------------}


containedInJustOneSentence :: String -> [String] -> Maybe String
containedInJustOneSentence palabra frases 
    | count palabra frases == 0 = Nothing
    | count palabra frases > 1  = Nothing
    | otherwise = Just (encuentra palabra frases)



-- Saca la frase que corresponde al numero por parametro
fraseNum :: Int -> [String] -> Maybe String
fraseNum num frases 
    | num < 1 = Nothing
    | num > length(frases) = Nothing
    | otherwise = Just (frases!!(num -1))

-- Saca la frase que corresponde la palabra por parametro
frasePalabra :: String -> [String] -> Maybe String
frasePalabra palabra frases
    | count palabra frases == 1 = Just (encuentra palabra frases)
    | otherwise = Nothing

-- Retorna la frase si la palabra del parametro esta incluida
esta :: String -> String ->  Maybe String
esta palabra frase = if isInfixOf palabra frase then Just frase else Nothing


-- Cuenta el numero de frases que coentiene la palabra por parametro
count :: String -> [String] -> Int
count palabra =
    foldr (\x acc -> if isInfixOf palabra x then acc +1 else acc ) 0

-- Encuentra la frase que contiene la palabra
encuentra :: String -> [String] -> String
encuentra palabra =
    foldr (\x acc -> if isInfixOf palabra x then acc ++ x else acc ) ""


main :: IO () 
p1 = "hola"
p2 = "hola2"
p3 = p1 ++ foo ++ p2
main = print p3
