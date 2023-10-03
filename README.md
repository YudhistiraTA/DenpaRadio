# DenpaRadio

This is a super scuffed attempt at a web radio. It (naively) uses YouTube player API with a pre-made playlist. The way the song is synced up across users is really dumb. Whenever a client has reached a new song, that new song metadata is saved including the time it was played on. Therefore, the next client who loads the site will seek right into the elapsed time between that starting time and current time.

The second part of this project is the live chat function which fared much better than the clunky radio implementation. Here, I used a very basic application of socket.io to register and connect all active clients.

### Things I would've done better

I would've used socket.io to connect the current playtime accross all users too instead of the scuffed call to a database. Not only is the database unneccesary, it's also error prone. Better yet, I should've used a web application framework like Electron for better control. Further study needed.
