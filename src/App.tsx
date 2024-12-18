import React from 'react';
import './styles/main.scss';
import { TimeBlock } from './components/TimeBlock/TimeBlock';

const DATA = [
  {
    id: 1,
    number: 1,
    title: 'Искусство',
    years: [2000, 2004],
    slides: [
      {
        year: 2000,
        text: 'Выставка "Ван Гог: Эпоха постимпрессионизма" открылась в Лондоне.',
      },
      {
        year: 2001,
        text: 'На Венецианской биеннале была представлена работа "Свет и тень" от художника Дэмиена Херста.',
      },
      {
        year: 2002,
        text: 'Состоялся первый международный фестиваль современного искусства в Сент-Этьене, Франция.',
      },
      {
        year: 2003,
        text: 'Открытие музея Гуггенхайма в Бильбао, Испания.',
      },
      {
        year: 2004,
        text: 'Синематограф отмечает 100-летие, приуроченное к первым фильмам братьев Люмьер.',
      },
    ],
  },
  {
    id: 2,
    number: 2,
    title: 'Развлечения',
    years: [2005, 2008],
    slides: [
      {
        year: 2005,
        text: 'Оскар за лучший фильм получил фильм "Миллионер из трущоб".',
      },
      {
        year: 2006,
        text: 'Летние Олимпийские игры в Турине: спортсмены соревновались в 15 видах спорта.',
      },
      {
        year: 2007,
        text: 'Выпуск первой части фильма "Гарри Поттер и Орден Феникса".',
      },
      {
        year: 2008,
        text: 'Летние Олимпийские игры в Пекине, где США выиграли 110 медалей.',
      },
    ],
  },
  {
    id: 3,
    number: 3,
    title: 'Спорт',
    years: [2009, 2011],
    slides: [
      {
        year: 2009,
        text: 'Финал Кубка мира по регби, где победила Южноафриканская Республика.',
      },
      {
        year: 2010,
        text: 'Шахматист Гарри Каспаров объявляет о завершении карьеры.',
      },
      {
        year: 2011,
        text: 'Победа Британии на Чемпионате мира по регби среди юниоров.',
      },
    ],
  },
  {
    id: 4,
    number: 4,
    title: 'Наука',
    years: [2012, 2016],
    slides: [
      {
        year: 2012,
        text: 'Обнаружение водяного пара на экзопланете K2-18b.',
      },
      {
        year: 2013,
        text: 'Запуск миссии NASA Maven для изучения атмосферы Марса.',
      },
      {
        year: 2014,
        text: 'Появление первых беспроводных технологий 5G.',
      },
      {
        year: 2015,
        text: 'Погода: 13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды.',
      },
      {
        year: 2016,
        text: 'Первое полное солнечное затмение в США с 1979 года произошло 21 августа.',
      },
    ],
  },
  {
    id: 5,
    number: 5,
    title: 'Технологии',
    years: [2017, 2020],
    slides: [
      {
        year: 2017,
        text: 'Запуск новой версии iPhone, iPhone X.',
      },
      {
        year: 2018,
        text: 'Развитие технологий искусственного интеллекта и машинного обучения.',
      },
      {
        year: 2019,
        text: 'Запуск 5G-сетей в нескольких странах.',
      },
      {
        year: 2020,
        text: 'Пандемия COVID-19 приводит к увеличению использования технологий для удаленной работы.',
      },
    ],
  },
  {
    id: 6,
    number: 6,
    title: 'Экономика',
    years: [2021, 2023],
    slides: [
      {
        year: 2021,
        text: 'Мировое восстановление экономики после пандемии COVID-19.',
      },
      {
        year: 2022,
        text: 'Цены на нефть достигают рекордных уровней из-за геополитических конфликтов.',
      },
      {
        year: 2023,
        text: 'Устойчивый рост цифровой экономики и онлайн-услуг.',
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <TimeBlock data={DATA}/>
    </div>
  );
}

export default App;
