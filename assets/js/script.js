function $(id){
  var el = 'string' == typeof id
  ? document.getElementById(id)
  : id;

  if (!el) {
    return {
      on: function() {},
      all: function() { return { each: function() {} }; },
      each: function() {},
      getClasses: function() { return []; },
      addClass: function() {},
      removeClass: function() {},
      value: ''
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
      if (el.querySelectorAll) {
        return $(el.querySelectorAll(selector));
      }
      return $([]);
    };

    el.each = function(fn){
      if (el instanceof NodeList || Array.isArray(el)) {
        for (var i = 0, len = el.length; i < len; ++i) {
          fn($(el[i]), i);
        }
      } else if (el) {
        fn($(el), 0);
      }
    };

    el.getClasses = function(){
      return this.getAttribute && this.getAttribute('class') ? this.getAttribute('class').split(/\s+/) : [];
    };

    el.addClass = function(name){
      if (!this.classList) return;
      this.classList.add(name);
    };

    el.removeClass = function(name){
      if (!this.classList) return;
      this.classList.remove(name);
    };

  return el;
}

function search() {
  var str = $('search').value.toLowerCase().trim();
  var links = $('files').all('a.project-card');

  links.each(function(linkCard){
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
  if (searchInput && searchInput.on) {
      searchInput.on('keyup', search);
      searchInput.on('input', search);
  }

  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
  }
});