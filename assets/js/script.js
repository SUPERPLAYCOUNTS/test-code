// Оставляем вашу функцию $ для совместимости, хотя можно перейти на querySelector
function $(id){
  var el = 'string' == typeof id
  ? document.getElementById(id)
  : id;

  // Защита от null, если элемент не найден
  if (!el) {
    // console.warn('Element not found:', id);
    // Возвращаем фиктивный объект с пустыми методами, чтобы не ломать цепочки вызовов
    return {
      on: function() {},
      all: function() { return { each: function() {} }; },
      each: function() {},
      getClasses: function() { return []; },
      addClass: function() {},
      removeClass: function() {},
      value: '' // для случая $('search').value
    };
  }

  el.on = function(event, fn){
    if ('content loaded' == event) {
      event = window.attachEvent ? "load" : "DOMContentLoaded";
    }
    el.addEventListener
      ? el.addEventListener(event, fn, false)
      : el.attachEvent("on" + event, fn);
    };

    el.all = function(selector){
      // Убедимся, что querySelectorAll вызывается на DOM элементе
      if (el.querySelectorAll) {
        return $(el.querySelectorAll(selector));
      }
      return $([]); // Возвращаем пустой массив-объект, если el не DOM элемент
    };

    // Модифицируем .each, чтобы он работал с NodeList (результатом querySelectorAll)
    el.each = function(fn){
      if (el instanceof NodeList || Array.isArray(el)) {
        for (var i = 0, len = el.length; i < len; ++i) {
          fn($(el[i]), i); // Оборачиваем каждый элемент в $ для доступа к кастомным методам
        }
      } else if (el) { // Если это одиночный элемент
        fn($(el), 0);
      }
    };

    el.getClasses = function(){
      // Проверка на существование getAttribute
      return this.getAttribute && this.getAttribute('class') ? this.getAttribute('class').split(/\s+/) : [];
    };

    el.addClass = function(name){
      if (!this.classList) return; // Защита для старых браузеров или не-элементов
      this.classList.add(name);
    };

    el.removeClass = function(name){
      if (!this.classList) return; // Защита
      this.classList.remove(name);
    };

  return el;
}

function search() {
  var str = $('search').value.toLowerCase().trim();
  var links = $('files').all('a.project-card'); // Ищем только карточки проектов

  links.each(function(linkCard){
    // Текст для поиска берем из имени, описания
    var cardName = linkCard.querySelector('.name') ? linkCard.querySelector('.name').textContent.toLowerCase() : '';
    var cardDescription = linkCard.querySelector('.description') ? linkCard.querySelector('.description').textContent.toLowerCase() : '';
    var cardTitle = linkCard.title ? linkCard.title.toLowerCase() : '';
    
    var textToSearch = cardName + ' ' + cardDescription + ' ' + cardTitle;

    if (str.length && textToSearch.includes(str)) {
      linkCard.addClass('highlight');
    } else {
      linkCard.removeClass('highlight');
    }
  });
}

$(window).on('content loaded', function(){
  var searchInput = $('search');
  if (searchInput && searchInput.on) { // Проверяем, что searchInput существует и имеет метод on
      searchInput.on('keyup', search);
      searchInput.on('input', search); // Для случаев вставки текста мышью
  }

  // Установка текущего года в футере
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
  }
});

// Если есть пустые теги span.date, можно добавить текст-заглушку через JS,
// но лучше это сделать через CSS :empty псевдокласс (что я и сделал в CSS)
/*
document.addEventListener('DOMContentLoaded', () => {
    const dateSpans = document.querySelectorAll('#files .project-card .date');
    dateSpans.forEach(span => {
        if (span.textContent.trim() === '') {
            // span.textContent = 'Дата не указана';
            // span.style.fontStyle = 'italic';
            // span.style.color = '#666'; // Сделать менее заметным
        }
    });
});
*/