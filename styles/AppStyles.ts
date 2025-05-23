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
  container_forum: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  userScroll: {
    marginVertical: 10,
  },
  userButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  userSelected: {
    backgroundColor: "#6200ee",
  },
  userButtonText: {
    color: "#333",
  },
  addUserRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#6200ee",
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
  },
  messagesContainer: {
    flex: 1,
    marginVertical: 10,
  },
  messageBox: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  messageSender: {
    fontWeight: "bold",
  },
  messageImage: {
    width: "100%",
    height: 150,
    marginTop: 8,
    borderRadius: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "white",
  },

  /* Register */
  registerContainer: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  registerTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  registerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  /* Register */

  /* Nom du user */
  userInfoContainer: {
    position: 'absolute', // Position absolue pour placer en haut
    top: 10, // Distance depuis le haut de l'écran
    right: 10, // Distance depuis la droite de l'écran
    flexDirection: 'row', // Affichage en ligne
    alignItems: 'center', // Alignement vertical
    zIndex: 10, // Assurez-vous que le conteneur est au-dessus des autres éléments
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, // Espacement entre le nom et le bouton
  },
  /* Nom du user */

  /* bouton retour */
  backButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    margin: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
