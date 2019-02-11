const e = require('electron')
const path = require('path');
const os = require("os");
const { spawn } = require('child_process');
const app = e.app;
const {ipcMain} = require('electron')
const config = require("./config")

 

function createWindow() {
	console.log("Electron ready!")
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
    //window.openDevTools();
    window.setIgnoreMouseEvents(true);
    console.log("Window ready!")
    ipcMain.on('loaded', (event, arg) => {
		console.log("Window loaded!")
        const child = spawn('./volumeStreamer.exe');
        if (config.removeOSD) {
            const osdslaughterer = spawn('./volstep.exe');
        }
		console.log("Subprocesses spawned")
        
        window.webContents.send("config",config)
		console.log("Config sent")
        child.stdout.on('data', (data) => {
			console.log("Data spawned")
            window.webContents.send("alert",data);
			window.setAlwaysOnTop(true);
        });

    })
        
}
app.on('ready', createWindow)
