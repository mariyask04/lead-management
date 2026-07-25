# API Documentation

## Authentication

### Register

POST /api/auth/register

Body

```json
{
  "name": "",
  "email": "",
  "password": "",
  "role": "admin/member"
}
```

---

### Login

POST /api/auth/login

```json
{
  "email": "",
  "password": ""
}
```

---

## Leads

### Create Lead

POST /api/leads

```json
{
  "name": "",
  "email": "",
  "phone": "",
  "company": "",
  "message": ""
}
```

---

### Get Leads

GET /api/leads

Query

```
?page=1
&limit=10
&status=New
&search=Rahul
```

---

### Get Lead

GET

```
/api/leads/:id
```

---

### Update Lead

PATCH

```
/api/leads/:id
```

---

### Assign Lead

PATCH

```
/api/leads/:id/assign
```

---

### Update Status

PATCH

```
/api/leads/:id/status
```

---

### Delete Lead

DELETE

```
/api/leads/:id
```

---

## Notes

POST

```
/api/notes/:leadId
```

GET

```
/api/notes/:leadId
```

---

## Activities

GET

```
/api/activities/:leadId
```