# Assumptions and Design Decisions

## Authentication

JWT authentication is used for all protected routes.

---

## Authorization

Two roles are supported.

- Admin
- Member

Admins have full access.

Members can only work on assigned leads.

---

## Lead Creation

Lead submission is intentionally public to allow customers to submit enquiries without logging in.

---

## Activities

Every important action creates an activity record.

Examples

- Lead Created
- Lead Assigned
- Status Updated
- Note Added

---

## Notes

Each lead maintains independent notes.

---

## Pagination

Pagination is performed on the server to improve scalability.

---

## Search

Search uses MongoDB regular expressions across:

- Name
- Email
- Company