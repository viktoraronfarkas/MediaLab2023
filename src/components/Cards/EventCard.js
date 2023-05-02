import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 5,
  },
});

export default function EventCard({ title, subTitle, source }) {
  return (
    <Card style={styles.container}>
      <Card.Cover
        source={source}
        resizeMode="cover"
        style={{ borderRadius: 10 }}
      />
      <Badge
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        Joining: 32
      </Badge>

      <Card.Title
        titleStyle={{
          padding: 0,
          marginBottom: 0,
          lineHeight: 24,
          minHeight: 24,
          marginLeft: 5,
          fontWeight: 'bold',
          fontSize: 16,
        }}
        subtitleStyle={{ marginLeft: 5, fontWeight: '600', fontSize: 14 }}
        title={title}
        subtitle={subTitle}
      />
    </Card>
  );
}
