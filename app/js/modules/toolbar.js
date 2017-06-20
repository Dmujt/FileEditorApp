/**
 * @author Dena Mujtaba
 */

/**
 * Class to handle the elements inside the top toolbar
 * @param name
 * @param divId
 * @param jsonData
 * @constructor
 */
function ToolBar(name, divId, jsonData){

    var that = this;
    this.name = name;
    this.container = $(divId);

    that.constructor(jsonData);
}

/**
 * constructor
 * @param jsonData
 */
ToolBar.prototype.constructor = function (jsonData) {
    var template = getTemplate("toolbar_template", "toolbar.html");
    var html = Mustache.to_html(template,
        {

        });
    this.container.append(html);

    if(jsonData !== undefined){

    }
};