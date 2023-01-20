export const getTodoByDate = async (year,month,date) => {
    const API_URL=process.env.REACT_APP_API_URL;
    const path='/v1/api/todo';
    const month_ = ('00'+month).slice(-2);
    const date_ = ('00'+date).slice(-2);

    try {
        const response = await fetch(`${API_URL}${path}`+`/${year}-${month_}-${date_}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        });
        if (!response.ok) throw new Error('bad server condition');
        return response.json();
    } catch (e) {
      console.error('getTodoByDate: ', e.message);
      return false;
    }
};
