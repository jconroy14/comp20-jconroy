# Comp20 Lab 12: Ride-Hailing Server

I currently have implemented the required work for the lab (mimicking the functionality of the originally provided API at https://hans-moleman.herokuapp.com/rides). I also integrated MongoDB to store ride requests in a database.

The first part (minimum requirements) took about 2 hours. Integrating MongoDB took another 3+ hours. A large part of that time was figuring out discrepancies between mongodb versions >= 3.0 and versions < 3.0: first with the MongoClient.connect method (https://stackoverflow.com/a/47694265)
and secondly with an authentication error (very similar to Piazza @150). Downgrading to version 2.2.33 fixed these issues.
My takeaways: backwards compatibility is important, as is reading documentation!
