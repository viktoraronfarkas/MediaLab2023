import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

function LeftContent({ iconSource }) {
  return (
    <Image
      style={{
        width: 55,
        height: 55,
        borderRadius: 35,
      }}
      source={iconSource}
    />
  );
}

export default function PostCard({
  title,
  subTitle,
  buttonTxt,
  content,
  source,
  iconSource,
}) {
  return (
    <Card style={styles.container}>
      <Card.Title
        titleStyle={{
          padding: 0,
          marginBottom: 0,
          lineHeight: 24,
          minHeight: 24,
          marginLeft: 10,
          fontWeight: 'bold',
          fontSize: 18,
        }}
        subtitleStyle={{ marginLeft: 10, fontWeight: '500', fontSize: 15 }}
        title={title}
        subtitle={subTitle}
        left={() => LeftContent({ iconSource })}
      />
      <Card.Cover
        source={source}
        resizeMode="cover"
        style={{ borderRadius: 0 }}
      />
      <Card.Content>
        <Text
          style={{
            marginTop: content && content.length ? 15 : 0,
            marginBottom: content && content.length > 0 ? 15 : 0,
            fontSize: 20,
            lineHeight: 25,
          }}
          variant="bodyMedium"
        >
          {content}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button>{buttonTxt}</Button>
      </Card.Actions>
    </Card>
  );
}
