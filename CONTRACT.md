# API Contract
Route: `twilio-email-verification.herokuapp.com/api/`

## POST /api/messages
It creates a new verification message.

### Request
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

### Response
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

## POST /api/verify

### Request
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

### Response
**Headers**:
```
Content-Type: application/json
Status: 202 Accepted
```

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
