package tv.vizbee.rnreceiver;

import com.facebook.react.bridge.ReadableMap;

import org.json.JSONException;
import org.json.JSONObject;

import tv.vizbee.screen.api.VizbeeOptions;
import tv.vizbee.utils.Logger;

/**
 * Utility class to convert React Native options map to Vizbee SDK's VizbeeOptions
 */
public class RNVizbeeOptionsConverter {
    
    private static final String LOG_TAG = RNVizbeeOptionsConverter.class.getSimpleName();
    
    /**
     * Converts React Native options map to Vizbee SDK's VizbeeOptions
     * 
     * @param optionsMap ReactNative map containing Vizbee options
     * @return VizbeeOptions instance with values from the map
     */
    public static VizbeeOptions getVizbeeOptions(ReadableMap optionsMap) {
        if (null == optionsMap) {
            return new VizbeeOptions.Builder().build();
        }
        
        VizbeeOptions.Builder optionsBuilder = new VizbeeOptions.Builder();
        
        // Set shouldInitInBackground if available
        if (optionsMap.hasKey("shouldInitInBackground")) {
            optionsBuilder.setShouldInitInBackground(optionsMap.getBoolean("shouldInitInBackground"));
        }
        
        // Set configServiceProxyHost if available
        if (optionsMap.hasKey("configServiceProxyHost") && !optionsMap.isNull("configServiceProxyHost")) {
            optionsBuilder.setConfigServiceProxyHost(optionsMap.getString("configServiceProxyHost"));
        }
        
        // Set customMetricsAttributes if available
        if (optionsMap.hasKey("customMetricsAttributes") && !optionsMap.isNull("customMetricsAttributes")) {
            try {
                ReadableMap metricsMap = optionsMap.getMap("customMetricsAttributes");
                JSONObject metricsJson = RNJsonConverter.convertMapToJson(metricsMap);
                optionsBuilder.setCustomMetricsAttributes(metricsJson);
            } catch (JSONException e) {
                Logger.e(LOG_TAG, "Error converting metrics attributes to JSON", e);
            }
        }
        
        // Set loggingPreference if available
        if (optionsMap.hasKey("loggingPreference") && !optionsMap.isNull("loggingPreference")) {
            String loggingPref = optionsMap.getString("loggingPreference");
            if ("ENABLE_VERBOSE_LEVEL".equals(loggingPref)) {
                optionsBuilder.setLoggingPreference(VizbeeOptions.LoggingPreference.ENABLE_VERBOSE_LEVEL);
            } else if ("ENABLE_INFO_LEVEL".equals(loggingPref)) {
                optionsBuilder.setLoggingPreference(VizbeeOptions.LoggingPreference.ENABLE_INFO_LEVEL);
            } else {
                optionsBuilder.setLoggingPreference(VizbeeOptions.LoggingPreference.DISABLE);
            }
        }
        
        return optionsBuilder.build();
    }
}