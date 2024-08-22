import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import useSWR from "swr";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { YoutubeClient } from "../client/youtube";

import { Container } from "../components/Container";
import { SearchBar } from "../components/SearchBar";
import { RenderSection } from "../components/RenderSection";

import SettingsIcon from "../assets/icons/settings-icon.svg";
import { TabParamList } from "../navigators/AuthenticatedApp";

const client = new YoutubeClient();

export type Section = {
  title: string;
  playlistId: string;
  isLoading?: boolean;
  data: Array<{
    id: string;
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
      resourceId: {
        videoId: string;
      }
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

type Props = NativeStackScreenProps<TabParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
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
    <Container>
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
          <SearchBar
            onPress={() =>
              navigation.navigate("Search", {
                query: undefined,
              })
            }
          />
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
    </Container>
  );
}
