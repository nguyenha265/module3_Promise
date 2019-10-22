function httpGet(url: string): Promise<any> {
    // @ts-ignore
    return new Promise(function(resolve, reject) {
        const request = new XMLHttpRequest();
        request.onload = function() {
            if (this.status === 200) {
                // Success
                resolve(this.response);
            } else {
                // Something went wrong (404 etc.)
                reject(new Error(this.statusText));
            }
        };
        request.onerror = function() {
            reject(new Error('XMLHttpRequest Error: ' + this.statusText));
        };
        request.open('GET', url);
        request.send();
    });
}
httpGet('https://api.github.com/search/repositories?q=angular').then(
    function(value) {
        console.log('Contents: ' + value);
    },
    function(reason) {
        console.error('Something went wrong', reason);
    }
);
function parseResponse(value: string) {
    try {
        return JSON.parse(value);
    } catch (_) {
        return value;
    }
}
httpGet('https://api.github.com/search/repositories?q=angular')

    .then(parseResponse)
    .then(data => console.log(data))
    .catch(function(reason) {
        console.error('Something went wrong', reason);
    });

async function fetchAllBook() {
    // @ts-ignore
    await new Promise(resolve => {
        let count = 2;
        while (count < 0) {
            count--;
            console.log(count);
        }
        setTimeout(() => resolve(), 2000);
    });
    console.log('fetchAllBook');
    return [
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
    ];
}

async function fetchAuthorById(authorId: string) {
    console.log('fetchAuthorById');
    return {
        authorId,
    };
}

async function getBooksAndAuthor(authorId: string) {
    const books = await fetchAllBook();
    const author = await fetchAuthorById(authorId);
    return {
        author,
        books: books.filter(book => book.authorId === authorId),
    };
}

getBooksAndAuthor('author-id-2');

// Too Sequential fixed
async function getBooksAndAuthorFixed(authorId: string) {
    const bookPromise = fetchAllBook();
    const authorPromise = fetchAuthorById(authorId);
    const books = await bookPromise;
    const author = await authorPromise;
    return {
        author,
        books: books.filter(book => book.authorId === authorId),
    };
}

getBooksAndAuthorFixed('author-id-2');











