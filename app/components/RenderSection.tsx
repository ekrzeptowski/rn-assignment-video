import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Section } from "../screens/Home";
import { colors } from "../styles/colors";
import { convertEm } from "../utils/convertEm";
import { format } from "date-fns";

export function RenderSection({
  section,
  firstItem,
  isLoading,
}: {
  section: Section;
  firstItem?: boolean;
  isLoading?: boolean;
}) {
  return (
    <View style={[!firstItem && styles.sectionDivider]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
        <TouchableOpacity>
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
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri:
            item.snippet.thumbnails.high.url || "https://placehold.co/360x224",
        }}
        style={styles.itemImage}
        width={180}
        height={112}
      />
      <Text style={styles.itemTitle}>{item.snippet.title}</Text>
      <Text style={styles.itemDate}>
        {format(item.snippet.publishedAt, "dd.LL.yyyy")}
      </Text>
    </View>
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
