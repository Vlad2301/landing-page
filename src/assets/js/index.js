import "swiper/swiper.min.css";
import "../styles/reset.scss";
import "../styles/style.scss";

import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);


const sections = document.querySelectorAll('.section');
const checkbox = document.querySelectorAll('.checkbox');
const faqItem = document.querySelectorAll('.faq-item');
const header = document.querySelector('.header');
const menuBurger = document.querySelector('.header-menu__button');
const menuLinks = document.querySelectorAll('.header-menu__link');
const video = document.getElementById('video');
const videoBtn = document.querySelector('.video-btn');
const language = document.querySelectorAll(".language");


let isPlay = false;

const checkboxes = {
  requirements: ["minimum", "recommended"],
  versions: ["standard", "limited"],
};


/* Functions */
const openMenu = () => {

  header.classList.toggle('opened');
};

const handleCheckbox = ({ currentTarget: { checked, name } }) => {
  const value = checkboxes[name][Number(checked)];
  const list = document.getElementById(value);
  const tabs = document.querySelectorAll(`[data-${name}]`);
  const siblings = list.parentElement.children;

  for (const item of siblings) item.classList.remove('active');
  for (const tab of tabs) {
    tab.classList.remove('active');
    tab.dataset[name] === value && tab.classList.add('active');
  }

  list.classList.add('active');
}
const scrollToSection = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');

  if (!href && !href?.starWith('#')) {
    return;
  }

  const section = href.slice(1);
  const top = document.getElementById(section)?.offsetTop || 0;
  window.scrollTo({ top, behavior: 'smooth' });
};


const formatValue = (value) => (value < 10 ? `0${value}` : value);

const getTimerValues = (diff) => {
  return {
    seconds: (diff / 1000) % 60,
    minutes: (diff / (1000 * 60)) % 60,
    hours: (diff / (1000 * 3600)) % 24,
    days: (diff / (1000 * 3600 * 24)) % 30,
  }
}

const setTimerValues = (values) => {
  Object.entries(values).forEach(([key, value]) => {
    const timerValue = document.getElementById(key);
    timerValue.innerText = formatValue(Math.floor(value));
  });
};

const startTimer = (date) => {
  const id = setInterval(() => {
    const diff = date.getTime() - new Date().getTime();

    if (diff < 0) {
      clearInterval(id);
      return;
    }

    setTimerValues(getTimerValues(diff));
  }, 1000);
};

startTimer(new Date(2023, 9, 25, 0, 0, 0, 0));

const handleVideo = ({ target }) => {
  const info = target.parentElement;

  isPlay = !isPlay;
  info.classList.toggle('hidden', isPlay);
  target.innerText = isPlay ? "Pause" : "Play";
  isPlay ? video.play() : video.pause();
};
const initSlider = () => {
  new Swiper('.swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    initialSlide: 2,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
}

const handleFaqItem = ({ currentTarget: target }) => {
  target.classList.toggle('opened');

  const isOpened = target.classList.contains('opened');
  const height = target.querySelector("p").clientHeight;
  const content = target.querySelector(".faq-item__content");

  content.style.height = `${isOpened ? height : 0}px`;
}

const handleScroll = () => {
  const { scrollY: y, innerHeight: h } = window;
  sections.forEach((sec) => {
    if (y > sec.offsetTop - h / 1.5) sec.classList.remove('hidden');
  });
};


initSlider();

/* addEventListeners */
menuBurger.addEventListener('click', openMenu);
window.addEventListener("scroll", handleScroll);
menuLinks.forEach((link) => {
  link.addEventListener('click', scrollToSection);
});
language.forEach((lang) => lang.addEventListener("click", toggleLanguage));
checkbox.forEach((checkbox) => {
  checkbox.addEventListener('click', handleCheckbox);
});
videoBtn.addEventListener("click", handleVideo);

faqItem.forEach(item => {
  item.addEventListener('click', handleFaqItem);
})
