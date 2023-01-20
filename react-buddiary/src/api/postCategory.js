export const postCategory = async (category) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/v1/api/category/save';
    
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({"title":category})
        });
        if (!response.ok) throw new Error('bad server condition');
      return true;
    } catch (e) {
      console.error('postCategory Error: ', e.message);
      return false;
    }
};
