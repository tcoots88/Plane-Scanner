# Plane-Scanner

### Plane Scanner is an innovative tool for plane enthusiasts, those in the aeronautical field, or anyone interested in learning a bit more about the functionality of aircraft.  Those utilizing this tool will be able to see what aircraft are in their area and learn about air communications and emergency codes being posted.


### SQL Information
Aircraft <br>
ID SERIAL PRIMARY KEY <br>
type VARCHAR(255) <br>
Manufacturer   VARCHAR(255) <br>
Model   VARCHAR(255) <br>
Arrival Time  TIMESTAMP <br>
Registration Number  VARCHAR(255) <br>
Departue Time  TIMESTAMP <br>
SQUAWK Code  INTEGERS <br>
Airport <br>
ID SERIAL PRIMARY KEY <br>
Latitude NOT NULL INTEGER <br>
Longitude  NOT NULL INTEGER <br>
Code   VARCHAR <br>
Name VARCHAR <br>
Aircraft-Airport <br>
ID SERIAL PRIMARY KEY <br>
Aicraft_ID Foreign Key <br>
Airport_ID Foreign Key <br>




##### Group Members
- Hollie Thomas
- Micah Thorstenson
- Silas Oyewale
- Travis Coots
