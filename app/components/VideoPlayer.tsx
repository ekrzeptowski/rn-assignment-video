import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Video, { VideoRef } from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Slider } from "@miblanchard/react-native-slider";

import { secondsToHms } from "../utils/secondsToHms";
import { StackParamList } from "../navigators/MainNavigator";
import { PlayerButton } from "./PlayerButton";
import { convertEm } from "../utils/convertEm";

import LeftArrowIcon from "../assets/icons/leftarrow-icon.svg";
import VolumeIcon from "../assets/icons/volume-icon.svg";
import AirplayIcon from "../assets/icons/airplay-icon.svg";
import BackwardIcon from "../assets/icons/backward-icon.svg";
import PlayIcon from "../assets/icons/play-icon.svg";
import PauseIcon from "../assets/icons/pause-icon.svg";
import ForwardIcon from "../assets/icons/forward-icon.svg";
import FullScreenIcon from "../assets/icons/fullscreen-icon.svg";

type VideoPlayerProps = {
  source: string;
};

export function VideoPlayer({ source }: VideoPlayerProps) {
  const videoRef = useRef<VideoRef>(null);
  const navigation =
    useNavigation<
      NativeStackScreenProps<StackParamList, "VideoDetails">["navigation"]
    >();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<{
    currentTime: number | null;
    seekableDuration: number | null;
  }>({
    currentTime: null,
    seekableDuration: null,
  });

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    ScreenOrientation.addOrientationChangeListener((event) => {
      if (
        event.orientationInfo.orientation ===
          ScreenOrientation.Orientation.PORTRAIT_UP ||
        event.orientationInfo.orientation ===
          ScreenOrientation.Orientation.PORTRAIT_DOWN
      ) {
        videoRef.current?.setFullScreen(false);
      } else {
        videoRef.current?.setFullScreen(true);
      }
    });
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, []);

  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <View>
        <Video
          source={{
            uri: source,
          }}
          ref={videoRef}
          style={styles.videoPlayer}
          resizeMode="contain"
          onPlaybackStateChanged={({ isPlaying }) => {
            setIsPlaying(isPlaying);
          }}
          onProgress={({ currentTime, seekableDuration }) => {
            setProgress({ currentTime, seekableDuration });
          }}
          onFullscreenPlayerDidPresent={() => {
            setIsFullScreen(true);
          }}
          onFullscreenPlayerDidDismiss={() => {
            setIsFullScreen(false);
          }}
        />
        <View style={styles.overlay}>
          <View style={{ flexDirection: "row", padding: 16, zIndex: 1 }}>
            <PlayerButton
              icon={<LeftArrowIcon color="#fff" width={20} height={20} />}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <View style={styles.spacer} />
            <PlayerButton
              icon={<VolumeIcon color="#fff" width={20} height={20} />}
              onPress={() => {}}
            />
            <PlayerButton
              icon={<AirplayIcon color="#fff" width={20} height={20} />}
              onPress={() => {}}
            />
          </View>
          <View style={styles.spacer} />
          <View
            style={styles.controlsContainer}
          >
            <PlayerButton
              icon={<BackwardIcon color="#fff" width={24} height={24} />}
              onPress={async () => {
                videoRef.current?.seek(
                  (await videoRef.current?.getCurrentPosition()) - 10
                );
              }}
            />
            <PlayerButton
              icon={
                isPlaying ? (
                  <PauseIcon color="#fff" width={24} height={24} />
                ) : (
                  <PlayIcon color="#fff" width={24} height={24} />
                )
              }
              size={48}
              onPress={async () => {
                if (isPlaying) {
                  videoRef.current?.pause();
                } else {
                  videoRef.current?.resume();
                }
              }}
            />
            <PlayerButton
              icon={<ForwardIcon color="#fff" width={24} height={24} />}
              onPress={async () => {
                videoRef.current?.seek(
                  (await videoRef.current?.getCurrentPosition()) + 10
                );
              }}
            />
          </View>
          <View>
            <Text style={styles.playerTime}>
              {secondsToHms(progress.currentTime ?? 0)} /{" "}
              {secondsToHms(progress.seekableDuration ?? 0)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
            }}
            onPress={() => {
              videoRef.current?.setFullScreen(!isFullScreen);
            }}
          >
            <FullScreenIcon color="#fff" width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      <Slider
        value={progress.currentTime ?? 0}
        maximumValue={progress.seekableDuration ?? 0}
        onValueChange={(value) => {
          videoRef.current?.seek(value[0]);
        }}
        thumbTintColor="#C71F1F"
        minimumTrackTintColor="#C71F1F"
        trackStyle={{
          backgroundColor: "#C8C8C8",
          height: 4,
        }}
        thumbStyle={{
          width: 12,
          height: 12,
        }}
        containerStyle={{
          marginTop: -18,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: "row",
        padding: 16,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: "space-evenly",
        alignItems: "center",
      },
      videoPlayer: {
        width: "100%",
        height: undefined,
        aspectRatio: 16 / 9,
        backgroundColor: "black",
      },
      spacer: {
        flex: 1,
      },
      overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      playerTime: {
        color: "#fff",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 10,
        lineHeight: 18,
        letterSpacing: convertEm(10, 0.01),
        padding: 8,
      },
})