export const deleteCategory = async (id) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/category/delete';
  
    try {
      const response = await fetch(`${API_URL}${path}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error('bad server condition');
      return response.json();
    } catch (e) {
      console.error('deleteCategory Error: ', e.message);
      return false;
    }
};

