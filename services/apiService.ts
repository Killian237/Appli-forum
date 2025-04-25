export const fetchMessages = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err: any) {
      throw new Error(`Erreur réseau: ${err.message}`);
    }
  };
  