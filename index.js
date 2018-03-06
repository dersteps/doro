'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require('electron').ipcMain;
const remote = require('electron').remote;
const url = require('url');
const path = require('path');

/** 
 * Main Window reference for use in several event handlers.
 * Is created in the createWindow() function.
*/
let mainWindow;

const WIN_WIDTH = 320;
const WIN_HEIGHT = 230;

function getWindowX() {
    let bounds = electron.screen.getPrimaryDisplay().bounds;
    return Math.ceil(bounds.x + ((bounds.width - WIN_WIDTH) / 2));
}

function getWindowY() {
    let bounds = electron.screen.getPrimaryDisplay().bounds;
    return Math.ceil(bounds.y + ((bounds.height - WIN_HEIGHT) / 2));
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 320, 
        height: 230,
        center: true,
        x: getWindowX(),
        y: getWindowY(),
        autoHideMenuBar: true,
        darkTheme: true,
        backgroundColor: "#c00000"
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file:',
        slashes:true
    }));

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    //mainWindow.webContents.openDevTools();
}

app.on('ready', function() {
    createWindow();
});

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if(mainWindow === null) { createWindow(); }
});