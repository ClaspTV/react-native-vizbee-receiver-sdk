package tv.vizbee.rnreceiver;

import static tv.vizbee.rnreceiver.RNJsonConverter.convertJsonToMap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

import tv.vizbee.screen.api.adapter.VizbeeAppAdapter;
import tv.vizbee.screen.api.messages.CustomEvent;
import tv.vizbee.screen.api.messages.VideoInfo;
import tv.vizbee.screen.api.messages.VideoTrackInfo;
import tv.vizbee.utils.Logger;

/**
 * RNVizbeeAppAdapter to handle all "app" level commands
 * sent by your mobile app.
 *
 * App level commands include:
 * [1] start or deeplink to a new video
 * [2] handle app events
 */

public class RNVizbeeAppAdapter extends VizbeeAppAdapter {

    private static final String LOG_TAG = RNVizbeeAppAdapter.class.getSimpleName();

    private final ReactApplicationContext reactContext;

    public RNVizbeeAppAdapter(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void onStart(VideoInfo video, long position) {
        super.onStart(video, position);

        Logger.i(LOG_TAG, "onStart");

        try {
            RNVizbeeEventEmitter.emitEvent(
                    RNVizbeeEventEmitter.Event.APP_ADAPTER_ON_START_VIDEO,
                    getVideoInfoMap(video, position),
                    RNVizbeeNativeManager.reactApplicationContext);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void onEvent(CustomEvent customEvent) {
        super.onEvent(customEvent);

        Logger.i(LOG_TAG, "onEvent");

        // sanity to make sure that customEvent is not null to avoid app crashes
        if (null == customEvent) {
            Logger.w(LOG_TAG, "customEvent is null");
            return;
        }

        if (customEvent.getEventType().equalsIgnoreCase("tv.vizbee.homesign.signin")) {

            JSONObject eventData = customEvent.getEventData();
            if (null != eventData) {
                JSONObject authInfo = eventData.optJSONObject("authInfo");
                if (null != authInfo) {
                    try {
                        RNVizbeeEventEmitter.emitEvent(
                                RNVizbeeEventEmitter.Event.APP_ADAPTER_ON_SIGN_IN,
                                convertJsonToMap(authInfo),
                                RNVizbeeNativeManager.reactApplicationContext);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            } else {
                Logger.w(LOG_TAG, "eventData is null");
            }
        }
    }

    private WritableMap getVideoInfoMap(VideoInfo videoInfo, long position) throws JSONException {

        WritableMap videoStatusMap = Arguments.createMap();

        // metadata
        videoStatusMap.putString("guid", videoInfo.getGUID());
        videoStatusMap.putString("luid", videoInfo.getLUID());
        videoStatusMap.putString("title", videoInfo.getTitle());
        videoStatusMap.putString("subtitle", videoInfo.getSubtitle());
        videoStatusMap.putString("description", videoInfo.getDescription());
        videoStatusMap.putString("imageURL", videoInfo.getImageURL());
        videoStatusMap.putBoolean("isLive", videoInfo.isLive());
        videoStatusMap.putMap("customMetadata", convertJsonToMap(videoInfo.getCustomMetadata()));

        // stream info
        videoStatusMap.putString("videoURL", videoInfo.getVideoURL());
        videoStatusMap.putString("protocolType", videoInfo.getProtocolType());
        videoStatusMap.putMap("customStreamInfo", convertJsonToMap(videoInfo.getCustomStreamInfo()));

        // drm info
        videoStatusMap.putString("drmType", videoInfo.getDrmType());
        videoStatusMap.putString("drmLicenseURL", videoInfo.getDrmLicenseURL());
        videoStatusMap.putString("drmCustomData", videoInfo.getDrmCustomData());

        // track info
        videoStatusMap.putMap("tracks", getTracksMap(videoInfo.getTracks()));

        // start position
        videoStatusMap.putDouble("startPosition", position);

        return videoStatusMap;
    }

    //----------------
    // TrackInfo Helpers
    //----------------

    private WritableMap getTracksMap(List<VideoTrackInfo> tracks) throws JSONException {

        if (null == tracks) {
            return null;
        }

        WritableMap trackInfoMap = Arguments.createMap();

        // available tracks info
        WritableArray availableTracksInfo = Arguments.createArray();
        for (VideoTrackInfo trackInfo : tracks) {
            availableTracksInfo.pushMap(getTrackInfoMap(trackInfo));
        }
        trackInfoMap.putArray("availableTracks", availableTracksInfo);

        return trackInfoMap;
    }

    private WritableMap getTrackInfoMap(VideoTrackInfo trackInfo) throws JSONException {

        if (null == trackInfo) {
            return null;
        }

        WritableMap trackInfoMap = Arguments.createMap();
        trackInfoMap.putDouble("identifier", trackInfo.getId());
        trackInfoMap.putString("contentIdentifier", trackInfo.getContentId());
        trackInfoMap.putString("contentType", trackInfo.getContentType());
        trackInfoMap.putString("name", trackInfo.getName());
        trackInfoMap.putString("languageCode", trackInfo.getLanguage());
        trackInfoMap.putInt("type", trackInfo.getType());
        trackInfoMap.putInt("subtype", trackInfo.getSubtype());
        trackInfoMap.putMap("customData", convertJsonToMap(trackInfo.getCustomData()));
        return trackInfoMap;
    }
}
