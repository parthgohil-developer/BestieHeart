export const login = async (username, dob, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic mock validation
      if (!username || !dob || !password) {
        return reject(new Error('All fields are required.'));
      }

      // Calculate age or just log the DOB to show it's working
      console.log('Login attempt with DOB:', dob);
      const day = String(dob.getDate()).padStart(2, '0');
      const month = String(dob.getMonth() + 1).padStart(2, '0');
      const year = dob.getFullYear();
      const dobString = `${day}-${month}-${year}`;

      console.log(`Login attempt: Username=${username}, Password=${password}, DOB=${dobString}`);

      // Strict validation for exact credentials
      if (username === 'Admin' && password === 'Admin123' && dobString === '09-02-2004') {
        resolve({
          user: {
            username,
            dob: dobString,
            token: 'mock-jwt-token-12345'
          },
          message: 'Login successful'
        });
      } else {
        reject(new Error('Invalid credentials. Please check your Username, Password, or DOB.'));
      }
    }, 1000); // 1 second artificial delay
  });
};

export const specialFormLogin = async (username, dob, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !dob || !password) {
        return reject(new Error('All fields are required.'));
      }

      const day = String(dob.getDate()).padStart(2, '0');
      const month = String(dob.getMonth() + 1).padStart(2, '0');
      const year = dob.getFullYear();
      const dobString = `${day}-${month}-${year}`;

      // Different strict credentials for Form Login
      if (username === 'Parth2407' && password === 'Parth@123' && dobString === '24-07-2004') {
        resolve({
          user: {
            username,
            dob: dobString,
            token: 'mock-form-token'
          },
          message: 'Form Login successful'
        });
      } else {
        reject(new Error('Invalid form credentials. Please check your Username, Password, or DOB.'));
      }
    }, 1000);
  });
};
