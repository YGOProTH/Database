# Database
Project to create a stable card database to be used for Yugioh and YGOPro, including [Yu-Gi-Oh Wikia](http://yugioh.wikia.com/wiki/Yu-Gi-Oh!_Wikia) and [Yu-Gi-Oh TCG](www.db.yugioh-card.com) 

# For Developers/Contributors
Currently, the code is a real mess due to learning and lack of experience in Javascript and NODEJS. What is currenlty working and to a degree understandable:

* Entire /libs folder
* Entire /desc folder
* Entire /dbs folder
* Entire /cdbs folder
* Pre-converted sample databases
* Existing databases in SQlite format


# Current Capabilities
* Can read any official YGOPro database and convert it to a portable JSON format.
* Can read any remote YGOPro database in JSON form.
* Can retrieve and convert all card data into a readable format.
* Converts all YGOPro databases in the /cdbs folder to the /dbs folder in JSON format.

##Current Issues

* ~~Missing a GUI~~
* Needs to finish Functions file
* ~~Out of memory when Setcode library is added.~~

##To do

* ~~Create a web-page~~
* ~~Add Web UI~~
* Add Web-based Card Manager
* Improve CSS
* Fully use Snrk's Wikia API
* Configure Access to AntiMetaMan's images
* Optimize code for speed and performance

**~~The rest of the database entries can be done, but need to resolve the memory issue first or scrap it.~~**


Special thanks goes to [Buttys](https://github.com/Buttys), [Access Denied](https://github.com/Zayelion), and [Percival](https://github.com/Percival18) for their helping with code and proof-reading. This includes snippets, suggestions, and guidelines.

**Buttys** - Helping with parsing and loops

**Percival** - Helping with parsing and loops

**Access Denied** - Donating code snippets, helping with code, providing resources and tools to develop better Javascript.

The end result is a Wikia-style centralized database resource for all YGOPro services and constantly updated by the community.
