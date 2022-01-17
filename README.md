# Notes Terminal DB
### Notes taking application through Terminal(Command Prompt) with Database storage
- This Note taking application contains all the necessary operations which can be needed in a standard note taking application.
- User can take notes from his `terminal` and no need to install any external note taking application for it.
- This application can perform `CRUD` operations in order to create, read, update and delete the note.
- This application validates all the necessary `validations` before performing any task and if something is wrong then displays errors accordingly. <br />
For example, user is trying to delete a note but the note ID is incorrect, then Task doesn't exist error will be displayed on the console.
- I've used `yargs` package to build interactive command line tools, by parsing arguments and generating an elegant user interface.
- Used `cli-color` package for colors, formatting and other goodies for the console.
- The main reason behind using `cli-color` package over other packages is that this package won't mess with built-ins and provides neat way to predefine formatting patterns.

# Screenshots
### :dart: Create Task
![create](https://user-images.githubusercontent.com/52111635/149744563-ad7e03b8-6ab5-40bb-949e-5271e1a284d8.PNG)


### :dart: Delete Task
#### Task deleted successfully
![delete](https://user-images.githubusercontent.com/52111635/149744645-19bdf84e-885d-4f77-ab83-64a1bb706504.PNG)

#### Task doesn't exist in DB
![delete error](https://user-images.githubusercontent.com/52111635/149744737-5e0fe21c-8297-4dea-b492-4f38d9c85595.PNG)


### :dart: Update Task
#### Task updated successfully (completed: false -> true)
![update](https://user-images.githubusercontent.com/52111635/149744857-d53e57f9-4a4f-4c33-af44-26e28695c75e.PNG)

#### Task doesn't exist in DB
![update error](https://user-images.githubusercontent.com/52111635/149744932-00b6c707-97be-43f6-b77f-599b33b608d9.PNG)


### :dart: Read Tasks (Displaying task list)
#### Display all the tasks
![read](https://user-images.githubusercontent.com/52111635/149745121-0bbb2892-3565-4f36-941b-d366f66e90a3.PNG)

#### Display only completed tasks (completed: true)
![read completed](https://user-images.githubusercontent.com/52111635/149745356-2ee83303-8744-464f-9954-393006e81a40.PNG)

#### Display only incomplete tasks (completed: false)
![read incompleted](https://user-images.githubusercontent.com/52111635/149745408-82df4aaf-fd25-44c9-b319-03c9cc6fe57d.PNG)
