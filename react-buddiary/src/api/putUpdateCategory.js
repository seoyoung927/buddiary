export const putUpdateCategory = async (id,title) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/category/update';
  
    try {
      const response = await fetch(`${API_URL}${path}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({"title":title})
      });
      if (!response.ok) throw new Error('bad server condition');
      return response.json();
    } catch (e) {
      console.error('putUpdateCategory Error: ', e.message);
      return false;
    }
};
