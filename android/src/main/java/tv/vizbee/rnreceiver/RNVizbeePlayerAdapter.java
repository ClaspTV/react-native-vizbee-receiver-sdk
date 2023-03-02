package tv.vizbee.rnreceiver;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import tv.vizbee.screen.api.adapter.VizbeePlayerAdapter;
import tv.vizbee.screen.api.messages.AdStatus;
import tv.vizbee.screen.api.messages.PlaybackStatus;
import tv.vizbee.screen.api.messages.VideoStatus;
import tv.vizbee.utils.Logger;

public class RNVizbeePlayerAdapter extends VizbeePlayerAdapter {

    private static final String LOG_TAG = "RNVizbeePlayerAdapter";

    private final ReactApplicationContext reactContext;

    private ReadableMap videoStatusMap;

    public RNVizbeePlayerAdapter(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void setVideoStatus(ReadableMap videoStatusMap) {
        this.videoStatusMap = videoStatusMap;
    }

    @Override
    public void play() {

        Logger.i(LOG_TAG, "PLAY");

        WritableMap playbackStatus = Arguments.createMap();
        playbackStatus.putString("playbackState", "play");
        RNVizbeeEventEmitter.emitEvent(
                RNVizbeeEventEmitter.Event.PLAYER_ADAPTER_ON_PLAYBACK_STATUS,
                playbackStatus,
                this.reactContext);
    }

    @Override
    public void pause() {

        Logger.i(LOG_TAG, "PAUSE");

        WritableMap playbackStatus = Arguments.createMap();
        playbackStatus.putString("playbackState", "pause");
        RNVizbeeEventEmitter.emitEvent(
                RNVizbeeEventEmitter.Event.PLAYER_ADAPTER_ON_PLAYBACK_STATUS,
                playbackStatus,
                this.reactContext);
    }

    @Override
    public void seek(int position) {

        Logger.i(LOG_TAG, "SEEK " + position);

        WritableMap playbackStatus = Arguments.createMap();
        playbackStatus.putString("playbackState", "seek");
        playbackStatus.putDouble("seekPos", position);
        RNVizbeeEventEmitter.emitEvent(
                RNVizbeeEventEmitter.Event.PLAYER_ADAPTER_ON_PLAYBACK_STATUS,
                playbackStatus,
                this.reactContext);
    }

    @Override
    public void stop(int reason) {

        Logger.i(LOG_TAG, "STOP");

        WritableMap playbackStatus = Arguments.createMap();
        playbackStatus.putString("playbackState", "stop");
        RNVizbeeEventEmitter.emitEvent(
                RNVizbeeEventEmitter.Event.PLAYER_ADAPTER_ON_PLAYBACK_STATUS,
                playbackStatus,
                this.reactContext);
    }

    private boolean isPlayingContent = true;

    @Override
    public VideoStatus getVideoStatus() {

        Logger.i(LOG_TAG, "VIDEO_STATUS");

        VideoStatus videoStatus = new VideoStatus();
        videoStatus.mPlaybackStatus = PlaybackStatus.UNKNOWN;
        videoStatus.mDuration = -1;

        if (null != videoStatusMap) {

            boolean isPlayingAd = videoStatusMap.hasKey("isPlayingAd")
                    && videoStatusMap.getBoolean("isPlayingAd");
            if (isPlayingAd) {

                // ads start
                if (isPlayingContent) {
                    if (null != this.getAdStatusListener()) {
                        this.getAdStatusListener().onAdStart("unknown");
                    }
                    isPlayingContent = false;
                }

                videoStatus.mPlaybackStatus = PlaybackStatus.PAUSED_BY_AD;
                videoStatus.mDuration = -1;
                videoStatus.mPosition = -1;
            } else {

                // ads end
                if (!isPlayingContent) {
                    if (null != this.getAdStatusListener()) {
                        this.getAdStatusListener().onAdCompleted();
                    }
                    isPlayingContent = true;
                }
                
                // set playback status
                videoStatus.mPlaybackStatus = PlaybackStatus.UNKNOWN;
                String playbackState = videoStatusMap.hasKey("playbackState")
                        ? videoStatusMap.getString("playbackState") : null;
                if (null != playbackState) {

                    // state
                    switch (playbackState) {
                        case "loading":
                            videoStatus.mPlaybackStatus = PlaybackStatus.LOADING;
                            break;
                        case "playing":
                            videoStatus.mPlaybackStatus = PlaybackStatus.PLAYING;
                            break;
                        case "paused":
                            videoStatus.mPlaybackStatus = PlaybackStatus.PAUSED_BY_USER;
                            break;
                        case "buffering":
                            videoStatus.mPlaybackStatus = PlaybackStatus.BUFFERING;
                            break;
                        case "failed":
                            videoStatus.mPlaybackStatus = PlaybackStatus.FAILED;
                            break;
                        case "finished":
                            videoStatus.mPlaybackStatus = PlaybackStatus.INTERRUPTED;
                            break;
                        default:
                            videoStatus.mPlaybackStatus = PlaybackStatus.UNKNOWN;
                            break;
                    }
                }

                videoStatus.mPosition = videoStatusMap.hasKey("currentPosition")
                        ? videoStatusMap.getInt("currentPosition") : 0;
                videoStatus.mDuration = videoStatusMap.hasKey("duration")
                        ? videoStatusMap.getInt("duration") : 0;
            }
        }

        return videoStatus;
    }

    @Override
    public AdStatus getAdStatus() {

        Logger.i(LOG_TAG, "AD_STATUS");
        
        if (null != videoStatusMap) {

            boolean isPlayingAd = videoStatusMap.hasKey("isPlayingAd")
                    && videoStatusMap.getBoolean("isPlayingAd");
            if (isPlayingAd) {

                AdStatus adStatus = new AdStatus();
                adStatus.mPlaybackStatus = PlaybackStatus.PLAYING;

                adStatus.mPosition = videoStatusMap.hasKey("currentPosition")
                        ? videoStatusMap.getInt("currentPosition") : 0;
                adStatus.mDuration = videoStatusMap.hasKey("duration")
                        ? videoStatusMap.getInt("duration") : 0;

                return adStatus;
            }
        }

        return null;
    }
}