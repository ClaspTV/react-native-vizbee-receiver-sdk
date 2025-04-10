package tv.vizbee.rnreceiver;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import tv.vizbee.screen.api.Vizbee;
import tv.vizbee.screen.api.VizbeeOptions;
import tv.vizbee.screen.api.messages.VideoInfo;
import tv.vizbee.utils.Logger;

public class RNVizbeeNativeManager extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static final String LOG_TAG = RNVizbeeNativeManager.class.getSimpleName();

    public static ReactApplicationContext reactApplicationContext = null;

    private RNVizbeePlayerAdapter playerAdapter;

    public RNVizbeeNativeManager(ReactApplicationContext reactContext) {
        super(reactContext);

        Logger.i("RNVizbeeNativeManager", "Constructor " + reactContext);
        reactApplicationContext = reactContext;

        reactApplicationContext.addLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "VizbeeNativeManager";
    }

    //---
    // Logging
    //---

    @ReactMethod
    public void enableVerboseLogging() {

        Logger.i(LOG_TAG, "Invoking enableVerboseLogging");
        Vizbee.getInstance().enableVerboseLogging();
    }

    //---
    // Init
    //---

    /**
     * Initializes the Vizbee SDK with the provided app ID and optional options.
     * @param appId The Vizbee App ID
     * @param optionsMap Optional options map (can be null)
     */
    @ReactMethod
    public void init(String appId, ReadableMap optionsMap) {
        
        RNVizbeeAppAdapter appAdapter = new RNVizbeeAppAdapter(reactApplicationContext);
        
        // Convert options map to VizbeeOptions using the converter or use default if null
        VizbeeOptions options = optionsMap != null ? 
            RNVizbeeOptionsConverter.getVizbeeOptions(optionsMap) : 
            new VizbeeOptions.Builder().build();
            
        Logger.i(LOG_TAG, "Initializing Vizbee SDK with appId " + appId + " and options " + options);
        Vizbee.getInstance().initialize(appId, appAdapter, options);
    }

    //---
    // PlayerAdapter
    //---

    @ReactMethod
    public void setPlayerAdapter(ReadableMap vizbeeVideoMap) {

        Logger.i(LOG_TAG, "setPlayerAdapter");

        VideoInfo videoInfo = RNVizbeeVideoInfoConverter.getVideoInfo(vizbeeVideoMap);
        Logger.i(LOG_TAG, "setPlayerAdapter videoInfo" + videoInfo);

        playerAdapter = new RNVizbeePlayerAdapter(reactApplicationContext);
        Vizbee.getInstance().setPlayerAdapter(videoInfo, playerAdapter);
    }

    @ReactMethod
    public void resetPlayerAdapter() {

        Logger.i(LOG_TAG, "resetPlayerAdapter");
        Vizbee.getInstance().resetPlayerAdapter();
    }

    //---
    // VideoStatus
    //---

    @ReactMethod
    public void setVideoStatus(ReadableMap videoStatusMap) {
        if  (null != playerAdapter) {
            playerAdapter.setVideoStatus(videoStatusMap);
        }
    }

    //---
    // App & session lifecycle
    //---

    @Override
    public void onHostResume() {
        Logger.v(LOG_TAG, "onHostResume");
    }

    @Override
    public void onHostPause() {
        Logger.v(LOG_TAG, "onHostPause");
    }

    @Override
    public void onHostDestroy() {
        Logger.v(LOG_TAG, "onHostDestroy");
    }
}
