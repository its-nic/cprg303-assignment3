import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.EXPO_PUBLIC_KEY,
      'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
    }
  };

  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [fact, setFact] = useState<string>("");

  useEffect(() => {
    const monthNumber = parseInt(month);
    const dayNumber = parseInt(day);

    if (monthNumber >= 1 && monthNumber <= 12 && dayNumber >= 1 && dayNumber <= 31) {
      fetchFact(monthNumber, dayNumber);
    }
    else {
      setFact("");
    }
  }, [month, day]);

  const fetchFact = async (month: number, day: number) => {
    try {
      const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, options);
      const result = await response.text();
      setFact(result);
    } catch (error) {
      console.error(error);
      setFact("");
    }
  }

  const onMonthChange = (input: string) => {
    setMonth(input.replace(/[^0-9]/g, ''));
  }

  const onDayChange = (input: string) => {
    setDay(input.replace(/[^0-9]/g, ''));
  }


  return (
    <View style={styles.container}>
      {fact && <Text>{fact}</Text>}
      <TextInput 
        style={styles.input}
        placeholder='Month'
        value={month}
        onChangeText={onMonthChange}
      />
      <TextInput 
        style={styles.input}
        placeholder='Day'
        value={day}
        onChangeText={onDayChange}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: 200,
  }
});
