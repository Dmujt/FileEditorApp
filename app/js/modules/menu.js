/**
 * Created by mujtabad on 6/14/2017.
 */

/**
 * Class to hold methods for initializing menus
 * @param name
 * @param jsonData
 * @constructor
 */
function MenuBar(name, jsonData){

    var that = this;
    this.name = name;
    this.menubar = null;
    this.menus = {};

    that.constructor(gui, jsonData);
}

/**
 * constructor
 * @param gui
 * @param jsonData
 */
MenuBar.prototype.constructor = function (gui, jsonData){

    var that = this;

    that.menubar = new gui.Menu({
        type: 'menubar'
    });

    that.menus.file =  new gui.Menu();
    that.menus.file.append(new gui.MenuItem({
        label: 'New',
        click: function() {
            alert('Clicked New');
        }
    }));

    that.menus.file.append(new gui.MenuItem({
        label: 'Open',
        click: function() {
            openFolderDialog();
        }
    }));

    if(jsonData !== undefined){

    }


    that.menus.file.append(new gui.MenuItem({
        label: 'Save',
        click: function() {
            conf.saveToFile();
        }
    }));

    that.menubar.append(new gui.MenuItem({ label: 'File', submenu: that.menus.file}));
    that.menubar.append(new gui.MenuItem({ label: 'Edit', submenu: new gui.Menu()}));
    that.menubar.append(new gui.MenuItem({ label: 'Help', submenu: new gui.Menu()}));

    //Actual menu is not set until after the configurations file is loaded
};

/**
 * Load the data from the configuration object to modify this object
 */
MenuBar.prototype.loadFromConfigs = function(){

    if(conf.e.fileManager !== undefined){
        if( conf.e.fileManager.recents.count > 0 ){
            var subMenu = new gui.Menu();
            $.each(conf.e.fileManager.recents.items, function(index,path) {
                subMenu.append(new gui.MenuItem({
                    label: path,
                    click: function() {
                        conf.e.fileManager.openFolder(path);
                    }
                }));
            });
            this.menus.file.append(new gui.MenuItem({ label: 'Open Recent', submenu: subMenu}));

            //Set the menu to display information

        }
    }
    this.resetMenu();

};

/**
 * Reset the MenuItems and display the menu
 */
MenuBar.prototype.resetMenu = function(){
    win.menu = this.menubar;

};


/**
 * Display the name for this element
 */
MenuBar.prototype.getName = function(){
    console.log('NAME: '+name);
};

