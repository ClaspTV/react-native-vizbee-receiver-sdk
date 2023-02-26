package tv.vizbee.rnreceiver;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import tv.vizbee.screen.api.adapter.VizbeeAppAdapter;
import tv.vizbee.screen.api.messages.CustomEvent;
import tv.vizbee.screen.api.messages.VideoInfo;
import tv.vizbee.screen.api.messages.VideoTrackInfo;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

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

    public void onStart(VideoInfo video, long position) {
        super.onStart(video, position);

        Log.i(LOG_TAG, "onStart");

        try {
            this.reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ON_STRT_VIDEO", getVideoInfoMap(video, position));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void onEvent(CustomEvent customEvent) {
        super.onEvent(customEvent);
        
        Log.i(LOG_TAG, "onEvent");
        // sanity to make sure that customEvent is not null to avoid app crashes
        if (null == customEvent) {
            Log.w(LOG_TAG, "customEvent is null");
            return;
        }

        if (customEvent.getEventType() == "tv.vizbee.homesign.signin") {

            JSONObject eventData = customEvent.getEventData();
            if (null != eventData) {
                JSONObject authInfo = eventData.optJSONObject("authInfo");
                if (null != authInfo) {
                    this.reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("ON_SIGN_IN", authInfo);
                }
            } else {
                Log.w(LOG_TAG, "eventData is null");
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

    private WritableMap toWritableMap(Map<String, Object> properties) {

        WritableMap resultMap = Arguments.createMap();

        try {
            JSONObject json = new JSONObject(properties.toString());
            if (json != null) {
                resultMap = convertJsonToMap(json);
            }
            else {
                Log.e(LOG_TAG, "toWritableMap error: invalid custom properties");
            }
        } catch (JSONException e) {
            Log.e(LOG_TAG, "toWritableMap error: ", e.getCause());
        }

        return resultMap;
    }

    private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {

        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof  Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof  Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String)  {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    private static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {

        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof  Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof  Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String)  {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }
}