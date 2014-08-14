
/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  function closeMenu() {
    body.classList.remove('open');
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    body.classList.toggle('open');
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
    navdrawerContainer.classList.add('opened');
  }

  main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });
})();


(function (){
  var i = 0;
  var podcastID, podcastTitle, podcastDescription;
  var playButton = document.getElementById("play");
  var pauseButton = document.getElementById("pause");
  var nextButton = document.getElementById("next");
  var stopButton = document.getElementById("stop");

  SC.initialize({
    client_id: "cd8eb15c60bad19fff81da4d11951557",
  });

  // Open JSON
  function loadJSON() {
    var data_file = "https://api.soundcloud.com/users/zofepod/tracks.json?client_id=cd8eb15c60bad19fff81da4d11951557";
    var http_request = new XMLHttpRequest();
    try{
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
    }catch (e){
      // Internet Explorer Browsers
      try{
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
        try{
          http_request = new ActiveXObject("Microsoft.XMLHTTP");
          }catch (e){
            // Something went wrong
            alert("Your browser broke!");
            return false;
          }
      }
    }

    http_request.onreadystatechange  = function(){

      if (http_request.readyState == 4  ) {

        // Javascript function JSON.parse to parse JSON data
        var jsonObj = JSON.parse(http_request.responseText);
        
        createPodcast(jsonObj);
      }
    
    }
    
    http_request.open("GET", data_file, true);
    http_request.send();

  }

  function createPodcast(data) {
    podcastTotal = data.length;
    var podcastID = data[i].id;
    var podcastTitle = data[i].title;
    var podcastDescription = data[i].description;

    playPodcast(podcastID);
    infoPodcast(podcastTitle, podcastDescription);
  }

  function playPodcast(id) {
    SC.stream("/tracks/"+id, function(sound){
      // ontimedcomments: function(comments){
      //   console.log(comments[0].body);
      // };

      sound.play();

      playButton.onclick = function(){
        sound.play();
      }

      pauseButton.onclick = function(){
        sound.pause();
      }

      nextButton.onclick = function(){
        i += i;
        playPodcast(i);
      }


    });
  }

  function infoPodcast(title,description){
    document.getElementById("zofe-title").innerHTML = title;
    document.getElementById("zofe-description").innerHTML = description;
  }

  loadJSON();


})()
