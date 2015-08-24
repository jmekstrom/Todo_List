# TDL
To Do List

# TODO 0.1 
#### Dummy static pages
- Make a landing page for your todo items, index.php
  - index.php will be the landing page for all operations, all other pages will be included within it
- Make a directory for all of your template pieces, called "template"
  - Create dummy static php pages for your template pieces
    - templates/header.php - main navigation and logo for the site
    - template/footer.php
- Make a directory for all of your sub-pages called "pages"
  - Create dummy static php pages of the following:
    - pages/display_item.php - displays all of the data from 1 todo item
      - minimum requirements:
        - list 1 item at a time
        - item has, at least, these data fields:
          - title - short title of the todo item
          - details - details of the todo item
          - due_date - when the item becomes due
          - timestamp - when the item was created
          - completed - is the item completed or not
    - pages/list_all_items.php - Shows all todo items in a list structure
      - minimum requirements:
        - user has 1 todo list
        - display title and due date of each todo item
        - display difference for current, past due, and complete todo items
    - pages/create_todo_item.php - create a single todo item
      - minimum requirements:
        - create 1 item at a time
        - item has, at least, these data fields:
          - title - short title of the todo item
          - details - details of the todo item
          - due_date - when the item becomes due
          - completed - is the item completed or not
    - pages/login_template.php - page to log the user in
      - minimum requirements:
        - username
        - password
- In index.php, load the appropriate page based on the $_GET superglobal key 'current_page'

#### DO NOT spend a lot of time styling them.  You may put in basic bootstrap.  The purpose of this is to get the basic skeleton

# TODO 0.2
- Create dummy data object template for todo items:
<pre>
``` 
todo_items[
    {
      id: 0,
      user_id: 1,
      timeStamp: '2015/06/15 12:00:00',
      title: 'my title',
      details: 'my details'
    }
]
```
</pre>
- Create a local file with json data stored in it, to emulate your ajax calls
  - get_todo_items.json
<pre>
``` 
todo_items[
    {
      id: 0,
      user_id: 1,
      timeStamp: '2015/06/15 12:00:00',
      title: 'get eggs',
      details: 'get jumbo eggs from the supermarket'
    },
    {
      id: 1,
      user_id: 1,
      timeStamp: '2015/06/16 04:00:32',
      title: 'win at life',
      details: 'by winning the lottery'
    },
        {
      id: 2,
      user_id: 1,
      timeStamp: '2015/11/17 11:22:00',
      title: 'proposition parris',
      details: 'to go to the zoo'
    },
```
</pre>
- Make a header.php file
  - put a menu at the top of index.php
    - Provide the following links:
    - If Logged out:
      - Login - log the user in
    - If logged in:
      - View : view todo list
      - Create: create new todo item
      - Logout - log the user out
- Add basic functionality to your todo-list project to
    - read whole list and show summary data for available items
    - read individual todo-list item and show it specifically
    - create new data.
        - This will eventually send data to the server
        - For now it will simply append the data to the existing list

- Make a header.php file
  - put a menu at the top of index.php
    - Provide the following links:
    - If Logged out:
      - Login - log the user in
    - If logged in:
      - View : view todo list
      - Create: create new todo item
      - Logout - log the user out

# TODO 1.0 (Group Project)
- Combine code together to form a group project
    - Your team master branch will be T&lt;YOUR TEAM NUMBER&gt;_Master
    - Fork C4_TDL to your github account / clone to your system
- LOGIN:
    - add login page
        - 'username' input: holds the name of the user
        - 'password' input: holds hte password of the user
        - 'login' button: triggers the ajax call to the server to log in
    - AJAX request to server to log in:
        - request URL: http://s-apis.learningfuze.com/todo/login
        - input (POST):
            - username
            - password
        - output:
            - success: true/false - whether or not the login was successful
            - status:  number - the status of the account (1 is normal user)
            - email: string - the user's email
            - lastName: string - the user's last name
            - firstName: string - the user's first name
            - id: number - the user's ID number
            - errors: array - an array of strings, each holding an error that occurred during the login
- LOGOUT:
    - add logout button
    - AJAX request to server to log out:
        - request URL: http://s-apis.learningfuze.com/todo/logout
        - input (POST):
            - NONE
        - output:
            - success: true/false - whether or not the login was successful
            - msgs: string - logout message, if successful
            - errors: string: error that occurred during the logout

# TODO 1.5 (Group Project)
- Tie in list todo item functionality to server code
    - url:
    - input:
    - output:
- Tie in list individual todo item functionality to server code
    - url:
    - input:
    - output:
- Tie in create todo item functionality
    - url:
    - input:
    - output:

# TODO 1.6 (Group Project)
- Add Update functionality, with the ability to:
    - Edit any data on any one todo item
    - Save that data to the server at the following API:
        - url:
        - input:
        - output:

# TODO 1.7 (Group Project)
- Add Delete functionality, with the ability to:
    - delete a single todo item
    - confirm the todo item will be deleted
    - confirm with the server that the todo item is delete

# TODO 2.0


