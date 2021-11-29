# PGPrograms
 This repo contains my 3rd year Web Development project

	Instructions for running on your own machine:
Firstly lets set up the tables.
You have 2 options either run the script db.sql in any postgres instance or open your postgres terminal and coppy-paist the sql directly in.
Make a file called .env and add the following lines:

username=username
password=password
dbname=database
secret=secret

Replace the values after the = with your own.
Next you need to add a user in order to use the website properly.
To do this:
1. download the files in the repo and open any terminal in the pgprograms directory,
2. run "npm install" in order to set everything up,
3. run node app.js and wait until you see "Server running on port 3000"
if this doesn't work you may want to open the app.js file and change the port the web server will run on,
4. open any browser and enter localhost:3000 or if you're trying to access the website on another device enter the ipv4 address followed by :3000 it should look like:
192.168.x.x:3000
5. click on the create account link in the top-right of the page,
6. fill out the form and create your account.
Now you should be able to use the website.
