import React from 'react';
import './App.css';
import Collage from './components/Collage';
import Carousel from "./components/Carousel";

function App() {
  return (
      <div>
        <Collage/>
        <Carousel />
      </div>
  );
}

window.addEventListener("scroll", function () {
  if (this.scrollY === 0) {
    document.querySelector('.nav__button_search').setAttribute('hidden', true);
    document.querySelector('.form').removeAttribute('hidden');
    document.querySelector('.carousel').removeAttribute('hidden');
  } else {
    document.querySelector('.nav__button_search').removeAttribute('hidden');
    document.querySelector('.form').setAttribute('hidden', true);
    document.querySelector('.carousel').setAttribute('hidden', true);
  }
});

export default App;
