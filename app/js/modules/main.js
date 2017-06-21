/**
 * Application Start
 * @author Dena Mujtaba
 */

$(document).ready(function(){
    gui = require('nw.gui');

    // get the window object
    win = gui.Window.get();

    conf = new ConfigElems();

    conf.openFromFile();

    // Listen to main window's close event
    win.on('close', function() {
        // Hide the window to give user the feeling of closing immediately
        this.hide();

        //Save the configurations
        conf.saveToFile();

        // After closing the new window, close the main window.
        this.close(true);
    });

});

//Listen for handler once the configs area setup/ loaded from files
$(document).on('confSetupComplete',function(){
    console.log('Configurations Loaded');
    conf.e.mainMenu.loadFromConfigs();
});
