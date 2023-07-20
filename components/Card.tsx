import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import edit from '../assets/images/edit.png';
import del from '../assets/images/delete.png';
import phone from '../assets/images/phone.png';

const Card = ({card, onDelete, onEdit}) => {
  const handleDelete = () => {
    onDelete(card);
  };
  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
        <Text style={styles.headText}>{card.name}</Text>
        <TouchableOpacity>
          <Image source={phone} />
        </TouchableOpacity>
      </View>
      <View style={styles.btnCont}>
        <TouchableOpacity
          style={[styles.btns, {backgroundColor: '#494948'}]}
          onPress={onEdit}>
          <Image source={edit} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btns, {backgroundColor: '#870f0f'}]}
          onPress={() => handleDelete()}>
          <Image source={del} />
        </TouchableOpacity>
      </View>
      <View style={styles.subHeads}>
        <View>
          <Text style={styles.subText}>Silver</Text>
          <Text
            style={[
              styles.vals,
              {color: card.silver > 0 ? '#72A701' : '#C54242'},
            ]}>
            {card.silver > 0 ? '+' : ''}
            {card.silver.toFixed(2)} Gms
          </Text>
        </View>
        <View>
          <Text style={styles.subText}>Gold</Text>
          <Text
            style={[
              styles.vals,
              {color: card.gold > 0 ? '#72A701' : '#C54242'},
            ]}>
            {card.gold > 0 ? '+' : ''}
            {card.gold.toFixed(2)} Gms
          </Text>
        </View>
        <View>
          <Text style={styles.subText}>Amount</Text>
          <Text
            style={[
              styles.vals,
              {color: card.amt > 0 ? '#72A701' : '#C54242'},
            ]}>
            {card.amt > 0 ? '+' : ''}
            {card.amt.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: 'INR',
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 80,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 10,
  },
  headText: {
    color: '#4F617D',
    fontFamily: 'SF Pro',
    fontSize: 13,
  },
  subHeads: {
    flexDirection: 'row',
    marginTop: 10,
    columnGap: 25,
  },
  subText: {
    color: '#484848',
    fontFamily: 'SF Pro',
    fontSize: 10,
  },
  vals: {
    fontFamily: 'SF Pro',
    fontSize: 10,
  },
  btns: {
    width: 18,
    height: 18,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCont: {
    position: 'absolute',
    right: 12,
    rowGap: 10,
    top: 20,
  },
});
