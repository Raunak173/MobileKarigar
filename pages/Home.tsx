import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import profile from '../assets/images/profile.png';
import search from '../assets/images/search.png';
import add from '../assets/images/add.png';
import TotalCard from '../components/TotalCard';
import Card from '../components/Card';
import Footer from '../components/Footer';
import AddCardModal from '../components/AddModal';
import DummyCards from '../components/DummyCards';
import {debounce} from 'lodash';
import {useLayoutData} from '../LayoutContext';

const Home = () => {
  const [cards, setCards] = useState(DummyCards);
  const [active, setActive] = useState('both');
  const [modalVisible, setModalVisible] = useState(false);
  const [newCardData, setNewCardData] = useState({
    name: '',
    silver: '',
    gold: '',
    amt: '',
    phone: '',
  });
  const [editCardIndex, setEditCardIndex] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const handleSearchDebounced = debounce(searchValue => {
    const filteredCards = DummyCards.filter(
      card =>
        card.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        card.phone.includes(searchValue),
    );
    setCards(filteredCards);
  }, 300);
  const handleEditCard = index => {
    setEditCardIndex(index);
    const cardToEdit = cards[index];
    setNewCardData({
      name: cardToEdit.name,
      silver: cardToEdit.silver.toString(),
      gold: cardToEdit.gold.toString(),
      amt: cardToEdit.amt.toString(),
      phone: cardToEdit.phone.toString(),
    });
    setModalVisible(true);
  };
  const handleAddCard = () => {
    const updatedCards = [...cards];
    updatedCards.unshift({
      name: newCardData.name,
      silver: parseFloat(newCardData.silver),
      gold: parseFloat(newCardData.gold),
      amt: parseFloat(newCardData.amt),
      phone: newCardData.phone,
    });
    setCards(updatedCards);
    setModalVisible(false);
    setNewCardData({
      name: '',
      silver: '',
      gold: '',
      amt: '',
      phone: '',
    });
  };
  const handleFilterToggle = filterType => {
    setActive(filterType);
  };
  const filteredCards = () => {
    if (active === 'both') {
      return cards;
    } else if (active === 'silver') {
      return cards.filter(card => card.silver > 0);
    } else if (active === 'gold') {
      return cards.filter(card => card.gold > 0);
    }
  };
  const handleDeleteCard = card => {
    const updatedCards = cards.filter(c => c !== card);
    setCards(updatedCards);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleSearch = value => {
    setSearchInput(value);
    handleSearchDebounced(value);
  };
  const {updateLayoutData} = useLayoutData();

  const handleLayout = componentName => event => {
    const {x, y, width, height} = event.nativeEvent.layout;
    const layoutInfo = {
      name: componentName,
      x,
      y,
      width,
      height,
      componentId: Date.now(),
    };
    updateLayoutData(layoutInfo);
  };

  return (
    <View
      style={{backgroundColor: '#fbfafe', flex: 1}}
      onLayout={event => handleLayout('HomeMainView')(event)}>
      <AddCardModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newCardData={newCardData}
        setNewCardData={setNewCardData}
        handleAddCard={handleAddCard}
        onLayout={event => handleLayout('CardModal')(event)}
      />
      <View
        style={styles.prof}
        onLayout={event => handleLayout('ProfileView')(event)}>
        <Image source={profile} />
        <Text style={styles.profText}>Mannalal Manaklal</Text>
      </View>
      <View
        style={styles.main}
        onLayout={event => handleLayout('MainView')(event)}>
        <View
          style={styles.searchBox}
          onLayout={event => handleLayout('SearchView')(event)}>
          <Image source={search} />
          <TextInput
            placeholder="Search Karigar"
            value={searchInput}
            onChangeText={handleSearch}
          />
        </View>
        <View
          style={styles.filters}
          onLayout={event => handleLayout('FilterView')(event)}>
          <TouchableOpacity
            onLayout={event => handleLayout('BothBtn')(event)}
            style={[
              styles.pils,
              {backgroundColor: active === 'both' ? '#7F90AB' : 'white'},
            ]}
            onPress={() => handleFilterToggle('both')}>
            <Text
              style={[
                styles.pilText,
                {color: active === 'both' ? 'white' : '#7F90AB'},
              ]}>
              Both
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onLayout={event => handleLayout('GoldBtn')(event)}
            style={[
              styles.pils,
              {backgroundColor: active === 'gold' ? '#7F90AB' : 'white'},
            ]}
            onPress={() => handleFilterToggle('gold')}>
            <Text
              style={[
                styles.pilText,
                {color: active === 'gold' ? 'white' : '#7F90AB'},
              ]}>
              Gold
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onLayout={event => handleLayout('SilverBtn')(event)}
            style={[
              styles.pils,
              {backgroundColor: active === 'silver' ? '#7F90AB' : 'white'},
            ]}
            onPress={() => handleFilterToggle('silver')}>
            <Text
              style={[
                styles.pilText,
                {color: active === 'silver' ? 'white' : '#7F90AB'},
              ]}>
              Silver
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.totalCardCont}
          onLayout={event => handleLayout('ToatalCard')(event)}>
          <TotalCard />
        </View>
      </View>
      <ScrollView>
        <View
          style={styles.cardCont}
          onLayout={event => handleLayout('CardCont')(event)}>
          {filteredCards().map((card, index) => (
            <Card
              key={index}
              card={card}
              onDelete={() => handleDeleteCard(card)}
              onEdit={() => handleEditCard(index)}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.add}
        onPress={toggleModal}
        onLayout={event => handleLayout('AddBtn')(event)}>
        <Image source={add} />
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  prof: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  profText: {
    color: '#4F617D',
    fontFamily: 'SF Pro',
    fontSize: 20,
    marginLeft: 7,
  },
  main: {
    paddingHorizontal: 42,
  },
  searchBox: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    columnGap: 10,
    borderRadius: 5,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 20,
    columnGap: 7,
  },
  pils: {
    borderRadius: 10,
    width: 57,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#7F90AB',
    elevation: 10,
  },
  pilText: {
    fontFamily: 'SF Pro',
  },
  totalCardCont: {
    marginTop: 25,
    borderWidth: 0.5,
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#E0E4EB',
    paddingHorizontal: 5,
  },
  cardCont: {
    marginTop: 25,
    justifyContent: 'center',
    backgroundColor: '#fefefe',
    paddingHorizontal: 7,
    marginHorizontal: 24,
    rowGap: 10,
    paddingVertical: 10,
    elevation: 10,
    flex: 1,
  },
  add: {
    position: 'absolute',
    bottom: 100,
    zIndex: 10,
    right: 20,
  },
});
