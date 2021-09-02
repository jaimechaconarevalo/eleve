var statusCode = {
    "es" : {
        "200": "OK, proceso exitoso",
        "201": "OK, solo data del documento fue procesada exitosamente",
        "202": "OK, solo match biométrico fue procesado exitosamente",
        "401": "Cliente no habilitado",
        "402": "API_KEY no existe",
        "410": "Input param malo, APIKEY",
        "411": "Input param malo, Document type",
        "412": "Input param malo, Photo",
        "413": "Input param malo, TRX",
        "404": "TRX no existe",
        "405": "TRX posee match negativo",
        "406": "TRX no corresponde a cliente con apiKey",
        "407": "TRX inválida",
        "501": "Error no manejado, contactar soporte"
    },
    "en" : {
        "200": "OK, process successful",
        "201": "OK, only document data was processed successfuly",
        "202": "OK, only facial match was processed successfuly",
        "401": "Client not authorized",
        "402": "API_KEY doesn't exists",
        "410": "Wrong input param, APIKEY",
        "411": "Wrong input param, Document type",
        "412": "Wrong input param, Photo",
        "413": "Wrong input param, TRX",
        "404": "TRX doesn't exists",
        "405": "TRX has negative match",
        "406": "TRX doesn't match apiKey client",
        "407": "TRX not valid",
        "501": "Unknown error, contact support"
    }
}
