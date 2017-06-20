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
    this.lastOpenPath = "";
    this.recents = {
        count:0,
        items: []
    };
    this.fs = null;

    that.constructor(jsonData);

    this.setNewRecent = function(pathval){
        if (this.recents.count < 5){
            this.recents.items.unshift(pathval);

        }else{
            //replace the first, reset the count
            this.recents.items.unshift(pathval);
            this.recents.items.pop();
        }
    };

    this.setClickHandlers = function(){
        var that = this;
        $('.folder-nav li a').click(function(){
            conf.saveToFile();

            var item = that.lastFolderStructure[$(this).attr('file-id')];
            if(item.isDirectory){
                //open the folder
                that.openFolder(item.fullPath);
            }else{
            //open the file itself
                var client = new XMLHttpRequest();
                client.open('GET', item.fullPath);
                client.onreadystatechange = function() {
                    $('#folder-content-area').html(client.responseText);
                };
                client.send();
            }
        });
    };
}


FileManager.prototype.jsonify = function(){
    return {
        name: this.name,
        lastFolderStructure: this.lastFolderStructure,
        recents: this.recents,
        lastOpenFile: this.lastOpenFile
    };
};

FileManager.prototype.constructor = function (jsonData){
    this.fs = require('fs');
    if(jsonData !== undefined){
        this.recents = jsonData.recents;
        this.name = jsonData.name;
        this.lastOpenFile = jsonData.lastOpenFile;
        this.lastOpenPath = jsonData.lastOpenPath;
        this.lastFolderStructure = jsonData.lastFolderStructure;

        if(this.lastOpenFile !== ""){
            this.openFolder(this.lastOpenPath);
        }
    }
};


FileManager.prototype.openFolder = function (folderPath){

    if(folderPath === undefined || folderPath === {}){
        return;
    }

    // Dependencies
    var that = this;
    that.lastOpenPath = folderPath;

    that.setNewRecent(folderPath);
    that.fs.readdir(folderPath,function(err,files) {
        if (err) throw err;

        var htmlTotal=" ";
        var html = "";
        var template = "";

        files.forEach(function (file) {
            that.fs.stat(folderPath + "/" + file, function(err, statType){
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
                that.tabMenu.setHTML('<ul class="folder-nav">'+ htmlTotal+'</ul>');
                that.setClickHandlers();
            });

        });

    });
};

FileManager.prototype.getName = function(){
    alert('NAME:'+name);
};


