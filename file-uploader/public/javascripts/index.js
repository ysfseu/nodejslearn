var dropzone = document.getElementById("dropzone");
var listing = document.getElementById("listing");
var n = 0,
    uploads = [];

var paths = [];

function scanFiles(item, container) {
    var elem = document.createElement("li");
    elem.innerHTML = item.name;
    container.appendChild(elem);

    if (item.isDirectory) {
        var directoryReader = item.createReader();
        var directoryContainer = document.createElement("ul");
        container.appendChild(directoryContainer);

        directoryReader.readEntries(function(entries) {
            for (var i in entries) {
                scanFiles(entries[i], directoryContainer);
            }
        });
    } else if (item.isFile) {
        item.file(function(file) {
            processFiles(files)
        });
    }
}

function processFiles(files) {
    $.ajax()
    xhr.open("POST", "http://localhost:3000/upload");
    xhr.send(formData);
}

function uploadFiles(items) {
    var fd = new FormData();
    for (var i in items) {
        fd.append("uploads[]", items[i].file, items[i].file.name);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/upload");
    xhr.send(fd);
}

dropzone.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

dropzone.addEventListener("drop", function(event) {
    var items = event.dataTransfer.items;

    event.preventDefault();
    listing.innerHTML = "";

    for (var i = 0; i < items.length; i++) {
        var item = items[i].webkitGetAsEntry();
        if (item) {
            scanFiles(item, listing);
        }
    }
}, false);
