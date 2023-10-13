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

USING Progress.Json.ObjectModel.JsonArray.

DEFINE TEMP-TABLE ttCustomer LIKE customer.
/* ********************  Preprocessor Definitions  ******************** */


/* ***************************  Main Block  *************************** */
/*DEFINE VARIABLE dummy AS LONGCHAR.*/
/*RUN GetCustomers(OUTPUT dummy).   */


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
    CustomersJsonText = jsonArray:GetJsonObject(1):GetJsonText().   
    
/*    MESSAGE STRING(CustomersJsonText) VIEW-AS ALERT-BOX.*/
END PROCEDURE.
