export default class VideoInfo {

    constructor() {

        this._guid = "";
        this._isLive = false;
        this._startTime = 0;

        this._videoUrl = "";
        this._imgUrl = "";
        
        this._title = "";
        this._subtitle = "";
        this._desc = "";
        
        this._tracks = [];
        this._cuepoints = [];
        
        this._customStreamInfo = undefined;
        this._customMetadata = undefined;
    }

    toSyncVideoInfo() {

        let syncVideoInfo = {};
        syncVideoInfo.id = this._guid;
        syncVideoInfo.islive = this._isLive;
        syncVideoInfo.starttime = this._startTime;

        syncVideoInfo.videourl = this._videoUrl;
        syncVideoInfo.imgurl = this._imgUrl;

        syncVideoInfo.title = this._title;
        syncVideoInfo.subtitle = this._subtitle;
        syncVideoInfo.desc = this._desc;
        
        syncVideoInfo.tracks = this._tracks;
        syncVideoInfo.cuepoints = this._cuepoints;

        syncVideoInfo.customstreaminfo = this._customStreamInfo;
        syncVideoInfo.custommetadata = this._customMetadata;

        return syncVideoInfo;
    }

    fromSyncVideoInfo(syncVideoInfo) {

        if (!syncVideoInfo) {
            return;
        }

        this._guid = syncVideoInfo.id;
        this._isLive = syncVideoInfo.islive;
        this._startTime = syncVideoInfo.starttime;

        this._videoUrl = syncVideoInfo.videourl;
        this._imgUrl = syncVideoInfo.imgurl;

        this._title = syncVideoInfo.title;
        this._subtitle = syncVideoInfo.subtitle;
        this._desc = syncVideoInfo.desc;
        
        this._tracks = syncVideoInfo.tracks;
        this._cuepoints = syncVideoInfo.cuepoints;

        this._customStreamInfo = syncVideoInfo.customstreaminfo;
        this._customMetadata = syncVideoInfo.custommetadata;
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

    set videoUrl(videoUrl) {
        this._videoUrl = videoUrl;
    }
    get videoUrl() {
        return this._videoUrl;
    }

    set imgUrl(imgUrl) {
        this._imgUrl = imgUrl;
    }
    get imgUrl() {
        return this._imgUrl;
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

    set desc(desc) {
        this._desc = desc;
    }
    get desc() {
        return this._desc;
    }

    set startTime(startTime) {
        this._startTime = startTime;
    }
    get startTime() {
        return this._startTime;
    }

    set tracks(tracks) {
        this._tracks = tracks;
    }
    get tracks() {
        return this._tracks;
    }

    set cuepoints(cuepoints) {
        this._cuepoints = cuepoints;
    }
    get cuepoints() {
        return this._cuepoints;
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