export default class VizbeePlayerState {

    static get IDLE() { return "idle" };
    static get PREPARING() { return "preparing" };
    static get LOADING() { return "loading" };
    static get STARTED() { return "started" };
    static get PLAYING() { return "playing" };
    static get PAUSED() { return "paused" };
    static get BUFFERING() { return "buffering" };
    static get INTERRUPTED() { return "interrupted" };
    static get FINISHED() { return "finished" };
    static get FAILED() { return "failed" };
};