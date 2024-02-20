const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../path/to/your/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gym-management-system-25648-default-rtdb.firebaseio.com" // Use your database URL
});

const db = admin.database();

const userController = {
  viewDetails: async (req, res) => {
    try {
      const userId = req.params.id; // Assuming the user ID is passed as a parameter
      const snapshot = await db.ref(`/users/${userId}`).once('value');
      const userData = snapshot.val();
      if (!userData) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(userData);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  searchRecords: async (req, res) => {
    try {
      const query = req.query.query; // Assuming the search query is passed as a query parameter
      // Perform search logic (e.g., search user records in the database)
      // Example:
      const snapshot = await db.ref('/users').orderByChild('name').equalTo(query).once('value');
      const searchResults = [];
      snapshot.forEach((childSnapshot) => {
        searchResults.push(childSnapshot.val());
      });
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Other user controller methods...
};

module.exports = userController;
