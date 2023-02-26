package tv.vizbee.rnreceiver;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import tv.vizbee.screen.api.Vizbee;
import tv.vizbee.screen.api.adapter.VizbeeAppAdapter;


public class RNVizbeeNativeManager extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static final String LOG_TAG = RNVizbeeNativeManager.class.getName();

    private final ReactApplicationContext reactContext;

    public RNVizbeeNativeManager(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        this.reactContext.addLifecycleEventListener(this);
    }

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
        // Vizbee.getInstance().initialize()
    }

    //----------------
    // App & session lifecycle
    //----------------

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

    //----------------
    // Bridge events
    //----------------

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
}