package tv.vizbee.rnreceiver;

import android.app.Application;

import com.facebook.react.bridge.ReactApplicationContext;

import tv.vizbee.screen.api.Vizbee;

// NOTE: This class is only used for demo purpose
// until FireTV SDK is updated with the new APIs
// Remove this class after @ReactMethod(init()) in RNVizbeeNativeManager is implemented

public class RNVizbeeBootStrap {

    public static ReactApplicationContext reactApplicationContext;

    public static void init(Application application, String appId) {

        RNVizbeeAppAdapter appAdapter = new RNVizbeeAppAdapter(reactApplicationContext);
        Vizbee.getInstance().initialize(application, appId, appAdapter);
    }
}