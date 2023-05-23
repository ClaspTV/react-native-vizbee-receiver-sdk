import { NativeModules } from "react-native";
import VizbeeEventEmitter from "../../VizbeeEventEmitter";
import VizbeePlayerDelegate from "./VizbeePlayerDelegate";
import VizbeeVideoInfo from "../../messages/VizbeeVideoInfo";
import VizbeeVideoStatus from "../../messages/VizbeeVideoStatus";

const VizbeeNativeManager = NativeModules.VizbeeNativeManager || {};

export default class PlayerAdapter {

    constructor() {
        this.currentVideoGuid = undefined;
        this.videoStatusPoller = undefined;
        this.playerDelegate = undefined;
        this.registePlayerAdapterListeners();
    }

    //------------------
    // Delegate
    //------------------

    setPlayerDelegate(playerDelegate) {
        if (playerDelegate instanceof VizbeePlayerDelegate) {
            if (this.getPlayerDelegate()) {
                this.removePlayerDelegate();
            }
            this.playerDelegate = playerDelegate;
            this.startPollingVideoStatus();
        }
    }

    removePlayerDelegate() {
        this.currentVideoGuid = undefined;
        this.playerDelegate = undefined;
        this.stopPollingVideoStatus();

        VizbeeNativeManager.resetPlayerAdapter();
    }

    getPlayerDelegate() {
        return this.playerDelegate;
    }

    //------------------
    // Listeners
    //------------------

    registePlayerAdapterListeners() {
        VizbeeEventEmitter.addListener(
            VizbeeEventEmitter.events.PLAYER_ADAPTER_COMMAND,
            this.onPlayerAdapterCommand,
            this
        );
    }

    //------------------
    // Commands
    //------------------

    onPlayerAdapterCommand(playbackInfo) {
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
        if (!this.playerDelegate) {
            return;
        }
        let videoInfo = this.playerDelegate.getVideoInfo();
        if (videoInfo instanceof VizbeeVideoInfo) {
            return videoInfo.toRNVideoInfo();
        }
        return;
    }

    getVideoStatus() {
        if (!this.playerDelegate) {
            return;
        }
        let videoStatus = this.playerDelegate.getVideoStatus();
        if (videoStatus instanceof VizbeeVideoStatus) {
            return videoStatus;
        }
        return;
    }

    //------------------
    // Helpers
    //------------------

    setNativePlayerAdapterWithVideoInfo() {
        let videoInfo = this.getVideoInfo();
        if (videoInfo && this.currentVideoGuid != videoInfo.guid) {
            this.currentVideoGuid = videoInfo.guid;
            VizbeeNativeManager.setPlayerAdapter(videoInfo);
        }
    }

    startPollingVideoStatus() {
        this.videoStatusPoller = setInterval(() => {
            this.setNativePlayerAdapterWithVideoInfo();
            const videoStatus = this.getVideoStatus();
            if (videoStatus) {
                VizbeeNativeManager.setVideoStatus(videoStatus.toJSON());
            }
        }, 1000);
    }

    stopPollingVideoStatus() {
        if (this.videoStatusPoller) {
            clearInterval(this.videoStatusPoller);
            this.videoStatusPoller = undefined;
        }
    }
}