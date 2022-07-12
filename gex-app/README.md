# Runescape 3 Grand Exchange Listing Search and Display App.

## Project Status
This project is in a state in which i feel satisfied and hosting it.

## What does this application do?
This app allows a user to search current data using the api produced by the rs3 wiki team [here](https://api.weirdgloop.org/#/).
After searching for a single item, or multiple comma separated items:
As long as said items are tradeable and real items in the grand exchange they will be populated with images
from the rs3 wiki in a grid (Flexbox to be exact).

The user can then either remove a search if it is no longer wanted or expand the Item Card and view
the past 90 days of price history.

A favouriting function is also available - after a search has been performed and a user has all
desired items displayed, they may press "Save Favourites" which will save a string of these items
into the localStorage.
The "Load Favourites" button, will load all of your stored favourites, even persisting through reload.

## Plans for the future:
I plan on implementing the future features:
* Option for longer price history.
* Option for Old School Runescape as well as Runescape 3.
* Allow users to select multiple items to display on the same graph.