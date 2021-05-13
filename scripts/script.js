// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

window.addEventListener('popstate', (event) => {
  setState(event.state.nextState, event.state.entryNum, event.state.entry, true);
});

let settingIcon = document.getElementsByTagName('header')[0].getElementsByTagName('img')[0];
settingIcon.addEventListener('click', () => {
  setState('settings', null, null, false);
});

let topTitle = document.getElementsByTagName('header')[0].getElementsByTagName('h1')[0];
topTitle.addEventListener('click', () => {
  setState('main', null, null, false);
});


// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let numEntry = 1; 

      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        newPost.addEventListener('click', () => {
          setState('single-entry', numEntry, newPost.entry, false);
        });
        numEntry = numEntry + 1;
      });
    });
});
