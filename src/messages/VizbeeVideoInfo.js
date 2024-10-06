/**
 * @class VizbeeVideoInfo
 * @description Represents detailed information about a video in the Vizbee SDK.
 * This class provides methods to set and get various properties of a video.
 */
export default class VizbeeVideoInfo {

    /**
     * @constructor
     * @description Initializes a new instance of VizbeeVideoInfo with default values.
     */
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

    /**
     * @method toRNVideoInfo
     * @description Converts the VizbeeVideoInfo object to a plain JavaScript object for React Native.
     * @returns {Object} A plain JavaScript object representing the video information.
     */
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

    /**
     * @method fromRNVideoInfo
     * @description Populates the VizbeeVideoInfo object from a plain JavaScript object.
     * @param {Object} rnVideoInfo - A plain JavaScript object containing video information.
     */
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

    /**
     * @property {boolean} isLive
     * @description Indicates whether the video is a live stream.
     */
    set isLive(isLive) {
        this._isLive = isLive;
    }
    get isLive() {
        return this._isLive;
    }

    /**
     * @property {string} guid
     * @description Unique identifier for the video.
     */
    set guid(guid) {
        this._guid = guid;
    }
    get guid() {
        return this._guid;
    }

    /**
     * @property {string} videoURL
     * @description URL of the video content.
     */
    set videoURL(videoURL) {
        this._videoURL = videoURL;
    }
    get videoURL() {
        return this._videoURL;
    }

    /**
     * @property {string} imageURL
     * @description URL of the video thumbnail or poster image.
     */
    set imageURL(imageURL) {
        this._imageURL = imageURL;
    }
    get imageURL() {
        return this._imageURL;
    }

    /**
     * @property {string} title
     * @description Title of the video.
     */
    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }

    /**
     * @property {string} subtitle
     * @description Subtitle or secondary title of the video.
     */
    set subtitle(subtitle) {
        this._subtitle = subtitle;
    }
    get subtitle() {
        return this._subtitle;
    }

    /**
     * @property {string} description
     * @description Detailed description of the video.
     */
    set description(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }

    /**
     * @property {number} startPosition
     * @description Starting position of the video in seconds.
     */
    set startPosition(startPosition) {
        this._startPosition = startPosition;
    }
    get startPosition() {
        return this._startPosition;
    }

    /**
     * @property {Array} tracks
     * @description Array of track information (e.g., subtitles, audio tracks).
     */
    set tracks(tracks) {
        this._tracks = tracks;
    }
    get tracks() {
        return this._tracks;
    }

    /**
     * @property {Object} customStreamInfo
     * @description Custom streaming information for the video.
     */
    set customStreamInfo(customStreamInfo) {
        this._customStreamInfo = customStreamInfo;
    }
    get customStreamInfo() {
        return this._customStreamInfo;
    }

    /**
     * @property {Object} customMetadata
     * @description Custom metadata associated with the video.
     */
    set customMetadata(customMetadata) {
        this._customMetadata = customMetadata;
    }
    get customMetadata() {
        return this._customMetadata;
    }
}