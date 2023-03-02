export default class VizbeePlayerDelegate {

    constructor() {
        this.videoInfoGetter = () => {};
        this.videoStatusGetter = () => {};
    }

    onPlay() {}

    onPause() {}

    onSeek(seekPos) {}

    onStop(stopReason) {}

    getVideoInfo() {
        return this.videoInfoGetter();
    }

    setVideoInfoGetter(videoInfoGetter) {
        if (typeof videoInfoGetter !== "function") {
            return;
        }
        this.videoInfoGetter = videoInfoGetter;
    }

    getVideoInfoGetter() {
        return this.videoInfoGetter;
    }

    getVideoStatus() {
        return this.videoStatusGetter();
    }

    setVideoStatusGetter(videoStatusGetter) {
        if (typeof videoStatusGetter !== "function") {
            return;
        }
        this.videoStatusGetter = videoStatusGetter;
    }

    getVideoStatusGetter() {
        return this.videoStatusGetter;
    }
}
