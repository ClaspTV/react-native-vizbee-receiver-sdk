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

    getVideoStatus() {
        return this.videoStatusGetter();
    }
}
