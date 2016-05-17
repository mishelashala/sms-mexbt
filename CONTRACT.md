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
			"region": 52,
			"number": 9621087445
		},
		"user": {
			"email": "starships@outlook.com"
		}
	}
}
```

### Response
**Headers**:
```
Content-Type: application/json
Status: 201
```
**Body**:
```
{
	"data": {
		"message": {
			"id": "some-uuid",
			"status": "send"
		},
		"phone": {
			"region": 52,
			"number": 9621087445
		},
		"user": {
			"email": "starships@outlook.com"
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
			"email": "starships@outlook.com",
			"verification_code": "some-uuid"
		}
	}
}
```

### Response
**Headers**:
```
Content-Type: application/json
Status: 200
```

```
{
	"data": {
		"user": {
			"email": "starships@outlook.com",
			"verification_code": "some-uuid",
			"status": "verified"
		}
	}
}
```

