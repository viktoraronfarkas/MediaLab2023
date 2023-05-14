import * as React from 'react';
import { SegmentedButtons } from 'react-native-paper';

export default function SubGroupsFilter() {
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
}
