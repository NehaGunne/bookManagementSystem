// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/book.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Book = void 0;

var Book =
/** @class */
function () {
  function Book(name, author, rating, price, id) {
    this.name = name;
    this.author = author;
    this.rating = rating;
    this.price = price;
    this.id = id;
  }

  return Book;
}();

exports.Book = Book;
},{}],"lib/bookManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookManager = void 0;

var BookManager =
/** @class */
function () {
  function BookManager() {}

  BookManager.prototype.searchByTitle = function (res, inpVal, books) {
    for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
      var i = books_1[_i];

      if (i.name === inpVal) {
        res.push(i);
      }
    }

    return res;
  };

  BookManager.prototype.searchByAuthor = function (res, inpVal, books) {
    for (var _i = 0, books_2 = books; _i < books_2.length; _i++) {
      var i = books_2[_i];

      if (i.author === inpVal) {
        res.push(i);
      }
    }

    return res;
  };

  BookManager.prototype.searchByRating = function (res, inpVal, books) {
    for (var _i = 0, books_3 = books; _i < books_3.length; _i++) {
      var i = books_3[_i];

      if (i.rating >= parseFloat(inpVal)) {
        res.push(i);
      }
    }

    return res;
  };

  BookManager.prototype.searchByPrice = function (res, min, max, books) {
    for (var _i = 0, books_4 = books; _i < books_4.length; _i++) {
      var i = books_4[_i];

      if (i.price >= min && i.price <= max) {
        res.push(i);
      }
    }

    return res;
  };

  return BookManager;
}();

exports.BookManager = BookManager;
var manager = new BookManager();
},{}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var book_1 = require("./lib/book");

var bookManager_1 = require("./lib/bookManager");

var result = [];
var tab = document.getElementById("tbody");
var table = document.getElementById("table1");
var home = document.getElementById("homeCont");
var inp = document.getElementById("searchInput");
var searchPg = document.getElementById("searchCont");
var addPg = document.getElementById("addCont");
var selEl = document.getElementById("select");
var selValue = "";
var priceCont = document.getElementById("price");
var othersCont = document.getElementById("otherThanPrice");
var count = 0;

