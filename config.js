module.exports = {
    removeOSD: true, // Should we remove the default Windows volume OSD (bool, default: true)
    timeToLive: 5000, //Time for OSD to remain on screen after latest volume ajustment (ms, default: 5000)
    highVolumeThreshold: 50, // At which volume the icon changes to a high volume icon. Set to 0 for always high volume icon and 100 for always low volume icon (percent, default: 50)
    screenWidth: 1920, // How big is your screen's width (px, default: 1920)
    padding: 40, // How much padding on either side of the bar (px, default: 40)
    showLoudness: true, // Show the loudness bar nested within the volume bar (bool, default: true)
    animations: {
        slideUpDownColour: {
            time: 0.5, //Time for the sliding up/down/mute colour change animation to take (sec, default: 0.25)
            enabled: true, // Animate the entrance/exit/mute colour change (bool, default: true)
        },
        volumeChange: {
            time: 0.1, //Time for the volume change animation to take (sec, default: 0.25)
            enabled: true, // Animate the volume change (bool, default: true)
        }
    }
}