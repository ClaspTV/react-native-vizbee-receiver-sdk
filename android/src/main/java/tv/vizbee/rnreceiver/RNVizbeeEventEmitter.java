package tv.vizbee.rnreceiver;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import tv.vizbee.utils.Logger;

/**
 * RNVizbeeEventEmitter to emit the events to JS.
 */

public class RNVizbeeEventEmitter {

    private static final String LOG_TAG = RNVizbeeEventEmitter.class.getSimpleName();

    public enum Event {
        APP_ADAPTER_ON_START_VIDEO,
        APP_ADAPTER_ON_SIGN_IN,
        PLAYER_ADAPTER_COMMAND;
    }

    public static void emitEvent(Event eventName, WritableMap params, ReactApplicationContext reactContext) {

        Logger.i(LOG_TAG, "Emitting event " + eventName + "'with params " + params);

        reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName.name(), params);
    }
}

