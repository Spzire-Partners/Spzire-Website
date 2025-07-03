const firebaseConfig = {
    apiKey: "AIzaSyAWEQzRKkec4PJohT4pyXlmyJP-dBGnFKs",
    authDomain: "spzire-waitlist.firebaseapp.com",
    projectId: "spzire-waitlist",
    storageBucket: "spzire-waitlist.firebasestorage.app",
    messagingSenderId: "1020922317729",
    appId: "1:1020922317729:web:af6b0b58a8a14f9c8f59e0",
    measurementId: "G-EJ4WPXQ3X7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Waitlist form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.waitlist-form');
    const messageDiv = document.getElementById('waitlist-message');
  
    if (!form || !messageDiv) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = form.querySelector('input[name="email"]').value;
  
      try {
        await db.collection('waitlist').add({
          email,
          joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
  
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'Thanks for joining the waitlist!';
  
        form.reset();
      } catch (error) {
        console.error('Error adding to waitlist:', error);
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Sorry, something went wrong. Please try again.';
      }
    });
  });
  