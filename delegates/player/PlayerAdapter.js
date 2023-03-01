import { NativeModules } from "react-native";
import VizbeeEventEmitter from "../../VizbeeEventEmitter";
import PlayerDelegate from "./PlayerDelegate";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager || {};

export default class PlayerAdapter {

    constructor() {
        this.playerDelegate = undefined;
        this.registePlayerAdapterListeners();
    }

    //------------------
    // Delegate
    //------------------

    setPlayerDelegate(playerDelegate) {

        if (playerDelegate instanceof PlayerDelegate) {

            this.playerDelegate = playerDelegate;
            this.setVideoStatusTimer();

            VizbeeNativeManager.setPlayerAdapter(this.getVideoInfo());
        }
    }

    removePlayerDelegate() {

        this.playerDelegate = undefined;
        // TODO: stop the timer

        VizbeeNativeManager.resetPlayerAdapter();
    }

    getPlayerDelegate() {
        return this.playerDelegate;
    }

    //------------------
    // Listeners
    //------------------

    registePlayerAdapterListeners() {
        global.console.log("PlayerAdapter registePlayerAdapterListeners");
        VizbeeEventEmitter.addListener(
            VizbeeEventEmitter.events.PLAYER_ADAPTER_ON_PLAYBACK_STATUS,
            this.onPlaybackStatus,
            this
        );
    }

    //------------------
    // Commands
    //------------------

    onPlaybackStatus(playbackInfo) {

        if (!this.playerDelegate) {
            return;
        }

        const {playbackState} = playbackInfo
        if (playbackState == 'play') {
            this.playerDelegate.onPlay();
        } else if (playbackState == 'pause') {
            this.playerDelegate.onPause();
        } else if (playbackState == 'seek') {
            const {seekPos} = playbackInfo
            this.playerDelegate.onSeek(seekPos);
        } else if (playbackState == 'stop') {
            const {stopReason} = playbackInfo
            this.playerDelegate.onStop(stopReason);
        }
    }

    //------------------
    // Video Info & Status
    //------------------

    getVideoInfo() {
        if (this.playerDelegate) {
            return this.playerDelegate.getVideoInfo();
        }
        return undefined;
    }

    getVideoStatus() {
        if (this.playerDelegate) {
            return this.playerDelegate.getVideoStatus();
        }
        return undefined;
    }

    //------------------
    // Helpers
    //------------------

    setVideoStatusTimer() {
        this.videoStatusTimer = setInterval(() => {
            const videoStatus = this.getVideoStatus();
            if (videoStatus) {
                VizbeeNativeManager.setVideoStatus(videoStatus);
            }
        }, 1000);
    }
}