# API Contract

**Index**:  
1. [Usage](#usage)
  - [POST /api/messages](#post-api-messages)
  - [POST /api/verify](#post-api-verify)
2. [Error Handling](#error-handling)
  - [Invalid User Input](#invalid-user-input)
  - [Email To Verify Not Found](#email-to-verify-not-found)
  - [Invalid Verification Code](#invalid-verification-code)
  - [User Already Verified](#user-already-verified)
  - [Database Connection Failed](#database-connection-failed)
  - [Cannot Auth To alphapoint](#cannot-auth-to-alphapoint)
  - [Cannot Change Verification Level](#cannot-change-verification-level)
  - [Wrong Accept Header](#wrong-accept-header)
  - [Method Not Allowed](#method-not-allowed)
  - [Not Found](#not-found)

## <a name='usage'>Usage</a>
### <a name='post-api-messages'>POST /api/messages</a>
It creates a new verification message.

#### Request
**headers**:
```
Accept: application/json
```
**body**:
```
{
    "phone": {
        "region": 01,
        "number": 5555555555
    },
    "user": {
        "email": "example@domain.com"
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 201 Created
```
**Body**:
```
{
    "server": {
        "status": 201,
        "message": "Created"
    },
    "client": {
        "status": 10,
        "status": "Message Sent"
    },
    "data": {
        "verified": false,
        "message": {
            "code": "abcdef" // len(6)
        },
        "phone": {
            "region": 01,
            "number": 5555555555
        },
        "user": {
            "email": "example@domain.com"
        }
    }
}
```

### <a name='post-api-verify'>POST /api/verify</a>

#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    "user": {
        "email": "example@domain.com"
    },
    "message": {
        "code": "abcdef" // len(6)
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 202 Accepted
```
**Body**:
```
{
    "server": {
        "status": 202,
        "message": "Accepted"
    },
    "client": {
        "status": 11,
        "message": "User Verified"
    },
    "data": {
        "user": {
            "email": "starships@outlook.com"
        },
        "message": {
            "code": "abcdef"
        },
        "verified": true,
        "phone": {
            "region": 01,
            "number": 5555555555
        }
    }
}
```

## <a name='error-handling'>Error Handling</a>

### <a name='invalid-user-input'>Invalid User Input</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    "phone": {
        "region": "adfasdfasdfas",
        "number": "adfasdfadfasfasdf"
    },
    "user": {
        "email": "adsfasdfadsf"
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 400 Bad Request
```
**Body**:
```
{
    "server": {
        "status": 400,
        "message": "Bad Request"
    },
    "client": {
        "status": 20,
        "message": "Invalid User Input"
    }
}
```

### <a name='email-to-verify-not-found'>Email To Verify Not Found</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    "message": {
        "code": "abcdef" // len(6)
    }
    "user": {
        "email": "some@ghost.onion"
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 400 Bad Request
```
**Body**:
```
{
    "server": {
        "status": 400,
        "message": "Bad Request"
    },
    "client": {
        "status": 23,
        "message": "User Not Found"
    }
}
```

### <a name='invalid-verification-code'>Invalid Verification Code</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    "message": {
        "code": "not-valid-code" // len(6)
    }
    "user": {
        "email": "example@domain.com"
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 400 Bad Request
```
**Body**:
```
{
    "server": {
        "status": 400,
        "message": "Bad Request"
    },
    "client": {
        "status": 24,
        "message": "Invalid Verification Code"
    }
}
```

### <a name='user-already-verified'>User Already Verified</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    "user": {
        "email": "example@domain.com"
    },
    "message": {
        "code": "abcdef" // code already used
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 400 Bad Request
```
**Body**:
```
{
    "server": {
        "status": 400,
        "message": "Bad Request"
    },
    "client": {
        "status": 25,
        "message": "User Already Verified"
    }
}
```

### <a name='database-connection-failed'>Database Connection Failed</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    // its not important
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 500 Internal Server Error
```
**Body**:
```
{
    "server": {
        "status": 500,
        "message": "Internal Server Error"
    },
    "client": {
        "status": 31,
        "message": "Database Connection Failed"
    }
}
```

### <a name='cannot-auth-to-alphapoint'>Cannot Auth To Alphapoint</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    "message": {
        "code": "abcdef" // len(6)
    }
    "user": {
        "email": "some@ghost.onion"
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 500 Internal Server Error
```
**Body**:
```
{
    "server": {
        "status": 500,
        "message": "Internal Server Error"
    },
    "client": {
        "status": 40,
        "message": "Cannot Auth To Alphapoint"
    }
}
```

### <a name='cannot-change-verification-level'>Cannot Change Verification Level</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    "message": {
        "code": "abcdef" // len(6)
    }
    "user": {
        "email": "some@ghost.onion"
    }
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 500 Internal Server Error
```
**Body**:
```
{
    "server": {
        "status": 500,
        "message": "Internal Server Error"
    },
    "client": {
        "status": 41,
        "message": "Cannot Change Verification Level"
    }
}
```

### <a name='wrong-accept-header'>Wrong Accept Header</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    // data (it's not important)
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 406 Not Acceptable
```
**Body**:
```
{
    "server": {
        "status": 406,
        "message": "Not Acceptable"
    }
}
```

### <a name='method-not-allowed'>Method Not Allowed</a>
#### Request
**Headers**:
```
Accept: application/json
```

**Body**:
```
{
    // data (it's not important)
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 405 Method Not Allowed
```
**Body**:
```
{
    "server": {
        "status": 405,
        "message": "Method Not Allowed"
    }
}
```

### <a name='not-found'>Not Found</a>
#### Request
**Headers**:
```
Accept: application/json
GET /api/some-route
```

**Body**:
```
{
    // data (it's not important)
}
```

#### Response
**Headers**:
```
Content-Type: application/json
Status: 404 Not Found
```
**Body**:
```
{
    "server": {
        "status": 404,
        "message": "Not Found"
    }
}
```
