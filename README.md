Application will be comprised of two pages and a dialog:

<b>UsersList</b>

This page will contain datagrid with all users available from API.
Columns:
1) Username (string)
2) FullName (string)
3) LastLogin (DateTime)
4) Enabled (boolean)

Datagrid should be sortable by all fields and filterable by Username (search). 
LastLogin should be formatted to human friendly format and Enabled should be represented as "Yes"/"No" text.
Rows with Enabled set to "No" should be colored red.

<b>NewUserDialog</b>

This dialog is activated using "New user" button - placement of this button is up to you.
Dialog should contain validated form with fields:
1) Username - max. 15 characters, only alphanumeric characters, non-empty, unique, case insensitive
2) FirstName, LastName - together max. 40 characters, both non-empty, each has max. 25 characters
3) Enabled - tri-state checkbox, must be specified ("Yes"/"No" values)

Username uniqueness should be validated locally using data in datagrid with all users. FullName is combination of FirstName and LastName. Each can be 25 chars long, but together can not exceed 40 chars - you have to validate, that these fields are valid on their own and combined.

<b>UserDetail</b>

This page contains details of selected user. Fields FirstName, LastName and Enabled are editable.

### API
You do not have to develop any backend functionality. As your data source create in-memory mock API. Your API mock methods should contain some delay (~ 1 second) to simulate real server delays.

All your API calls should be centralized in one place so it is easier to add error handling, HTTP request/response handling, security token handling etc.
