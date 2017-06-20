var templateCache = {};

function getTemplate(id, template_category){
    var template = "";

    if(id in templateCache) {
        return templateCache[id];

    } else {
        $.ajaxSetup({async:false});

        $('#template_container').load("views/templates/"+template_category + ' #' + id, function(response, status, xhr){
            template = $('#' + id).html();
            templateCache[id] = template;
        });

        return template;
    }
}

function openFolderDialog() {
    var inputField = document.querySelector('#folderSelector');
    inputField.addEventListener('change', function () {
        var folderPath = this.value;
        conf.e.fileManager.openFolder(folderPath);
    }, false);
    inputField.click();
}


