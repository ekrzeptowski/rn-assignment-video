import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import useSWR from "swr";

import { YoutubeClient } from "../client/youtube";

import { SearchBar } from "../components/SearchBar";
import { RenderSection } from "../components/RenderSection";

import SettingsIcon from "../assets/icons/settings-icon.svg";

const client = new YoutubeClient();

export type Section = {
  title: string;
  playlistId: string;
  isLoading?: boolean;
  data: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      thumbnails: {
        high: {
          url: string;
          width: number;
          height: number;
        };
      };
      publishedAt: string;
    };
  }>;
};

const sections: Section[] = [
  {
    title: "React Native",
    playlistId: "PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ",
    data: [],
  },
  {
    title: "React",
    playlistId: "PLWKjhJtqVAbkArDMazoARtNz1aMwNWmvC",
    data: [],
  },
  {
    title: "Typescript",
    playlistId: "PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI",
    data: [],
  },
  {
    title: "Javascript",
    playlistId: "PLlrxD0HtieHhW0NCG7M536uHGOtJ95Ut2",
    data: [],
  },
];

export function HomeScreen() {
  const { data: reactNativeData, isLoading: reactNativeDataLoading } = useSWR(
    sections[0].playlistId,
    () => client.getPlaylistItems(sections[0].playlistId)
  );
  const { data: reactData, isLoading: reactDataLoading } = useSWR(
    sections[1].playlistId,
    () => client.getPlaylistItems(sections[1].playlistId)
  );
  const { data: typescriptData, isLoading: typescriptDataLoading } = useSWR(
    sections[2].playlistId,
    () => client.getPlaylistItems(sections[2].playlistId)
  );
  const { data: javascriptData, isLoading: javascriptDataLoading } = useSWR(
    sections[3].playlistId,
    () => client.getPlaylistItems(sections[3].playlistId)
  );

  sections[0].data = reactNativeData?.items ?? [];
  sections[1].data = reactData?.items ?? [];
  sections[2].data = typescriptData?.items ?? [];
  sections[3].data = javascriptData?.items ?? [];

  sections[0].isLoading = reactNativeDataLoading;
  sections[1].isLoading = reactDataLoading;
  sections[2].isLoading = typescriptDataLoading;
  sections[3].isLoading = javascriptDataLoading;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 24,
            gap: 16,
          }}
        >
          <SearchBar />
          <SettingsIcon style={{ height: 32, width: 32 }} />
        </View>
        <ScrollView>
          {sections.map((section, index) => (
            <RenderSection
              key={index}
              section={section}
              firstItem={index === 0}
              isLoading={section.isLoading}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
