/**
 * Configuration and storage elements for the app
 * @author Dena Mujtaba
 */

//the nw.js library elements
var gui="";

//the configuration class containing multiple other classes
var conf = null;

//the main window for the application
var win = null;

/**
 * Handles all elements for the application and saving/loading them
 * @constructor
 */
function ConfigElems(){

    this.fileName = 'configs.json';

    this.fs = require('fs');
    //Configurations saved inside the file
    this.e = {};

}

/**
 * constructor
 */
ConfigElems.prototype.constructor = function (){
    this.e = {
        mainMenu : {},
        tray : {},
        toolbar : {},
        tabmenues: {
          fileManagerMenu: {}
        },
        fileManager : {}
    };

};

/**
 * Saves the configuration to a file in JSON format
 */
ConfigElems.prototype.saveToFile = function(){
    var that = this;
    that.fs.writeFile(that.fileName, JSON.stringify(
        {
            fileManager: that.e.fileManager.jsonify(),
            tray: {},
            tabmenues: {
                fileManagerMenu: {}
            },
            toolbar: {},
            mainMenu: {}
        }
    ) , function(err) { if(err) return console.log(err); });
};

/**
 * Opens the configuration file if there is one. Loaded on app start
 */
ConfigElems.prototype.openFromFile = function(){

    var that = this;

    var jqxhr = $.getJSON(that.fileName, function(json) {

        var tabmenu = new TabMenu('name', '#folder-options-menu', json.toolbar);

        that.e = {
            mainMenu : new MenuBar('mainmenu', json.mainMenu),
            tray : new TrayItem('name', json.tray),
            toolbar : new ToolBar('name', '#toolbar', json.toolbar),
            tabmenues: {
                fileManagerMenu: tabmenu
            },
            fileManager : new FileManager('main file manager', tabmenu, json.fileManager)
        };
        $(document).trigger('confSetupComplete');

    });

    jqxhr.fail(function() {
        console.log( "No Config File Found" );

        var tabmenu = new TabMenu('name', '#folder-options-menu');

        that.e = {
            mainMenu : new MenuBar('mainmenu'),
            tray : new TrayItem('name'),
            toolbar : new ToolBar('name', '#toolbar'),
            tabmenues: {
                fileManagerMenu: tabmenu
            },
            fileManager : new FileManager('main file manager', tabmenu)
        };
        $(document).trigger('confSetupComplete');

    });

};
