$(document).ready(function(){
    gui = require('nw.gui');

    conf = new ConfigElems();

    conf.openFromFile();

    // Listen to main window's close event
    gui.Window.get().on('close', function() {
        // Hide the window to give user the feeling of closing immediately
        this.hide();

        conf.saveToFile();

        // After closing the new window, close the Zmain window.
        this.close(true);
    });

});
