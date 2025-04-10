import {Platform} from "react-native";
import VizbeeManager from './src/VizbeeManager';
import VizbeeOptions from './src/VizbeeOptions';
import VizbeeNoopManager from './src/VizbeeNoopManager';
import VizbeeAppDelegate from './src/delegates/app/VizbeeAppDelegate';
import VizbeePlayerDelegate from './src/delegates/player/VizbeePlayerDelegate';
import VizbeePlayerState from './src/messages/VizbeePlayerState';
import VizbeeVideoInfo from './src/messages/VizbeeVideoInfo';
import VizbeeVideoStatus from './src/messages/VizbeeVideoStatus';

if (Platform.OS == "android" && Platform.isTV) {
    module.exports = {
        VizbeeManager,
        VizbeeOptions,
        VizbeeAppDelegate,
        VizbeePlayerDelegate,
        VizbeePlayerState,
        VizbeeVideoInfo,
        VizbeeVideoStatus,
    }
} else {
    module.exports = {
        VizbeeManager: VizbeeNoopManager,
        VizbeeOptions,
        VizbeeAppDelegate,
        VizbeePlayerDelegate,
        VizbeePlayerState,
        VizbeeVideoInfo,
        VizbeeVideoStatus,
    }
}
