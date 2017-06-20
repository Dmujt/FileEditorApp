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

/**
 * constructor
 * @param gui
 * @param jsonData
 */
MenuBar.prototype.constructor = function (gui, jsonData){

    // get the window object
    var win = gui.Window.get();

    var menubar = new gui.Menu({
        type: 'menubar'
    });

    var file = new gui.Menu();
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

    if(jsonData !== undefined){

    }

    if(conf.e.fileManager !== undefined && conf.e.fileManager.recents.count > 0 ){
        var subMenu = new gui.Menu();
        $.each(conf.e.fileManager.recents.items, function(index,path) {
            subMenu.append(new gui.MenuItem({
                label: path,
                click: function() {
                    conf.e.fileManager.openFolder(path);
                }
            }));
        });
        file.append(new gui.MenuItem({ label: 'Open Recent', submenu: subMenu}));
    }

    file.append(new gui.MenuItem({
        label: 'Save',
        click: function() {
            conf.saveToFile();
        }
    }));

    menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));
    menubar.append(new gui.MenuItem({ label: 'Edit', submenu: new gui.Menu()}));
    menubar.append(new gui.MenuItem({ label: 'Help', submenu: new gui.Menu()}));

    win.menu = menubar;
};

/**
 * Display the name for this element
 */
MenuBar.prototype.getName = function(){
    console.log('NAME: '+name);
};

