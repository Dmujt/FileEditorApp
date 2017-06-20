/**
 * Application Start
 * @author Dena Mujtaba
 */

$(document).ready(function(){
    gui = require('nw.gui');

    conf = new ConfigElems();

    conf.openFromFile();

    // Listen to main window's close event
    gui.Window.get().on('close', function() {
        // Hide the window to give user the feeling of closing immediately
        this.hide();

        //Save the configurations
        conf.saveToFile();

        // After closing the new window, close the main window.
        this.close(true);
    });

});
