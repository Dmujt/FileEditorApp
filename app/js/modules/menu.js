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

    that.constructor(gui, jsonData);
}

MenuBar.prototype.constructor = function (gui, jsonData){

    // get the window object
    var win = gui.Window.get();

    var menubar = new gui.Menu({
        type: 'menubar'
    });

    var file = new gui.Menu();
    var subMenu = new gui.Menu();
    file.append(new gui.MenuItem({
        label: 'New',
        click: function() {
            alert('Clicked New');
        }
    }));

    file.append(new gui.MenuItem({
        label: 'Open',
        click: function() {
            openFolderDialog();
        }
    }));

    subMenu.append(new gui.MenuItem({
        label: 'Project 1',
        click: function() {
            alert('Project 1 Clicked');
        }
    }));

    subMenu.append(new gui.MenuItem({
        label: 'Project 2',
        click: function() {
            alert('Project 2 Clicked');
        }
    }));

    file.append(new gui.MenuItem({ label: 'Open Recent', submenu: subMenu}));

    file.append(new gui.MenuItem({
        label: 'Save',
        click: function() {
            conf.saveToFile();
        }
    }));

    if(jsonData !== undefined){

    }

    menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));
    menubar.append(new gui.MenuItem({ label: 'Edit', submenu: new gui.Menu()}));
    menubar.append(new gui.MenuItem({ label: 'Help', submenu: new gui.Menu()}));

    win.menu = menubar;
};


MenuBar.prototype.getName = function(){
    alert('NAME:'+name);
};

