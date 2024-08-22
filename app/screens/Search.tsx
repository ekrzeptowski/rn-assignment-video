import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import useSWR from "swr";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { SearchBar } from "../components/SearchBar";
import { Container } from "../components/Container";
import { convertEm } from "../utils/convertEm";
import { TabParamList } from "../navigators/AuthenticatedApp";
import { useDebounce } from "../utils/useDebounce";
import { YoutubeClient } from "../client/youtube";
import { StackParamList } from "../navigators/MainNavigator";

type Props = NativeStackScreenProps<TabParamList, "Search">;

const client = new YoutubeClient();

export function SearchScreen({ route, navigation }: Props) {
  const routeQuery = route.params?.query;
  const debouncedSearchQuery = useDebounce(routeQuery, 500);

  const stackNavigation = 
  useNavigation<NativeStackScreenProps<StackParamList, "AuthenticatedApp">["navigation"]>();


  const { data: searchResults, isLoading: searchLoading } = useSWR(
    debouncedSearchQuery,
    () =>
      debouncedSearchQuery ? client.search(debouncedSearchQuery, 50) : undefined
  );
  return (
    <Container>
      <StatusBar style="auto" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{ flexDirection: "row", width: "100%", paddingHorizontal: 24 }}
        >
          <SearchBar
            defaultValue={routeQuery}
            onChange={(value) => navigation.setParams({ query: value })}
            autoFocus={!routeQuery}
          />
        </View>
        <Text style={styles.searchInfo}>
          {searchLoading && !searchResults && "Loading..."}
          {!searchLoading &&
            !searchResults &&
            debouncedSearchQuery &&
            "Type to search"}
          {!searchLoading && !searchResults && "No results found"}
          {searchResults && (
            <>
              {searchResults?.pageInfo?.totalResults} results found for:{" "}
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                “{debouncedSearchQuery}”
              </Text>
            </>
          )}
        </Text>
        <TouchableOpacity>
          <Text style={styles.sortOrder}>
            Sort by:{" "}
            <Text style={{ fontFamily: "Poppins_600SemiBold" }}>
              Most popular
            </Text>
          </Text>
        </TouchableOpacity>
        <ScrollView
          style={{
            paddingHorizontal: 24,
          }}
        >
          {!searchLoading &&
            searchResults?.items?.map((item) => (
              <TouchableOpacity
              key={item.id.videoId}
                style={{
                  marginVertical: 12,
                }}
                onPress={() => {
                  stackNavigation.navigate("VideoDetails", {
                    videoId: item.id.videoId,
                  });
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: undefined,
                    aspectRatio: 1.725,
                    borderRadius: 16,
                  }}
                  source={{
                    uri: item.snippet.thumbnails.high.url,
                  }}
                />
                <View style={styles.cardContainer}>
                  <Text style={styles.cardChannel}>
                    {item.snippet.channelTitle}
                  </Text>
                  <Text style={styles.cardTitle}>{item.snippet.title}</Text>
                  <Text style={styles.cardDate}>
                    {format(item.snippet.publishedAt, "dd.LL.yyyy")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

export const styles = StyleSheet.create({
  searchInfo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    lineHeight: 24,
    letterSpacing: convertEm(10, 0.01),
    marginHorizontal: 24,
  },
  sortOrder: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: convertEm(12, 0.01),
    marginHorizontal: 24,
    textAlign: "right",
  },
  cardContainer: {
    paddingLeft: 8,
    paddingTop: 16,
  },
  cardChannel: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    letterSpacing: convertEm(12, 0.01),
  },
  cardTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 15,
    letterSpacing: convertEm(15, 0.01),
    paddingVertical: 8,
  },
  cardDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    lineHeight: 24,
    letterSpacing: convertEm(10, 0.01),
    textAlign: "right",
  },
});
