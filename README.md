# artsee
> Find, share, and explore hidden art gems in your city

## Table of Contents

- [About](#About)
- [Screens](#Screens)
- [Who](#Who)

## About 
A Native app that helps users find graffiti and art around a city. Stack consists of React Native, Redux, Ruby on Rails, PostgreSQL, and MongoDB. 

The app contains 4 sections, MapView, FeedScreen, Camera, and ProfileScreen. The map contains markers, which each represent an art piece that a user has uploaded. Upon clicking a marker, a modal view will show the user the image, as well as accompanying information (comments, liked, visited, etc). The feed section is a collection of all art pieces uploaded by users. This is presented by a scrolling list of images. Each image is accompanied by user who uploaded, icons to like, claim as visited, or want to see. Users can also comment on each image. The profile page consists of the user's avatar, background image, and the collection of art pieces they've liked, visted, or want to see. 

The camera screen is how users upload a picture of the art piece they wish to share. Upon taking a picture, the location of the user is attached to the image, which our backend will process. We use AWS Rekognition in order to scan the image, and return meta-data on attributes that the image meets. Of interest to us is whether the image contains 'graffiti' as one of it's attributes, if so, and the percentage of graffiti is higher than 30%, we will automatically accept the image, and add it to the feed screen. Otherwise it is rejected, for a moderator to review. 

What we have thus far is the culmination of 2 week's work, for our bootcamp's final project.


## Screens
<h3 align="center">MapView</h3>
<div align="center">
  <img src="./assets/readme_assets/map.gif" />
</div>
<hr>

<h3 align="center">FeedScreen</h3>
<div align="center">
  <img src="./assets/readme_assets/feed.gif" />
</div>
<hr>

<h3 align="center">ProfileScreen</h3>
<div align="center">
  <img src="./assets/readme_assets/profile.gif" />
</div>

## Who

[Arturas Zuta](https://github.com/arturaszuta)
- AWS Rekognition and Bucket
- Rails Back-End API
- FeedScreen
  - Main Component
  - Filters
- Camera Implementation

[Annie Kao](https://github.com/anniekao)
- Authentication and Login
- Session and Security
- App Component Navigation
- Profile Screen
- MongoDB (for comments)

[David Nguyen](https://github.com/ahrke)
- Rails Back-end (Routes, Models, Controllers), and API
- PostgreSQL (schema, and generation)
- Maps View
- Redux Implementation
- CloudImage (for compression) and image caching

In general, we as a team, worked on most components together, either by pair programming, or assisting. 