# Data Structures

## Header spl Data Structure

spl.execute contains the headers properties used by the execution context.
This data structure when added to a data record, turns the data record into an execution context record.
```
"spl":{
    "execute":{
        "action":"spl/execute/next",
        "status":"executing",
        "session":"client",
        "cwd":"D:\\SPlectrum\\spl\\spl",
        "pipeline": []
    }
}
```

spl.request contains the headers properties of the request record.  
A number of properties mirror those of the execution context.  
This data structure when added to a data record, turns the data record into an (internal) request record.
```
"spl":{
    "request":{
        "action":"spl/data/read",
        "status":"new",
        "session":"client",
        "cwd":"D:\\SPlectrum\\spl\\spl",
        "pipeline": []
    }
}
```

spl.data.fs contains data properties used by the data layer when the underlying repository is filesystem based.
The folder is referenced relative to the root of the SPlectrum instance.
```
"spl": {
    "data": {
        "fs": {
            "folder": "data/clients/client_1234"
        }
    }
}
```
