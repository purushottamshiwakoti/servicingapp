import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Searchbar, Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { area } from "../data/area"; // Import your area data here
import useAuthStore from "../hooks/useAuth,";

const HomeScreen = () => {
  const { fullName, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = area.filter((item) =>
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text variant="headlineMedium">Hello {fullName}</Text>
          <Button onPress={logout}>Logout</Button>
        </View>
        <View style={{ marginTop: 10 }}>
          <Searchbar
            placeholder="Search service areas here..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <ScrollView style={{ flexGrow: 1 }}>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            Our Service areas
          </Text>
          {filteredData.map((item, index) => (
            <Card key={index} style={{ marginVertical: 10 }}>
              <Card.Content>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Location: {item.location}
                </Text>
                <Text style={{ marginTop: 5 }}>
                  Sublocation: {item.sublocation}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
