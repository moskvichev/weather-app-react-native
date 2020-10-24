import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

const weatherURL = "https://www.metaweather.com/api/location/2122265/";
const image = {
  uri:
    "https://i.pinimg.com/564x/d4/79/35/d479359444438e53a87e3fcd7a752b0e.jpg",
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [titleCity, setDataCity] = useState([]);

  useEffect(() => {
    fetch(weatherURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.consolidated_weather);
        setDataCity(json.title);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.head}>
            <StatusBar style="auto" />
            <Text style={styles.topText}>
              This is weather-app are test task for SimbirSoft!
            </Text>
            <Text style={styles.mainText} data={titleCity}>
              {titleCity}
            </Text>
          </View>
          <ImageBackground source={image} style={styles.image}>
            <FlatList
              data={data}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <View style={styles.weatherInfo}>
                  <Text style={styles.dateInfo}>{item.applicable_date}</Text>

                  <Text>t&#176; min: {item.min_temp.toFixed(1)}</Text>

                  <Text>t&#176; max: {item.max_temp.toFixed(1)}</Text>

                  <Text>Weather States: {item.weather_state_name}</Text>
                </View>
              )}
            />
          </ImageBackground>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {
    backgroundColor: "#1375b0",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    padding: 10,
  },
  mainText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    padding: 10,
  },
  weatherInfo: {
    borderWidth: 1,
    borderColor: "#1375b0",
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    width: 220,
    marginLeft: 20,
  },
  dateInfo: {
    borderBottomWidth: 1,
    borderBottomColor: "#1375b0",
    textAlign: "center",
  },
});

export default App;
