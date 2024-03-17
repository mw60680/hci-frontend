interface User {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  export const applyFilters = (originalData: User[], filterSelectData: string, searchData: string): User[] => {
    return originalData.filter((e) => {
      if (filterSelectData === '0') {
        return searchData.length > 0 ? e.title.slice(0, searchData.length) === searchData : true;
      } else {
        return (
          e.title.slice(0, searchData.length) === searchData && String(e.userId) === filterSelectData
        );
      }
    });
  };
  