import { Text, StyleSheet, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import useSWR from "swr";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "../styles/colors";
import { YoutubeClient } from "../client/youtube";
import { StackParamList } from "../navigators/MainNavigator";
import { VideoPlayer } from "../components/VideoPlayer";
import { convertEm } from "../utils/convertEm";
import { Container } from "../components/Container";
import { StatField } from "../components/StatField";

import PersonIcon from "../assets/icons/person-icon.svg";
import ViewsIcon from "../assets/icons/views-icon.svg";
import LikesIcon from "../assets/icons/likes-icon.svg";

const exampleVideoUrl =
  "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

type Props = NativeStackScreenProps<StackParamList, "VideoDetails">;

const client = new YoutubeClient();

export function VideoDetails({ route }: Props) {
  const { data } = useSWR(route.params.videoId, () =>
    client.getVideoDetails(route.params.videoId)
  );

  const videoDetails = data?.items[0];
  return (
    <Container>
      <StatusBar hidden />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <VideoPlayer source={exampleVideoUrl} />
        <View style={styles.container}>
          <Text style={styles.videoTitle}>{videoDetails?.snippet.title}</Text>
          <View style={styles.channelContainer}>
            <View
              style={{
                height: 48,
                width: 48,
                borderRadius: 24,
                backgroundColor: colors.mainColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PersonIcon color="#fff" height={20} width={20} />
            </View>
            <Text style={styles.channelTitle}>
              {videoDetails?.snippet.channelTitle}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 32,
            }}
          >
            <Text style={styles.sectionText}>Description</Text>
            <Text style={{
                marginBottom: 8
            }}>{videoDetails?.snippet.description}</Text>
            <Text style={styles.sectionText}>Statistics</Text>
            <View style={styles.statsContainer}>
              <StatField
                label={`${videoDetails?.statistics.viewCount} views`}
                icon={<ViewsIcon color="#fff" height={20} width={20} />}
              />
              <StatField
                label={`${videoDetails?.statistics.likeCount} likes`}
                icon={<LikesIcon color="#fff" height={20} width={20} />}
                />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  videoTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    letterSpacing: convertEm(18, 0.01),
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    gap: 12,
  },
  channelTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    letterSpacing: convertEm(14, 0.01),
  },
  sectionText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    letterSpacing: convertEm(10, 0.01),
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    },
  spacer: {
    flex: 1,
  },
});
