var gui="";

var conf = null;

function ConfigElems(){

    var that = this;

    this.fileName = 'configs.json';

    this.fs = require('fs');
    //Configurations saved inside the file
    this.e = {};

}

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

    });
};
