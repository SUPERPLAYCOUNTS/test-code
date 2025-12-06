function $(id) {
  var el = 'string' == typeof id
    ? document.getElementById(id)
    : id;

  if (!el) {
    return {
      on: function () { return this; },
      all: function () { return { each: function () { } }; },
      each: function () { },
      getClasses: function () { return []; },
      addClass: function () { },
      removeClass: function () { },
      value: '',
      style: {}
    };
  }

  el.on = function (event, fn) {
    if ('content loaded' == event) {
      event = window.attachEvent ? "load" : "DOMContentLoaded";
    }
    el.addEventListener
      ? el.addEventListener(event, fn, false)
      : el.attachEvent("on" + event, fn);
    return el;
  };

  el.all = function (selector) {
    if (el.querySelectorAll) {
      return $(el.querySelectorAll(selector));
    }
    return $([]);
  };

  el.each = function (fn) {
    if (el instanceof NodeList || Array.isArray(el)) {
      for (var i = 0, len = el.length; i < len; ++i) {
        fn($(el[i]), i);
      }
    } else if (el) {
      fn($(el), 0);
    }
    return el;
  };

  el.getClasses = function () {
    return this.getAttribute && this.getAttribute('class') ? this.getAttribute('class').split(/\s+/) : [];
  };

  el.addClass = function (name) {
    if (this.classList) this.classList.add(name);
    return el;
  };

  el.removeClass = function (name) {
    if (this.classList) this.classList.remove(name);
    return el;
  };

  return el;
}

function search() {
  var str = $('search').value.toLowerCase().trim();
  var clearBtn = $('clear-search');
  var noResultsMsg = $('no-results');
  var projects = $('files').all('li');
  var visibleProjects = 0;

  if (clearBtn.style) {
    clearBtn.style.display = str.length > 0 ? 'block' : 'none';
  }

  projects.each(function (projectItem) {
    var linkCard = projectItem.querySelector('a.project-card');
    if (!linkCard) return;

    var cardName = (linkCard.querySelector('.name') ? linkCard.querySelector('.name').textContent.toLowerCase() : '');
    var cardDescription = (linkCard.querySelector('.description') ? linkCard.querySelector('.description').textContent.toLowerCase() : '');
    var cardTitle = (linkCard.title ? linkCard.title.toLowerCase() : '');

    var textToSearch = cardName + ' ' + cardDescription + ' ' + cardTitle;

    if (textToSearch.includes(str)) {
      projectItem.removeClass('project-hidden');
      visibleProjects++;
    } else {
      projectItem.addClass('project-hidden');
    }
  });

  if (noResultsMsg.style) {
    noResultsMsg.style.display = (visibleProjects === 0 && str.length > 0) ? 'block' : 'none';
  }
}

$(window).on('content loaded', function () {
  var searchInput = $('search');
  var clearBtn = $('clear-search');

  if (searchInput && searchInput.on) {
    searchInput.on('keyup', search);
    searchInput.on('input', search);
  }

  if (clearBtn && clearBtn.on) {
    clearBtn.on('click', function () {
      searchInput.value = '';
      search();
      searchInput.focus();
    });
  }

  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
