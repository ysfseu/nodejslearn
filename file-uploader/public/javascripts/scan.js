var n = 0,
    uploads = [],
    entryResult = [];
window.onload = function() {
    var dropzone = document.getElementById("dropzone");
    var listing = document.getElementById("listing");
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
                $.when(scanFiles(item)).done(function() {
                    entryResult = arguments;
                })
            }
        }
    }, false);
}

function createFormData(entryResult) {
    /*
    var deferred = new $.Deferred();
    var promises = [];
    for (var i = entryResult.length - 1; i >= 0; i--) {
        promises.push(createPromise(entryResult[i]));
    }
    */
    let dtd = $.Deferred();
    dtd.done(function(){
        processFiles(uploads); 
    })
}

/*function createPromise(entry) {
    return new Promise(function(resolve, reject) {
        entry.file(function(file) {
            resolve(file);
        });
    });
}*/

function callBack(file, dtd) {
    uploads.push(file);
    let currentEntry = entryResult.shift();
    if (!currentEntry) {
        dtd.resolve();
        return;
    }
    currentEntry.file(callBack);
}

function scanFiles(item) {
    var deferred = new $.Deferred();
    var result = [];
    if (item.isDirectory) {
        var directoryReader = item.createReader();
        directoryReader.readEntries(function(entries) {
            var promises = [];
            for (var i in entries) {
                if (entries[i].isDirectory) {
                    promises.push(scanFiles(entries[i]));
                } else {
                    result.push(entries[i]);
                }
            }
            if (promises.length === 0) {
                deferred.resolve(result);
            } else {
                $.when.apply($, promises).done(function() {
                    for (var i = 0; i < arguments.length; i++) {
                        result = result.concat(arguments[i]);
                    }
                    deferred.resolve(result);
                });
            }
        }, function(error) {
            console.log("Failed while reading dir:", error);
            deferred.reject();
        });
    }
    return deferred.promise();
}

function processFiles(files) {
    var formData = new FormData();

    for (file of files) {
        formData.append("file[]", file);
        formData.append('path[]', file.path);
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
    };

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
