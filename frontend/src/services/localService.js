export const storageService = {
    save,
    load,

};


function save(KEY, value) {
    localStorage.setItem(KEY, JSON.stringify(value));
}

function load(KEY) {
    return JSON.parse(localStorage.getItem(KEY));
}


