/**
 * Created by mujtabad on 6/14/2017.
 */

/**
 * Class to hold methods for initializing menus
 * @param name
 * @param tabmenu
 * @param jsonData
 * @constructor
 */
function FileManager(name, tabmenu, jsonData){

    var that = this;
    this.name = name;
    this.tabMenu = tabmenu;
    this.lastFolderStructure = {};
    this.lastOpenFile = "";
    this.lastOpenFolder = "";
    this.recents = {
        count:0,
        items: []
    };
    this.fs = null;

    that.constructor(jsonData);

    this.setNewRecent = function(pathval){
        if (this.recents.count < 5){
            this.recents.items.unshift(pathval);
            this.recents.count ++;
        }else{
            //replace the first, reset the count
            this.recents.items.unshift(pathval);
            this.recents.items.pop();
        }
    };

    this.setClickHandlers = function(){
        var that = this;
        $('.folder-nav li a').click(function(e){
            conf.saveToFile();
            if($(e.target).attr('back-dir')){

                var newpath = $(e.target).attr('file-id').split(/[\\/]+/).slice(0,-1).join('/');
                that.openFolder(newpath);

            }else{
                var item = that.lastFolderStructure[$(this).attr('file-id')];
                if(item.isDirectory){
                    //open the folder
                    that.openFolder(item.fullPath);
                }else{
                    //open the file itself
                    that.openFile(item);
                }
            }

        });
    };
}

/**
 * Opens the file an displays it in the editor area
 * @param item Object containing path to the file
 */
FileManager.prototype.openFile = function(item){
    if(item === undefined || item === {}){
        return;
    }
    var client = new XMLHttpRequest();
    this.lastOpenFile = item.fileName;
    client.open('GET', item.fullPath);
    client.onreadystatechange = function() {
        $('#folder-content-area').html(client.responseText);
    };
    client.send();
};

/**
 * Converts the class into JSON format for saving
 * @returns {{name: *, lastFolderStructure: *, recents: *, lastOpenFile: *, lastOpenFolder: *}}
 */
FileManager.prototype.jsonify = function(){
    return {
        name: this.name,
        lastFolderStructure: this.lastFolderStructure,
        recents: this.recents,
        lastOpenFile: this.lastOpenFile,
        lastOpenFolder: this.lastOpenFolder
    };
};

/**
 * constructor
 */
FileManager.prototype.constructor = function (jsonData){
    this.fs = require('fs');
    if(jsonData !== undefined){
        this.recents = jsonData.recents;
        this.name = jsonData.name;
        this.lastOpenFile = jsonData.lastOpenFile;
        this.lastOpenFolder = jsonData.lastOpenFolder;
        this.lastFolderStructure = jsonData.lastFolderStructure;

        if(this.lastOpenFolder !== ""){

            this.openFolder(this.lastOpenFolder, true);
            if(this.lastOpenFile !== ""){
                this.openFile(this.lastFolderStructure[this.lastOpenFile]);
            }
        }
    }
};

/**
 * Opens a folder for a given path
 * @param folderPath
 * @param init
 */
FileManager.prototype.openFolder = function (folderPath, init){

    if(folderPath === undefined || folderPath === {}){
        return;
    }

    // Dependencies
    var that = this;
    that.lastOpenFolder = folderPath;

    if(init !== true){
        that.setNewRecent(folderPath);
    }

    that.fs.readdir(folderPath,function(err,files) {
        if (err) throw err;

        var htmlTotal=" ";
        var html = "";
        var template = "";
        that.lastFolderStructure = {}; //clear the previously opened files

        files.forEach(function (file) {
            that.fs.stat(folderPath + "/" + file, function(err, statType){
                if(statType !== undefined){
                    if(statType.isDirectory()){
                        template = getTemplate("folder_item_template", "files.html");
                        html = Mustache.to_html(template,
                            {
                                fileId: file,
                                foldername: file,
                                foldercontents: ""
                            });
                        htmlTotal += html;
                        that.lastFolderStructure[file] = {
                            html: html,
                            fileType: 'type',
                            isDirectory: true,
                            fileName: file,
                            fullPath: folderPath + "/" + file
                        };
                    }else{
                        template = getTemplate("file_item_template", "files.html");
                        html = Mustache.to_html(template,
                            {
                                fileId: file,
                                fileName: file
                            });
                        htmlTotal += html;
                        that.lastFolderStructure[file] = {
                            html: html,
                            fileType: 'file',
                            isDirectory: false,
                            fileName:file,
                            fullPath: folderPath + "/" + file
                        };
                    }
                }

                //set the directory structure
                template = getTemplate("folder_item_template", "files.html");
                var html_folder_wrapper = Mustache.to_html(template,
                    {
                        fileId: folderPath,
                        foldername: folderPath,
                        foldercontents: htmlTotal,
                        dir: true,
                        open: 'opened'
                    });

                that.tabMenu.setHTML('<ul class="folder-nav">'+ html_folder_wrapper+'</ul>');
                that.setClickHandlers();
            });

        });

    });
};

/**
 * Display the name for this element
 */
FileManager.prototype.getName = function(){
    console.log('NAME: '+name);
};


