package tv.vizbee.rnreceiver;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import tv.vizbee.screen.api.Vizbee;
import tv.vizbee.screen.api.messages.VideoInfo;


public class RNVizbeeNativeManager extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static final String LOG_TAG = RNVizbeeNativeManager.class.getName();

    private final ReactApplicationContext reactContext;

    private RNVizbeePlayerAdapter playerAdapter;

    public RNVizbeeNativeManager(ReactApplicationContext reactContext) {
        super(reactContext);

        Log.v(LOG_TAG, "Constructor " + reactContext);
        this.reactContext = reactContext;

        this.reactContext.addLifecycleEventListener(this);

        // TODO: Remove this after FireTV SDK is updated with the new APIs
        RNVizbeeBootStrap.reactApplicationContext = reactContext;
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

        Log.v(LOG_TAG, "Invoking enableVerboseLogging");
         Vizbee.getInstance().enableVerboseLogging();
    }

    //---
    // Init
    //---

    @ReactMethod
    public void init(String appId) {

        RNVizbeeAppAdapter appAdapter = new RNVizbeeAppAdapter(this.reactContext);

        // TODO: initialize after FireTV SDK API has been updated
        // Vizbee.getInstance().initialize()
    }

    //---
    // PlayerAdapter
    //---

    @ReactMethod
    public void setPlayerAdapter(ReadableMap vizbeeVideoMap) {

        Log.i(LOG_TAG, "setPlayerAdapter");

        VideoInfo videoInfo = RNVizbeeVideoInfoConverter.getVideoInfo(vizbeeVideoMap);
        Log.i(LOG_TAG, "setPlayerAdapter videoInfo" + videoInfo);

        playerAdapter = new RNVizbeePlayerAdapter(this.reactContext);
        Vizbee.getInstance().setPlayerAdapter(videoInfo, playerAdapter);
    }

    @ReactMethod
    public void resetPlayerAdapter() {

        Log.i(LOG_TAG, "resetPlayerAdapter");
        Vizbee.getInstance().resetPlayerAdapter();
    }

    //---
    // VideoStatus
    //---

    @ReactMethod
    public void setVideoStatus(ReadableMap videoStatusMap) {
        playerAdapter.setVideoStatus(videoStatusMap);
    }

    //---
    // App & session lifecycle
    //---

    @Override
    public void onHostResume() {
        Log.v(LOG_TAG, "onHostResume");
    }

    @Override
    public void onHostPause() {
        Log.v(LOG_TAG, "onHostPause");
    }

    @Override
    public void onHostDestroy() {
        Log.v(LOG_TAG, "onHostDestroy");
    }
}