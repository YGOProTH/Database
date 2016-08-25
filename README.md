# Status
Code is currently a mess due to learning and immediate focus on functionality while learning. The main files ATM are js/temp.js, Downloader.js, filereading.js, libs/userfunctions.js

Any questions or suggestions, contact [Bromantic] (https://github.com/Bromantic)

# Database
Project to create the next Google for Yugioh.

# For Developers/Contributors
Currently, the code is a real mess due to learning and lack of experience in Javascript and NODEJS. What is currenlty working and to a degree understandable:

* Entire /libs folder
* Entire /desc folder
* Entire /dbs folder
* Entire /cdbs folder
* Entire /views folder
* Pre-converted sample databases
* Existing databases in SQlite format


# Current Capabilities
* Can read any official YGOPro database and convert it to a portable JSON format.
* Can read any remote YGOPro database in JSON form.
* Can retrieve and convert all card data into a readable format.
* Converts all YGOPro databases in the /cdbs folder to the /dbs folder in JSON format.
* Can display cards on-page [you need your own images. CardID.jpg]
* Can search individual databases

##Current Issues

* ~~Missing a GUI~~
* Needs to finish Functions file
* ~~Out of memory when Setcode library is added.~~
* Breaks when URL is manually edited outside it's purpose.

##To do

* ~~Create a web-page~~
* Add Strings/Database specific resources
* ~~Add Web UI~~
* Add Web-based Card Managers
* Add Wikia Integration
* Add Official Konami Database Integration
* Add Upload cdb functionality for developers

* Optimize code for speed and performance

**~~The rest of the database entries can be done, but need to resolve the memory issue first or scrap it.~~**


Special thanks goes to [Buttys](https://github.com/Buttys), [Access Denied](https://github.com/Zayelion), and [Percival](https://github.com/Percival18) for their helping with code and proof-reading. This includes snippets, suggestions, and guidelines.

**Buttys** - Helping with parsing and loops

**Percival** - Helping with parsing and loops

**Access Denied** - Donating code snippets, helping with code, providing resources and tools to develop better Javascript.

The end result is a central hub that can search the official TCG Konami Database, the Wikia, and YGOpro databases, in addition to displaying them.
