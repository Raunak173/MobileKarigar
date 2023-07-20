import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const tc = {
  silver: -14500,
  gold: 133.5,
  amt: 676000,
};

const TotalCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.headText}>Totals</Text>
      <View style={styles.subHeads}>
        <View>
          <Text style={styles.subText}>Silver</Text>
          <Text
            style={[
              styles.vals,
              {color: tc.silver > 0 ? '#72A701' : '#C54242'},
            ]}>
            {tc.silver > 0 ? '+' : ''}
            {tc.silver.toFixed(2)} Gms
          </Text>
        </View>
        <View>
          <Text style={styles.subText}>Gold</Text>
          <Text
            style={[styles.vals, {color: tc.gold > 0 ? '#72A701' : '#C54242'}]}>
            {tc.gold > 0 ? '+' : ''}
            {tc.gold.toFixed(2)} Gms
          </Text>
        </View>
        <View>
          <Text style={styles.subText}>Amount</Text>
          <Text
            style={[styles.vals, {color: tc.amt > 0 ? '#72A701' : '#C54242'}]}>
            {tc.amt > 0 ? '+' : ''}
            {tc.amt.toLocaleString('en-IN', {
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

export default TotalCard;

const styles = StyleSheet.create({
  card: {
    height: 90,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  headText: {
    color: '#4F617D',
    fontFamily: 'SF Pro',
    fontSize: 16,
  },
  subHeads: {
    flexDirection: 'row',
    marginTop: 12,
    columnGap: 12,
  },
  subText: {
    color: '#484848',
    fontFamily: 'SF Pro',
    fontSize: 13,
  },
  vals: {
    fontFamily: 'SF Pro',
    fontSize: 13,
  },
});
