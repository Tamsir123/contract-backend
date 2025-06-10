const axios = require('axios');

// Test user registration with English values
const testRegistration = async () => {
  try {
    const response = await axios.post('http://localhost:4600/api/inscription', {
      name: 'Jean Dupont',
      email: 'jean.dupont@test.com',
      password: 'password123',
      birthDate: '1990-05-15',
      gender: 'male',
      userType: 'professional',
      preferences: ['Clauses financières', 'Données personnelles'],
      acceptTerms: true
    });
    
    console.log('✅ Registration successful:', response.data);
  } catch (error) {
    console.error('❌ Registration failed:', error.response?.data || error.message);
  }
};

testRegistration();