var BookApp =
/** @class */
function () {
  function BookApp() {}

  BookApp.prototype.addBook = function (each) {
    var name = each.name,
        author = each.author,
        rating = each.rating,
        price = each.price,
        id = each.id;
    var row = "<tr id=" + id + ">\n                <td>" + name + "</td>\n                <td>" + author + "</td>\n                <td>" + rating + "</td>\n                <td>" + price + "</td>\n                <td>\n                <button class=\"delete\">\n                <i class=\"fas fa-trash-alt\"></i>\n                </button>\n                </td>\n            </tr>";
    tab.innerHTML += row;
  };

  BookApp.prototype.getBooksList = function () {
    table.classList.remove("d-none");

    if (count == 0) {
      for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
        var i = books_1[_i];
        appObj.addBook(i);
      }

      count++;
    }
  };

  BookApp.prototype.getSearchPage = function () {
    count = 0;
    table.classList.add("d-none");
    home.classList.add("d-none");
    tab.innerHTML = "";
    searchPg.classList.remove("d-none");
  };

  BookApp.prototype.searchBooks = function () {
    result = [];
    tab.innerHTML = "";
    var inpVal = inp.value;

    if (selValue === "name") {
      result = manager.searchByTitle(result, inpVal, books);
    } else if (selValue === "author") {
      result = manager.searchByAuthor(result, inpVal, books);
    } else if (selValue === "rating") {
      result = manager.searchByRating(result, inpVal, books);
    } else if (selValue === "price") {
      var minPrice = document.getElementById("priceMin");
      var maxPrice = document.getElementById("priceMax");
      var min = parseInt(minPrice.value);
      var max = parseInt(maxPrice.value);
      result = manager.searchByPrice(result, min, max, books);
    }

    table.classList.remove("d-none");

    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
      var i = result_1[_i];
      appObj.addBook(i);
    }
  };

  BookApp.prototype.getValue = function () {
    inp.placeholder = "enter " + selEl.value;
    selValue = selEl.value;
    priceCont.classList.add("d-none");
    othersCont.classList.remove("d-none");

    if (selValue === "price") {
      priceCont.classList.remove("d-none");
      othersCont.classList.add("d-none");
    }
  };

  BookApp.prototype.returnHome = function () {
    searchPg.classList.add("d-none");
    home.classList.remove("d-none");
    table.classList.add("d-none");
    addPg.classList.add("d-none");
  };

  BookApp.prototype.getAddPage = function () {
    addPg.classList.remove("d-none");
    searchPg.classList.add("d-none");
    home.classList.add("d-none");
    table.classList.add("d-none");
  };

  BookApp.prototype.getAddingDetails = function () {
    var addNameInp = document.getElementById("bookName");
    var addAuthorInp = document.getElementById("bookAuthor");
    var addRatingInp = document.getElementById("bookRating");
    var addPriceInp = document.getElementById("bookPrice");
    var addIdInp = document.getElementById("bookId");
    var name = addNameInp.value;
    var author = addAuthorInp.value;
    var rating = parseFloat(addRatingInp.value);
    var price = parseInt(addPriceInp.value);
    var id = parseInt(addIdInp.value);
    var msg = document.getElementById("msg");
    var flag = true;

    for (var _i = 0, books_2 = books; _i < books_2.length; _i++) {
      var i = books_2[_i];
      flag = true;

      if (i.id === id) {
        flag = false;
        alert("id already exists");
        msg.classList.add("d-none");
      }
    }

    if (name == "" || author == "" || rating == NaN || price == NaN || id == NaN) {
      alert("enter all the details");
    } else if (!(name == "" || author == "" || rating == NaN || price == NaN || id == NaN) && flag) {
      msg.classList.remove("d-none");
      books.push(new book_1.Book(name, author, rating, price, id));
      localStorage.setItem("books", JSON.stringify(books));
    }
  };

  BookApp.prototype.getBooksFromLocalStorage = function () {
    var stringifiedBooks = localStorage.getItem("books");
    var parsedBooks = JSON.parse(stringifiedBooks);

    if (parsedBooks === null) {
      return [];
    } else {
      return parsedBooks;
    }
  };

  BookApp.prototype.onDeleteRow = function (e) {
    if (!e.target.classList.contains("delete")) {
      return;
    }

    var btn = e.target;
    btn.closest("tr").remove();
    var delEl = e.target.parentElement.parentElement.id;

    for (var _i = 0, books_3 = books; _i < books_3.length; _i++) {
      var i = books_3[_i];

      if (i.id == delEl) {
        var index = books.indexOf(i);
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
      }
    }
  };

  return BookApp;
}();

var manager = new bookManager_1.BookManager();
var appObj = new BookApp();
var books = appObj.getBooksFromLocalStorage();
localStorage.setItem("books", JSON.stringify(books));
var bookList = document.getElementById("bookList");
bookList.addEventListener("click", appObj.getBooksList);
var getSearchPage = document.getElementById("getSearchPage");
getSearchPage.addEventListener("click", appObj.getSearchPage);
var searchEl = document.getElementById("searchBtn");
searchEl.addEventListener("click", appObj.searchBooks);
var searchBack = document.getElementById("searchBack");
searchBack.addEventListener("click", appObj.returnHome);
selEl.addEventListener("change", appObj.getValue);
var addBook = document.getElementById("addPage");
addBook.addEventListener("click", appObj.getAddPage);
var addBack = document.getElementById("addBack");
addBack.addEventListener("click", appObj.returnHome);
var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", appObj.getAddingDetails);
tab.addEventListener("click", appObj.onDeleteRow);
},{"./lib/book":"lib/book.ts","./lib/bookManager":"lib/bookManager.ts"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64035" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map