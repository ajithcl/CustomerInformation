@openapi.openedge.export FILE(type="REST", executionMode="single-run", useReturnValue="false", writeDataSetBeforeImage="false").

/*------------------------------------------------------------------------
    File        : customer.p
    Purpose     : 

    Syntax      :

    Description : 

    Author(s)   : Ajithkumar
    Created     : Mon Oct 09 23:42:35 IST 2023
    Notes       :
  ----------------------------------------------------------------------*/

/* ***************************  Definitions  ************************** */

BLOCK-LEVEL ON ERROR UNDO, THROW.

USING Progress.Json.ObjectModel.*.
USING System.Array.

DEFINE TEMP-TABLE ttCustomer LIKE customer.
/* ********************  Preprocessor Definitions  ******************** */


/* ***************************  Main Block  *************************** */
/*DEFINE VARIABLE dummy AS LONGCHAR.*/
/*RUN GetCustomers(OUTPUT dummy).   */
/*RUN GetCustomerByNumber(3001, OUTPUT dummy ).*/


@openapi.openedge.export(type="REST", useReturnValue="false", writeDataSetBeforeImage="false").
PROCEDURE GetCustomers:
    DEFINE OUTPUT PARAMETER CustomersJsonText AS LONGCHAR NO-UNDO.
    
    DEFINE VARIABLE jsonArray AS Progress.Json.ObjectModel.JsonArray NO-UNDO.
    
    DEFINE BUFFER Customer FOR Customer.
    
    FOR EACH Customer NO-LOCK:
        CREATE ttCustomer.
        BUFFER-COPY Customer TO ttCustomer.
    END.
    
    jsonArray = NEW Progress.Json.ObjectModel.JsonArray().
    jsonArray:Read(TEMP-TABLE ttCustomer:HANDLE).
    CustomersJsonText = jsonArray:GetJsonText().
    //CustomersJsonText = jsonArray:GetJsonObject(1):GetJsonText().   
    
/*    MESSAGE STRING(CustomersJsonText) VIEW-AS ALERT-BOX.*/
END PROCEDURE.

@openapi.openedge.export(type="REST", useReturnValue="false", writeDataSetBeforeImage="false").
PROCEDURE GetCustomerByNumber:
    DEFINE INPUT PARAMETER custumerNumber AS INTEGER NO-UNDO. 
    DEFINE OUTPUT PARAMETER CustomerJsonText AS LONGCHAR NO-UNDO.
    
    DEFINE VARIABLE jsonCustomerInformation AS Progress.Json.ObjectModel.JsonObject NO-UNDO.
    
    DEFINE BUFFER customer FOR customer.
    // MESSAGE custumerNumber VIEW-AS ALERT-BOX. //Aji
    FOR FIRST customer NO-LOCK
        WHERE Customer.CustNum = custumerNumber:
        CREATE ttCustomer.
        BUFFER-COPY customer TO ttCustomer.
    END.
    
    jsonCustomerInformation = NEW Progress.Json.ObjectModel.JsonObject().
    jsonCustomerInformation:Read(TEMP-TABLE ttCustomer:HANDLE).
    
    CustomerJsonText = jsonCustomerInformation:GetJsonText().
    
    // MESSAGE STRING (CustomerJsonText) VIEW-AS ALERT-BOX.
    
END PROCEDURE.

@openapi.openedge.export(type="REST", useReturnValue="false", writeDataSetBeforeImage="false").
PROCEDURE AddNewCustomer:
    DEFINE INPUT PARAMETER postData AS LONGCHAR NO-UNDO.
    DEFINE OUTPUT PARAMETER processResponse AS LONGCHAR NO-UNDO.
    
    DEFINE VARIABLE jsonParser AS ObjectModelParser NO-UNDO.
    DEFINE VARIABLE customerJson AS JsonObject NO-UNDO.
    DEFINE VARIABLE responseJson AS JsonObject NO-UNDO.
    DEFINE VARIABLE isProcessingSuccess AS LOGICAL NO-UNDO.
    DEFINE VARIABLE processingMessage AS CHARACTER NO-UNDO.
    DEFINE VARIABLE errorCount  AS INTEGER NO-UNDO.
    
    DEFINE VARIABLE CustomerFields AS 'System.Array' NO-UNDO.
    
    DEFINE VARIABLE customerNumber LIKE Customer.CustNum NO-UNDO.
    
    //Reference : https://www.progresstalk.com/threads/how-to-convert-a-json-string-into-a-json-object.138642/ 
    
    IF postData = "" OR postData = ? THEN DO:
        isProcessingSuccess = FALSE.
        processingMessage = "Invalid input".
        
    END.
    ELSE DO ON ERROR UNDO, LEAVE:
        postData = CODEPAGE-CONVERT (postData, "UTF-8").
        jsonParser = NEW objectModelParser().
        customerJson = CAST (jsonParser:Parse(postData), JsonObject).
        
        CustomerFields =  customerJson:GetNames().
        MESSAGE customerFields:LENGTH .   //ToDO
        
        isProcessingSuccess = TRUE.
        MESSAGE customerJson:GetCharacter("Name") VIEW-AS ALERT-BOX.
        customerNumber = customerJson:GetInteger("CustNum").
        
        IF CAN-FIND (FIRST Customer NO-LOCK WHERE Customer.CustNum = customerNumber) THEN DO:
            isProcessingSuccess = FALSE.
            processingMessage = "Existing customer! Unable to add".
        END.
        ELSE DO:
        END.
        
        CATCH parseError AS Progress.Lang.Error :
            DO errorCount = 1 TO parseError:NumMessages:
                processingMessage = processingMessage + '' + parseError:GetMessage(errorCount).
            END.    
            isProcessingSuccess = FALSE.  
        END CATCH.
    END.
    
    FINALLY:
        responseJson = NEW JsonObject().
        responseJson:Add('status', isProcessingSuccess).
        responseJson:Add('message', processingMessage).
        
       processResponse = responseJson:GetJsonText().
        
        IF VALID-OBJECT (jsonParser) 
            THEN DELETE OBJECT jsonParser.
        IF VALID-OBJECT (customerJson)
            THEN DELETE OBJECT customerJson.
    END FINALLY.
    
END PROCEDURE.
