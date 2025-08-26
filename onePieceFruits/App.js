import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
// import Entypo from '@expo/vector-icons/Entypo';

export default function App() {
  const [fruits, setFruits] = useState([]);

  async function fetchFruits() {
    const response = await fetch('https://api.api-onepiece.com/v2/fruits/en');
    const fruits = await response.json();
    setFruits(fruits);
  }

  useEffect(() => {
    fetchFruits();
  }, []);

  function createTemplateFruit(){
    let itemChoosen = 0
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruits</Text>

      <FlatList
        data={fruits}
        renderItem={({ item }) => {
          var source;
          if (item.filename == item.technicalFile) {
            source = require('./maca.png');
          } else {
            source = { uri: item.filename };
          }
          console.log(source);
          return (
            <View style={styles.boxFruit}>

              <Image style={styles.img}
                source={source}
              />
              <View>
                <Text>
                  Nome:
                  {item.name}
                </Text>
                <Text>
                  Nome comum:
                  {item.roman_name}

                </Text>
              </View>
            </View>
          )
        }
        } />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    marginBottom: 20,

  },
  boxFruit: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  }
})