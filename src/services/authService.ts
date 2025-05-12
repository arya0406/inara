// Mock authentication service
export const login = async (email: string, password: string) => {
  // Simulating API call with basic validation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length >= 6) {
        resolve({
          id: '1',
          email,
          name: 'Test User'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const logout = async () => {
  // Simulating API call
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export const register = async (email: string, password: string, name: string) => {
  // Simulating API call with password validation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length >= 6) {
        resolve({
          id: '1',
          email,
          name
        });
      } else {
        reject(new Error('Password must be at least 6 characters long'));
      }
    }, 1000);
  });
};
