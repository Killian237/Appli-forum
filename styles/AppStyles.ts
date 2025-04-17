import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    navbar: {
      height: 60,
      backgroundColor: '#2c3e50', // Couleur sombre pour le fond
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    navbarTitle: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
    },
    messageCard: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    messageTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
    },
  });
  
  export default styles;
  