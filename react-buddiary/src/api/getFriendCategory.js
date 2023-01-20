export const getFriendCategory = async (id) => {
    const API_URL=process.env.REACT_APP_API_URL;
    const path='/v1/api/friend/category';
    
    try {
        const response = await fetch(`${API_URL}${path}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        });
        if (!response.ok) throw new Error('bad server condition');
        return response.json();
    } catch (e) {
      console.error('getFriendCategory: ', e.message);
      return undefined;
    }
};
