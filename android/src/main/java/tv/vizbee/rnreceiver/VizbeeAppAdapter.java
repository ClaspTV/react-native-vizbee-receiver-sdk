package tv.vizbee.rnreceiver;

import tv.vizbee.screen.api.adapter.VizbeeAppAdapter;
import tv.vizbee.screen.api.messages.CustomEvent;
import tv.vizbee.screen.api.messages.VideoInfo;

/**
 * RNVizbeeAppAdapter to handle all "app" level commands
 * sent by your mobile app.
 *
 * App level commands include:
 * [1] start or deeplink to a new video
 * [2] handle app events
 */

public class RNVizbeeAppAdapter extends VizbeeAppAdapter {

    private static final String LOG_TAG = RNVizbeeAppAdapter.class.getName();

    private ReactApplicationContext reactContext;

    public RNVizbeeAppAdapter(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void onStart(VideoInfo video, int position) {
        super.onStart(video, position);

        WritableMap videoStatusMap = Arguments.createMap();
        videoStatusMap.putString("guid", videoStatus.getGuid());
        videoStatusMap.putString("title", videoStatus.getTitle());

        this.reactContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("ON_STRT_VIDEO", );
        
    }

    public void onEvent(CustomEvent customEvent) {
        super.onEvent(customEvent);
        
        
    }

    private WritableMap getVideoInfoMap(VideoInfo videoInfo) {

        WritableMap videoStatusMap = Arguments.createMap();

        // metadata
        videoStatusMap.putString("guid", videoInfo.getGUID());
        videoStatusMap.putString("luid", videoInfo.getLUID());
        videoStatusMap.putString("title", videoInfo.getTitle());
        videoStatusMap.putString("subtitle", videoInfo.getSubtitle());
        videoStatusMap.putString("description", videoInfo.getDescription());
        videoStatusMap.putString("imageURL", videoInfo.getImageUrl());
        videoStatusMap.putBoolean("isLive", videoInfo.isLive());
        videoStatusMap.putMap("customMetadata", videoInfo.getCustomMetadata());

        // stream info
        videoStatusMap.putString("videoURL", videoInfo.getVideoURL());
        videoStatusMap.putString("protocolType", videoInfo.getProtocolType());
        videoStatusMap.putMap("customStreamInfo", videoInfo.getCustomStreamInfo());

        // drm info
        videoStatusMap.putString("drmType", videoInfo.getDrmType());
        videoStatusMap.putString("drmLicenseURL", videoInfo.getDrmLicenseURL());
        videoStatusMap.putString("drmCustomData", videoInfo.getDrmCustomData());

        // track info
        videoStatusMap.putMap("trackStatus", getTrackStatusMap(videoInfo.getTracks()));

        return videoStatusMap;
    }

    //----------------
    // Track Status Helpers
    //----------------

    // TODO: update track info from tracks
    private WritableMap getTrackStatusMap(tracks) {

        if (null == videoTrackStatus) {
            return null;
        }

        WritableMap trackInfoMap = Arguments.createMap();

        // available tracks info
        WritableArray availableTracksInfo = Arguments.createArray();
        for (VideoTrackInfo trackInfo : videoTrackStatus.getAvailableTracks()) {
            availableTracksInfo.pushMap(getTrackInfoMap(trackInfo));
        }
        trackInfoMap.putArray("availableTracks", availableTracksInfo);

        // current track info
        WritableMap videoTrackInfoMap = getTrackInfoMap(videoTrackStatus.getCurrentTrack());
        trackInfoMap.putMap("currentTrack", videoTrackInfoMap);

        return trackInfoMap;
    }

    private WritableMap getTrackInfoMap(VideoTrackInfo trackInfo) {

        if (null == trackInfo) {
            return null;
        }

        WritableMap trackInfoMap = Arguments.createMap();
        trackInfoMap.putDouble("identifier", trackInfo.getId());
        trackInfoMap.putString("contentIdentifier", trackInfo.getContentId());
        trackInfoMap.putString("contentType", trackInfo.getContentType());
        trackInfoMap.putString("name", trackInfo.getName());
        trackInfoMap.putString("languageCode", trackInfo.getLanguage());
        return trackInfoMap;
    }
}