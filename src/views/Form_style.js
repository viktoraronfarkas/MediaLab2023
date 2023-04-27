import { StyleSheet } from 'react-native';

const stylesLoginReg = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '50%',
    marginBottom: 10,
  },
  button: {
    width: '30%',
    marginTop: 40,
  },
  error: {
    color: 'red',
    marginTop: 30,
    marginBottom: 15,
  },
});

export default stylesLoginReg;
