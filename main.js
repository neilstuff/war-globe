'use strict';

const config = require('./config.json');

const {app, protocol, BrowserWindow} = require('electron');

const path = require('path');

var mainWindow = null;
app.allowRendererProcessReuse = true;

function createWindow () {

    mainWindow = new BrowserWindow({width: config.mode == 'debug' ? 1250: 800, height: 580, 
        resizable: false, autoHideMenuBar: true,  
        webPreferences: {
        }
    });

    if (config.mode == "debug") {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.setMenu(null);
    mainWindow.loadURL(`file:///${path.join(__dirname, 'index.html')}`);

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}
 
app.on('ready', createWindow)

app.on('window-all-closed',  () => {
    app.quit()
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }

});