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
    this.contentContainer = $(divId + ' .tab-area');
    this.navbarContainer = $(divId + ' .tab-menu');
    this.name = name;

    that.constructor(jsonData);
}

/**
 * constructor
 * @param jsonData
 */
TabMenu.prototype.constructor = function (jsonData){
    if(jsonData !== undefined){

    }
    this.setClickHandlers();
};

TabMenu.prototype.setClickHandlers = function(){
    var that = this;
    that.navbarContainer.find('a.collapse-tabmenu').click(function(e){
        $(e.target).parent().parent().parent().toggleClass('min');
    });
};

/**
 * Display the name for this element
 */
TabMenu.prototype.getName = function(){
    console.log('NAME: '+name);
};

/**
 * Sets the HTML for the tab menu
 * @param content
 */
TabMenu.prototype.setHTML = function(content){
    this.contentContainer.html(content);
};


