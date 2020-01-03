# Plane-Scanner

### Plane Scanner is an innovative tool for plane enthusiasts, those in the aeronautical field, or anyone interested in learning a bit more about the functionality of an aircraft.  Those utilizing this tool will be able to see what aircraft are in their area and learn about air communications and emergency codes being posted. These application is borne out of necessity. It helps users to know the aircrafts around them and how to act accordingly.


### SQL Information
 #### Aircraft
ID SERIAL PRIMARY KEY <br>
type VARCHAR(255) <br>
Manufacturer   VARCHAR(255) <br>
Model   VARCHAR(255) <br>
Arrival Time  TIMESTAMP <br>
Registration Number  VARCHAR(255) <br>
Departue Time  TIMESTAMP <br>
SQUAWK Code  INTEGERS <br>
Explanation: The aircraft table is to hold the information for the aircraft. It has the above attributes with their respective data types. Since an aircraft can belong to many airports and an airport can have many aircrafts, the relationship is many to many leading to the creation of another table with 2 foreign keys. The SQUAWK code tells us the situation the aircraft may be in distress, emergency, hijacking, radio failure etc.  <br> 
#### Airport
ID SERIAL PRIMARY KEY <br>
Latitude NOT NULL INTEGER <br>
Longitude  NOT NULL INTEGER <br>
Code   VARCHAR <br>
Name VARCHAR <br>
Explanation: The airport table holds the information for the airport. It has a many to many relationship with aircraft. The latitude and longitude provide the current location of the aircraft and the code is the suggestive abbreviation of the airport. The name of the airport is the actual name for which the airport is known.   <br>
#### Aircraft-Airport
ID SERIAL PRIMARY KEY <br>
Aicraft_ID Foreign Key <br>
Airport_ID Foreign Key <br>
This is the join table that emerged through the intersecton of two tables that have many to many relationships.  <br>


##### Group Members
- Hollie Thomas
- Micah Thorstenson
- Silas Oyewale
- Travis Coots

#### Prerequisites
To run the plane scanner app, you need to install into your terminal 
- ejs
- node modules
- packet.json 
- express,
- superagent
- jquery
- method-override
- pg
To install the above prerequities, use npm install.


#### Running the plane scanner application
To run the automated tests, you will need an API key from flightradar24 or any agency that can provide the necessary data about any aircraft flying in real time. This API key should be stored in a .env file to prevent public access to the key.

#### Deployment
This app is deployed and hosted by heroku. This is the heroku url https://git.heroku.com/plane-scanner-htms.git

#### Built With
This app was built with the jQuery library and a team of four engineers with a great attitude.

#### License
This project is licensed under the MIT license -see the LICENSE.md file for details. 

#### Acknowledgements
Hat off to our amiable 301 instructor, Nicholas, the supportive TAs- Josh1, Josh2, Chance and our users. 
