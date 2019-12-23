# Plane-Scanner

### Plane Scanner is an innovative tool for plane enthusiasts, those in the aeronautical field, or anyone interested in learning a bit more about the functionality of aircraft.  Those utilizing this tool will be able to see what aircraft are in their area and learn about air communications and emergency codes being posted.


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
