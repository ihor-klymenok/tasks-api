# How to start a backend?
1. `docker-compose up -d`
2. `npm i && npx tsc && npm start`
3. (OPTIONAL) You can overwrite ENV values inside `.env` file (or your own).  
After that start server with `DOTENV=.env npm start`

# Models
## User
```typescript
interface User {
  email: string
  password: string
}
```
## Task
```typescript
interface Task {
  userId: string
  title: string
  dueDate: Date
  priority: 'LOW' | 'NORMAL' | 'HIGH'
}
```

# Routes
## Auth
POST `/auth/sign-up`  
Body: [User]()  

POST `/auth/sign-in`  
Body: [User]()  

## Tasks
GET `/tasks`  
  Query params: `page={number}, size={number}, sortBy={Partial<Task>}, orderBy=1 || -1`   

GET `/tasks/:id`  
  Params: `:id` -- task id

POST `/tasks`  
  Body: [Task]()

PATCH `tasks/:id`  
  Body: `Partial<Task>`

DELETE `tasks/:id`  
  Params: `:id` -- task id
