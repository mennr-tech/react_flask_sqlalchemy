This is test project.

## Requirements

• Build a web application for viewing information about Projects
• A Project has a name and a start date
• Each Project has multiple Users and Files associated with it
• Each User may be related to multiple Projects
• Each File can only be related to a single Project
• A User has a name and an email address
• A File has a name and a file type
• The main page of the application will be a table of all available Projects. This table will
have a column for name, a column for start date, and a column that contains a button to
navigate to the Project’s details page.
• The details page for a Project will have a tab for Users and a tab for Files. Each of these
tabs will have a table that contains a table that shows all the Users or Files that are
associated with the Project.
• The Users table will have a column for name and a column for email address
• The Files table will have a column for name and a column for file type
• The details page will have a back button to navigate back to the main page
• All tables will have server-side pagination, with sorting and filtering on each column
• The solution will use the technology stack specified below


## Technology Stack

- Front End
	o React
		• Bootstrap (https://getbootstrap.com/)
		• react-router (https://reacttraining.com/react-router/)
		• react-bootstrap-table2 (https://github.com/react-bootstrap-table/reactbootstrap-table2)
- Services
	o Python
		• Flask (http://flask.palletsprojects.com/en/1.1.x/)
		• Sqlalchemy (https://www.sqlalchemy.org/)
- Database
	o Postgres