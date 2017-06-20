function TrayItem(name, jsonData){

    var that = this;
    this.name = name;

    this.logoPath = 'img/logo.png';

    that.constructor(jsonData);
}

TrayItem.prototype.constructor = function (jsonData) {
// Create a tray icon
    //get node webkit GUI
    var tray = new gui.Tray({
        icon : this.logoPath,
        title: 'tempapp'
    });

    // Give it a menu
    var menu = new gui.Menu();
    menu.append(new gui.MenuItem({
        type: 'checkbox',
        label: 'Are you sure?'
    }));

    if(jsonData !== undefined){

    }

    tray.menu = menu;

};