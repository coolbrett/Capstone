# Capstone
This repository is home to our Capstone assignment. 
Our goals for this project are to build an interactive website that visualizes our dataset which we will store in a graph database. 
Tools we are using are Reactjs, Neo4j, and the data visualization library titled 'D3'.


#Purpose 
The purpose of this project is to take the IMDb's 2016 Top 1000 movies and create a visualization
tool allowing users to query the dataset to narrow down the display.


#Setup (Using Webstorm)
1a. Create a new project using React

1b. Wait for it to load all the dependencies

2. While waiting go to the github, hit the green "Code" button, and copy the HTTPS link.
3. On the top left click on "Git"
4. At the bottom click "Clone"
5. Paste the copied link from step 2 into the URL box.
6. Hit submit
7. A warning will show in the bottom left. Click "Run 'npm install'"
8. Upon loading, on the left side there is a tab called "Project" that's vertical, click that
8b. That's how you can view the code. It's in my-app/src/components
9. After everything is installed, at the bottom click "Terminal" and type "npm start" to load the GUI
10. The GUI will open into the most recent browser tab you were on.
11. Make sure the database is on in order to perform queries.


#Setup (Neo4j)
1. Go to "https://neo4j.com/download/" and download the Desktop version. This only works on desktop because of security limitations.
2. Launch the setup executable and follow the guide to start the Neo4j desktop app.
3. Once in Neo4j app, create a project using the `+` button in the top left
4. Click on the newly created project and click the `+ Add` button, then press `Local DMBS`
5. The name does not matter, but make sure to remember the password. Version should be `4.3.1`
6. Click on the three dots when you hover the new DBMS and press `settings`
7. Paste the following at the top of the file: 

`apoc.export.file.enabled=true`

`apoc.import.file.use_neo4j_config=false`
9. Hover the new DBMS and press the Start button
10. Once started, click Open (should default to Browser) and watch a new window appear
11. Click the top left icon titled `Database Information` and in that section, `click :server user add`
12. Enter a username and password
13. Open up the project, and open up `create.js` in the `graph` folder
14. The lines at the top starting with `const user` and `const password` need to be updated to the username and password you just set
15. Go into the directory above `graph` and run the command `node graph/create.js` and the local DBMS will populate
16. Go to `my-app/src/components/QueryList.js`
17. At the top of the file, any lines of code that say `const driver = ...` need to be commented out, and underneath paste the following: `const driver = createDriver('bolt', 'localhost', 7687, '<username>', '<password>')
    ` where username and password are replaced with the DBMS username and password just created
18. Project should now run correctly! Go just inside the `my-app` directory and run `npm start`



#Notes
This is a work in progress. There are some features that act finicky at times. 
For example after performing a new query the webpage has to be refreshed
in order to properly view the bar graphs, or to perform a query the submit/reset button must be clicked multiple times.

