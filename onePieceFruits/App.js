import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView, Button, Image, Alert } from 'react-native';

export default function App() {
  const [pagina, setPagina] = useState('character')
  const [characters, setCharacters] = useState([]);
  const [selectedFruitName, setSelectedFruitName] = useState(null);

  async function fetchCharacters() {
    const response = await fetch(
      'https://api.api-onepiece.com/v2/characters/en'
    );
    const character = await response.json();
    setCharacters(character);
  }

  fetchCharacters();

  const [fruits, setFruits] = useState([]);

  async function fetchFruits() {
    const response = await fetch('https://api.api-onepiece.com/v2/fruits/en');
    const fruits = await response.json();
    setFruits(fruits);
  }

  useEffect(() => {
    fetchFruits();
    fetchCharacters();
  }, []);



  function fruitsOnePiece() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fruits</Text>
        <Button title="Voltar" onPress={() => setPagina('character')} />
        <FlatList
          data={fruits}
          renderItem={({ item }) => {
            var source;
            if (item.filename == item.technicalFile) {
              source = require('./maca.png');
            } else {
              source = { uri: item.filename };
            }
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
    )
  };

  function unicFruit(itemChoosen) {
    const item = fruits.find(f => f.name === itemChoosen);
    if (!item) return null;

    const source =
      item.filename === item.technicalFile
        ? require('./maca.png')
        : { uri: item.filename };



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
          <Text>
            Descrição:
            {item.description}
          </Text>
        </View>
        <Button title="Voltar" onPress={() => setPagina('character')} />
      </View>
    )
  }
  function charactersOnePiece() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Personagens de One Piece</Text>
        <Button title='Ver frutas' onPress={() => setPagina('fruits')} />

        <FlatList data={characters} renderItem={({ item }) =>
          <View style={styles.containercard}>
            <Text>{item.name}</Text>
            <Text>{item.bounty
              ? `Recompensa: ${item.bounty}`
              : `Sem Recompensa`}</Text>
            <Text>{item.crew && item.crew.name
              ? `Tripulação:${item.crew.name}`
              : `Sem Tripulação`}</Text>
            <Text>{item.crew && item.crew.total_prime
              ? `Recompensa da Tripulação: ${item.crew.total_prime}`
              : "Sem recompensas"}</Text>
            <Button
              title={item.fruit ? item.fruit.name : "Sem fruta"}
              onPress={() => {
                if (item.fruit) {
                  setSelectedFruitName(item.fruit.name);
                  setPagina('unicFruit');
                } else {
                  console.log('Alerta de personagem sem fruta');
                  Alert.alert('Sem fruta', `${item.name} não possui uma fruta.`);
                }
              }} />

          </View>
        }
        />
      </View>
    )

  }
  useEffect(() => {
  Alert.alert('Teste', 'Se você está vendo isso, Alert está funcionando!');
}, []);

  return (
    <View style={styles.container}>
      {pagina === 'character'
        ? charactersOnePiece()
        : (pagina === 'fruits'
          ? fruitsOnePiece()
          : unicFruit(selectedFruitName)

        )

      }
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
  img: {
    width: 100,
    height: 100,
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
    width: 400,
    padding: 10,
  },
  containercard: {
    marginBottom: 20,
    backgroundColor: 'rgba(209, 209, 209, 1)',
    padding: 15,
    borderRadius: 8
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 25
  }
});