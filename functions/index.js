const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const firestore = admin.firestore();


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

