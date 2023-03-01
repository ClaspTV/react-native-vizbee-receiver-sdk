package tv.vizbee.rnreceiver;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * RNVizbeeEventEmitter to emit the events to JS.
 */

public class RNVizbeeEventEmitter {

    private static final String LOG_TAG = RNVizbeeEventEmitter.class.getName();

    public enum Event {
        APP_ADAPTER_ON_START_VIDEO,
        APP_ADAPTER_ON_SIGN_IN,
        PLAYER_ADAPTER_ON_PLAYBACK_STATUS;
    }

    public static void emitEvent(Event eventName, WritableMap params, ReactApplicationContext reactContext) {

        Log.i(LOG_TAG, "Emitting event " + eventName + "'with params " + params);

        reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName.name(), params);
    }
}

