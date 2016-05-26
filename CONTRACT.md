# API Contract

**Index**:  
1. [Usage](#usage)
  - [POST /api/messages](#post-api-messages)
  - [POST /api/verify](#post-api-verify)
2. [Error Handling](#error-handling)
  - [Wrong Accept Header](#wrong-accept-hheader)
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
	"data": {
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

#### Response
**Headers**:
```
Content-Type: application/json
Status: 201 Created
```
**Body**:
```
{
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
	"data": {
		"user": {
			"email": "example@domain.com"
		},
		"message": {
			"code": "abcdef" // len(6)
		}
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
                },
	}
}
```

## <a name='error-handling'>Error Handling</a>
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
	"error": {
		"status": 406,
		"message": "Not Acceptable"
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
	"error": {
		"status": 404,
		"message": "Not Found"
	}
}
```
