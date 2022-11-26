# Table management

In this folder the functions for creating the tables, can be run from a localhost usign access key permissions

| Name  | Description  | Invoke |
|---|---|---|
| Create Opinion Table | Function that create the opinion table in the specified region| node createOpinionTable.js region profilename|
| Create user table  | Function that create the users table in the specified region| node createUsersTable.js region profilename|
| Delete table  |Function that deletes the specified table|node deleteTable.js tablename region profilename|
| Describe Table  |Function that retrieves the arn and the status of the specified table|node describeTable.js region tablename profilename|
| List Table  |Function that retrieve a list of all the tables in an specified region|node listTable.js region profilename|