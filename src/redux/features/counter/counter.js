import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <View>
      <div>
        {/* <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button> */}
        <Pressable onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </Pressable>

        <Text>{count}</Text>

        <Pressable onPress={() => dispatch(decrement())}>
          <Text>Decrement</Text>
        </Pressable>
        {/* <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button> */}
      </div>
    </View>
  );
}
