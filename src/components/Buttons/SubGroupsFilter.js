import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

const SubGroupsFilter = () => {
  const [value, setValue] = React.useState('');

  return (
    <SegmentedButtons
      style={{ width: '100%' }}
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: 'all',
          label: 'all',
        },
        {
          value: 'joined',
          label: 'joined',
        },
        { value: 'unjoined', label: 'unjoined' },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SubGroupsFilter;
