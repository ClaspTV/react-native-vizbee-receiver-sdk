export default class PlayerDelegate {

    constructor(playerDelegate) {

        this.playerDelegate = playerDelegate;

        this.registePlayerDelegateListeners();
    }

    //------------------
    // Listeners
    //------------------

    registePlayerDelegateListeners() {

        // play
        VizbeeManager.addListener(
            "ON_PLAYBACK_STATUS",
            this.onPlaybackStatus,
            this
        );
    }
   
    onPlaybackStatus(playbackInfo) {

        const {playbackState} = playbackInfo

        if (playbackState == 'play') {
            this.playerDelegate.play();
        } else if (playbackState == 'pause') {
            this.playerDelegate.pause();
        } else if (playbackState == 'seek') {
            const {seekPos} = playbackInfo
            this.playerDelegate.seek(seekPos);
        }
        
    }
}