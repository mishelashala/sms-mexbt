# Technical Debt

`routes/messages.js`:  
line `46` should return the next object: `{ error: { status: ..., message } }`  
to be catched in line `59` (implement a catch). This catch should pass the  
object to `res.status(...).json(err)` like that.  

line `54` should return the modified user and then saved in a `then()` execution.  
Then should return the promise returned and (again) processed in a `then()`  
execution. In this execution should trigger the datadog event.

line `59` should implement a `catch()` execution. Where should validate the error  
and pass the error to the response object like this: `res.status(...).json(err)`.

