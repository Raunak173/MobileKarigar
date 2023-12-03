import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import home from '../assets/images/home.png';
import boxes from '../assets/images/box.png';
import books from '../assets/images/books.png';
import more from '../assets/images/more.png';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={home} />
        <Text style={styles.footText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={boxes} />
        <Text style={styles.footText}>Boxes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={books} />
        <Text style={styles.footText}>Books</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={more} />
        <Text style={styles.footText}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 33,
    paddingVertical: 20,
    columnGap: 60,
    bottom: 0,
    alignItems: 'center',
    elevation: 10,
    width: '100%',
  },
  footText: {
    color: '#979696',
    fontfamily: 'SF Pro',
    fontSize: 14,
  },
});
