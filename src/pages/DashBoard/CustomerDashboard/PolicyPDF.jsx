import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  }
});

const PolicyPDF = ({ user, policy }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Policy Details</Text>
      <View style={styles.section}>
        <Text>User Name: {user.displayName}</Text>
        <Text>Email: {user.email}</Text>
      </View>
      <View style={styles.section}>
        <Text>Policy Name: {policy.name}</Text>
        <Text>Coverage: ৳{policy.coverage}</Text>
        <Text>Duration: {policy.duration} years</Text>
        <Text>Annual Premium: ৳{policy.annualPremium}</Text>
        <Text>Status: {policy.status}</Text>
      </View>
    </Page>
  </Document>
);

export default PolicyPDF;
