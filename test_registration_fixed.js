const axios = require('axios');

const testRegistration = async () => {
  try {
    const registrationData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      birth_date: "1990-01-01",
      gender: "homme",
      user_type: "particulier",
      accept_terms: true,
      preferences: ["Données personnelles", "Clauses financières"]
    };

    console.log("Sending registration data:", registrationData);

    const response = await axios.post("http://localhost:4600/api/inscription", registrationData, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    console.log("Registration successful:", response.data);
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
  }
};

testRegistration();
