/**
 * Created by mujtabad on 6/14/2017.
 */

/**
 * Class to hold methods for initializing menus
 * @param name
 * @param divId
 * @param jsonData
 * @constructor
 */
function TabMenu(name, divId, jsonData){

    var that = this;
    this.container = $(divId);
    this.name = name;

    that.constructor(jsonData);
}

TabMenu.prototype.constructor = function (jsonData){
    if(jsonData !== undefined){

    }
};


TabMenu.prototype.getName = function(){
    alert('NAME: '+name);
};

TabMenu.prototype.setHTML = function(content){
    this.container.html(content);
};


