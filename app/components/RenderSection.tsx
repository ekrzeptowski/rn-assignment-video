import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";

import { Section } from "../screens/Home";
import { colors } from "../styles/colors";
import { convertEm } from "../utils/convertEm";
import { TabParamList } from "../navigators/AuthenticatedApp";
import { StackParamList } from "../navigators/MainNavigator";

type Props = NativeStackScreenProps<TabParamList, "Home">;

export function RenderSection({
  section,
  firstItem,
  isLoading,
}: {
  section: Section;
  firstItem?: boolean;
  isLoading?: boolean;
}) {
  const navigation = useNavigation<Props["navigation"]>();

  return (
    <View style={[!firstItem && styles.sectionDivider]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search", {
              query: section.title,
            })
          }
        >
          <Text style={styles.sectionShowMore}>Show more</Text>
        </TouchableOpacity>
      </View>
      {!isLoading && (
        <FlatList
          data={section.data}
          style={{ marginBottom: 16 }}
          contentContainerStyle={{ gap: 20, paddingHorizontal: 24 }}
          horizontal
          renderItem={({ item }) => <RenderItem item={item} />}
        />
      )}
      {isLoading && <SectionLoading />}
    </View>
  );
}

function RenderItem({ item }: { item: Section["data"][0] }) {
  const navigation =
    useNavigation<
      NativeStackScreenProps<StackParamList, "AuthenticatedApp">["navigation"]
    >();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={() => {
        navigation.navigate("VideoDetails", {
          videoId: item.snippet.resourceId.videoId,
        });
      }}
    >
      {({ pressed }) => (
        <>
          <View
            style={{
              opacity: pressed ? 0.5 : 0,
              position: "absolute",
              backgroundColor: colors.mainColor,
              top: 0,
              left: -8,
              right: -8,
              bottom: 0,
              borderRadius: 18,
            }}
          />
          <Image
            source={{
              uri:
                item.snippet.thumbnails.high.url ||
                "https://placehold.co/360x224",
            }}
            style={styles.itemImage}
            width={180}
            height={112}
          />
          <Text style={styles.itemTitle}>{item.snippet.title}</Text>
          <Text style={styles.itemDate}>
            {format(item.snippet.publishedAt, "dd.LL.yyyy")}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const SectionLoading = () => (
  <FlatList
    data={[1, 2, 3]}
    style={{ marginBottom: 16 }}
    contentContainerStyle={{ gap: 20, paddingHorizontal: 24 }}
    horizontal
    renderItem={() => (
      <View style={styles.item}>
        <Image
          source={{
            uri: "https://placehold.co/360x224",
          }}
          style={styles.itemImage}
          width={180}
          height={112}
        />
        <Text style={styles.itemTitle}>Loading...</Text>
        <Text style={styles.itemDate}>Loading...</Text>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  item: {
    width: 180,
  },
  itemImage: {
    width: 180,
    height: 112,
    borderRadius: 16,
    marginVertical: 5,
  },
  itemTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    letterSpacing: convertEm(12, 0.01),
  },
  itemDate: {
    textAlign: "right",
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    letterSpacing: convertEm(10, 0.01),
    lineHeight: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeaderText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: convertEm(18, 0.01),
  },
  sectionShowMore: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: convertEm(12, 0.01),
    color: colors.mainColor,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  sectionDivider: {
    borderTopColor: colors.mainColor,
    borderTopWidth: 2,
  },
});
