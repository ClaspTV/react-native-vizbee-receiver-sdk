package tv.vizbee.rnreceiver;

import com.facebook.react.bridge.ReadableMap;

import org.json.JSONException;

import tv.vizbee.screen.api.messages.VideoInfo;

public class RNVizbeeVideoInfoConverter {
    
    /**
     * This method converts the app's media object(ReadableMap)
     * to Vizbee VideoInfo.
     */
    public static VideoInfo getVideoInfo(ReadableMap vizbeeVideoMap) {

        if (null == vizbeeVideoMap) {
            return null;
        }

        VideoInfo videoInfo = new VideoInfo();

        // metadata
        videoInfo.setGUID(vizbeeVideoMap.hasKey("guid") ? vizbeeVideoMap.getString("guid") : "");
        videoInfo.setTitle(vizbeeVideoMap.hasKey("title") ? vizbeeVideoMap.getString("title") : "");
        videoInfo.setSubtitle(vizbeeVideoMap.hasKey("subtitle") ? vizbeeVideoMap.getString("subtitle") : "");
        videoInfo.setDescription(vizbeeVideoMap.hasKey("description") ? vizbeeVideoMap.getString("description") : "");
        videoInfo.setImageURL(vizbeeVideoMap.hasKey("imgUrl") ? vizbeeVideoMap.getString("imgUrl") : "");
        videoInfo.setLive(vizbeeVideoMap.hasKey("isLive") && vizbeeVideoMap.getBoolean("isLive"));

        ReadableMap customMetadata = vizbeeVideoMap.hasKey("customMetadata") ? vizbeeVideoMap.getMap("customProperties") : null;
        if (null != customMetadata) {
            try {
                videoInfo.setCustomMetadata(RNJsonConverter.convertMapToJson(customMetadata));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        // track info
        // TODO: add track info

        return videoInfo;
    }
}
