var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var wait5Secs = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(5);
    }, 5000);
});
wait5Secs.then(function (data) { return console.log(data); }).catch(function (err) { return console.error(err); });
function httpGet(url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onload = function () {
            if (this.status === 200) {
                // Success
                resolve(this.response);
            }
            else {
                // Something went wrong (404 etc.)
                reject(new Error(this.statusText));
            }
        };
        request.onerror = function () {
            reject(new Error('XMLHttpRequest Error: ' + this.statusText));
        };
        request.open('GET', url);
        request.send();
    });
}
httpGet('https://api.github.com/search/repositories?q=angular').then(function (value) {
    console.log('Contents: ' + value);
}, function (reason) {
    console.error('Something went wrong', reason);
});
// parseJSON
function parseResponse(value) {
    try {
        return JSON.parse(value);
    }
    catch (_) {
        return value;
    }
}
httpGet('https://api.github.com/search/repositories?q=angular')
    .then(parseResponse)
    .then(function (data) { return console.log(data); })
    .catch(function (reason) {
    console.error('Something went wrong', reason);
});
// promise chỉ resolve hoặc reject duy nhất 1 lần
var promise = new Promise(function (resolve, reject) {
    resolve('done');
    reject(new Error('…')); // ignored
    setTimeout(function () { return resolve('…'); }); // ignored
});
promise.then(function (data) { return console.log(data); });
/**
 * Async/Await
 */
function f() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, 1];
        });
    });
}
function fp() {
    return Promise.resolve(1);
}
f().then(function (data) { return console.log('async fn', data); });
(function () { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fp()];
            case 1:
                data = _a.sent();
                console.log('async/await', data);
                return [2 /*return*/];
        }
    });
}); })();
function fns() {
    return __awaiter(this, void 0, void 0, function () {
        var promise, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = new Promise(function (resolve, reject) {
                        setTimeout(function () { return resolve("done!"); }, 1000);
                    });
                    return [4 /*yield*/, promise];
                case 1:
                    result = _a.sent();
                    console.log(result); // "done!"
                    return [2 /*return*/];
            }
        });
    });
}
fns();
// handle error
function getUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.github.com/search/users?q=" + username)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
getUser('bob')
    .then(function (res) { return console.log(res); })
    .catch(function (err) { return console.warn(err); });
// do not combine sync operations with async/await
(function () {
    var x = 0;
    function r5() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                x += 1;
                console.log(x);
                return [2 /*return*/, 5];
            });
        });
    }
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, r5()];
                case 1:
                    x = _a + _b.sent();
                    console.log(x);
                    return [2 /*return*/];
            }
        });
    }); })();
})();
// fixed version
(function () {
    var x = 0;
    function r5() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                x += 1;
                console.log(x);
                return [2 /*return*/, 5];
            });
        });
    }
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var y;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, r5()];
                case 1:
                    y = _a.sent();
                    x += y;
                    console.log(x);
                    return [2 /*return*/];
            }
        });
    }); })();
})();
// Too Sequential
function fetchAllBook() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        console.log('Waiting 2s...');
                        setTimeout(function () { return resolve(); }, 2000);
                    })];
                case 1:
                    _a.sent();
                    console.log('fetchAllBook');
                    return [2 /*return*/, [
                            {
                                id: 'book-id-1',
                                authorId: 'author-id-1'
                            }, {
                                id: 'book-id-2',
                                authorId: 'author-id-2'
                            }, {
                                id: 'book-id-3',
                                authorId: 'author-id-3'
                            }
                        ]];
            }
        });
    });
}
function fetchAuthorById(authorId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('fetchAuthorById');
            return [2 /*return*/, {
                    authorId: authorId,
                }];
        });
    });
}
function getBooksAndAuthor(authorId) {
    return __awaiter(this, void 0, void 0, function () {
        var books, author;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAllBook()];
                case 1:
                    books = _a.sent();
                    return [4 /*yield*/, fetchAuthorById(authorId)];
                case 2:
                    author = _a.sent();
                    return [2 /*return*/, {
                            author: author,
                            books: books.filter(function (book) { return book.authorId === authorId; }),
                        }];
            }
        });
    });
}
getBooksAndAuthor('author-id-2');
// Too Sequential fixed
function getBooksAndAuthorFixed(authorId) {
    return __awaiter(this, void 0, void 0, function () {
        var bookPromise, authorPromise, books, author;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookPromise = fetchAllBook();
                    authorPromise = fetchAuthorById(authorId);
                    return [4 /*yield*/, bookPromise];
                case 1:
                    books = _a.sent();
                    return [4 /*yield*/, authorPromise];
                case 2:
                    author = _a.sent();
                    return [2 /*return*/, {
                            author: author,
                            books: books.filter(function (book) { return book.authorId === authorId; }),
                        }];
            }
        });
    });
}
getBooksAndAuthorFixed('author-id-2');
