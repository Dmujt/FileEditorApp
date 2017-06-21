/**
 * Various functions used throughout application
 * @author Dena Mujtaba
 */

//contains the previously used templates
var templateCache = {};
/**
 * Loads a template from the given folder/category with id
 * @param id
 * @param template_category
 * @returns {*}
 */
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

/**
 * Opens the folder selection dialog, returns a path for that folder
 */
function openFolderDialog() {
    var inputField = document.querySelector('#folderSelector');
    inputField.addEventListener('change', function () {
        var folderPath = this.value;
        conf.e.fileManager.openFolder(folderPath);
    }, false);
    inputField.click();
}

/**
 * Displays the notification modal and fills with the given text
 * @param headerText
 * @param bodyContent
 */
function displayNotification(headerText, bodyContent){
    $('#notificationModal .modal-title').text(headerText);
    $('#notificationModal .modal-body-content').text(bodyContent);

    $('#notificationModal').modal('show');
}


