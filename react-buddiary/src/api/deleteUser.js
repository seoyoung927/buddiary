export const deleteUser = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/user/delete';
  
    try {
      const response = await fetch(`${API_URL}${path}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error('bad server condition');
      return response.json();
    } catch (e) {
      console.error('deleteUser Error: ', e.message);
      return false;
    }
};
