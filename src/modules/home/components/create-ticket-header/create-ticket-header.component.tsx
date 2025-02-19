import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export const CreateTicketHeader = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Create Ticket</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
