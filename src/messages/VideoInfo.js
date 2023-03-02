export default class VideoInfo {

    constructor() {

        this._guid = "";
        this._isLive = false;
        this._startPosition = 0;

        this._videoURL = "";
        this._imageURL = "";
        
        this._title = "";
        this._subtitle = "";
        this._description = "";
        
        this._tracks = [];
        
        this._customStreamInfo = undefined;
        this._customMetadata = undefined;
    }

    toRNVideoInfo() {

        let rnVideoInfo = {};
        rnVideoInfo.guid = this._guid;
        rnVideoInfo.isLive = this._isLive;
        rnVideoInfo.startPosition = this._startPosition;

        rnVideoInfo.videoUrl = this._videoURL;
        rnVideoInfo.imgUrl = this._imageURL;

        rnVideoInfo.title = this._title;
        rnVideoInfo.subtitle = this._subtitle;
        rnVideoInfo.description = this._description;
        
        rnVideoInfo.tracks = this._tracks;

        rnVideoInfo.customStreamInfo = this._customStreamInfo;
        rnVideoInfo.customMetadata = this._customMetadata;

        return rnVideoInfo;
    }

    fromRNVideoInfo(rnVideoInfo) {

        if (!rnVideoInfo) {
            return;
        }

        this._guid = rnVideoInfo.guid;
        this._isLive = rnVideoInfo.isLive;
        this._startPosition = rnVideoInfo.startPosition;

        this._videoURL = rnVideoInfo.videoURL;
        this._imageURL = rnVideoInfo.imageURL;

        this._title = rnVideoInfo.title;
        this._subtitle = rnVideoInfo.subtitle;
        this._description = rnVideoInfo.description;
        
        this._tracks = rnVideoInfo.tracks;

        this._customStreamInfo = rnVideoInfo.customStreamInfo;
        this._customMetadata = rnVideoInfo.customMetadata;
    }

    set isLive(isLive) {
        this._isLive = isLive;
    }
    get isLive() {
        return this._isLive;
    }

    set guid(guid) {
        this._guid = guid;
    }
    get guid() {
        return this._guid;
    }

    set videoURL(videoURL) {
        this._videoURL = videoURL;
    }
    get videoURL() {
        return this._videoURL;
    }

    set imageURL(imageURL) {
        this._imageURL = imageURL;
    }
    get imageURL() {
        return this._imageURL;
    }

    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }

    set subtitle(subtitle) {
        this._subtitle = subtitle;
    }
    get subtitle() {
        return this._subtitle;
    }

    set description(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }

    set startPosition(startPosition) {
        this._startPosition = startPosition;
    }
    get startPosition() {
        return this._startPosition;
    }

    set tracks(tracks) {
        this._tracks = tracks;
    }
    get tracks() {
        return this._tracks;
    }

    // custom data
    set customStreamInfo(customStreamInfo) {
        this._customStreamInfo = customStreamInfo;
    }
    get customStreamInfo() {
        return this._customStreamInfo;
    }

    set customMetadata(customMetadata) {
        this._customMetadata = customMetadata;
    }
    get customMetadata() {
        return this._customMetadata;
    }
}