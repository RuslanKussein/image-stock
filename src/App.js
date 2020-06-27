import React from 'react';
import './App.css';
import Collage from './components/Collage';
import Carousel from "./components/Carousel";
import Nav from './components/Nav';

function App() {
  return (
      <div>
        <Nav/>
        <Collage/>
        {/*<Carousel />*/}
      </div>
  );
}

window.addEventListener("scroll", function () {
  if (this.scrollY === 0) {
    document.querySelector('.nav__button_search').setAttribute('hidden', true);
    document.querySelector('.form').removeAttribute('hidden');
  } else {
    document.querySelector('.nav__button_search').removeAttribute('hidden');
    document.querySelector('.form').setAttribute('hidden', true);
  }
});

export default App;
