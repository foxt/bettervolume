const e = require('electron')
const path = require('path');
const os = require("os");
const { spawn } = require('child_process');
const app = e.app;
const {ipcMain} = require('electron')
const config = require("./config")
const SpotifyWebHelper = require('spotify-web-helper');
 

function createWindow() {
    const window = new e.BrowserWindow({
        x: config.padding,
        y: 0,
        width: config.screenWidth - (config.padding * 2),
        height: 40,
        frame: false,
        skipTaskbar: true,
        movable: false,
        resizable: false,
        maximizable: false,
        minimizable: false,
        transparent: true,
        alwaysOnTop: true,
        experimentalFeatures: true
    });
    window.loadURL('file://' +  __dirname +'/rendered.html')
    if (os.platform() !== "win32") {
        e.dialog.showMessageBox({message: "This application will now exit, since it can only be ran on Windows."});
        process.kill(process.pid)
    }
    // if (os.release().split(".")[0] !== "10") {
    //     e.dialog.showMessageBox({message: "I'm afraid that this program is exclusively for Windows 10."});
    //     process.kill(process.pid)
    // }
    // var electronVibrancy = require('electron-vibrancy');
    // electronVibrancy.SetVibrancy(true,window.getNativeWindowHandle());
    // window.openDevTools();
    window.setIgnoreMouseEvents(true);
    
    ipcMain.on('loaded', (event, arg) => {
        const child = spawn('./volumeStreamer.exe');
        if (config.removeOSD) {
            const osdslaughterer = spawn('./volstep.exe');
        }
        
        window.webContents.send("config",config)
        child.stdout.on('data', (data) => {
            window.webContents.send("alert",data);
        });


       

        const helper = SpotifyWebHelper();
        helper.player.on('error', err => {});
        helper.player.on('ready', () => {
            helper.player.on('play', () => { 
                window.webContents.send("des",helper.status.track.track_resource.name);
            });
            helper.player.on('track-will-change', track => {
                setTimeout(function (){
                    window.webContents.send("pa",helper.status.track);
                }, 15)

               
            });
            helper.player.on('pause', () => { 
                window.webContents.send("cito","");
            });
        })
    })
        
}
app.on('ready', createWindow)
