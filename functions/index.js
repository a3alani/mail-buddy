const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const firestore = admin.firestore();
const database = admin.database();

// Retrieve the response object from the AI model
const aiResponse = {
  taskTitle: "Call Mom",
  taskDueDate: "2023-07-30",
  taskDescription: "Mom emailed you to call her",
  taskSuggestion: "Say hi and ask about her day",
  taskPriority: "High",
  status: "Pending",
};


exports.storeAIResponse = functions.https.onRequest(async (req, res) => {
  try {
    const docRef = await firestore.collection("email-data").add(aiResponse);
    res.status(200).send(`Document created with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).send("Error creating document");
  }
});

exports.retrieveAllData = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await database.ref().once("value");
    const data = snapshot.val();

    res.set("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.set("Access-Control-Allow-Methods", "GET"); // Allow GET requests
    res.set("Access-Control-Allow-Headers", "Content-Type"); // Allow requests with Content-Type header

    res.status(200).json(data);                 // Send data
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data");
  }
});


