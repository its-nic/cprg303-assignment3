// Updated 2025-03-10
// Authors: Nic, Jacob, Noah

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';

export default function App() {
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.EXPO_PUBLIC_KEY,
      'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
    }
  };

  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [fact, setFact] = useState<string>("Select a date and see a fun fact!");
  const [modalVisible, setModalVisible] = useState<"month" | "day" | null>(null);

  const months = [
    { number: 1, name: "January", days: 31 },
    { number: 2, name: "February", days: 28 },
    { number: 3, name: "March", days: 31 },
    { number: 4, name: "April", days: 30 },
    { number: 5, name: "May", days: 31 },
    { number: 6, name: "June", days: 30 },
    { number: 7, name: "July", days: 31 },
    { number: 8, name: "August", days: 31 },
    { number: 9, name: "September", days: 30 },
    { number: 10, name: "October", days: 31 },
    { number: 11, name: "November", days: 30 },
    { number: 12, name: "December", days: 31 },
  ];

  useEffect(() => {
    if (month && day) {
      fetchFact(month, day);
    } else {
      setFact("Select a date and see a fun fact!");
    }
  }, [month, day]);

  const fetchFact = async (month: number, day: number) => {
    try {
      const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, options);
      const result = await response.text();
      setFact(result);
    } catch (error) {
      console.error(error);
      setFact("Error fetching fact.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Pick a date, get a fact! 🥸 </Text>

      <View style={styles.factBox}>
        <Text style={styles.fact}>{fact}</Text>
      </View>

      <View style={styles.selectorContainer}>
        <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible("month")}>
          <Text style={styles.dropdownText}>
            {month ? months.find(m => m.number === month)?.name : "Select Month"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, { opacity: month ? 1 : 0.5 }]}
          onPress={() => month && setModalVisible("day")}
          disabled={!month}
        >
          <Text style={styles.dropdownText}>{day ? `Day: ${day}` : "Select Day"}</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />

      <Modal visible={modalVisible === "month"} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              keyExtractor={(item) => item.number.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setMonth(item.number);
                  setDay(null);
                  setModalVisible(null);
                }}>
                  <Text style={styles.modalText}>{item.name}</Text> 
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible === "day"} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={Array.from(
                { length: months.find(m => m.number === month)?.days ?? 0 },
                (_, i) => ({ key: i + 1, value: i + 1 })
              )}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setDay(item.value);
                  setModalVisible(null);
                }}>
                  <Text style={styles.modalText}>{`Day ${item.value}`}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 70,
  },
  factBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  fact: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  dropdown: {
    backgroundColor: "#8E44AD",
    padding: 15,
    marginTop: 70,
    borderRadius: 12,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  dropdownText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: 270,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  modalItem: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center"
  },
  modalText: {
    fontSize: 18,
    color: "#2c3e50",
    fontWeight: "600",
  }
});
