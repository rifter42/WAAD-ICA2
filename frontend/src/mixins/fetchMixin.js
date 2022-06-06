//  Global fetch function to use in various components with some default logic
export default {
  methods: {
    // GET is the default method
    async runFetch(url, requestOptions = { method: 'GET' }) {
      // Generic settings
      const settings = {
        method: requestOptions.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
      // if method is POST, add body to request settings
      if (requestOptions.method === 'POST') {
        settings.body = JSON.stringify(requestOptions.body);
      }
      try {
        const response = await fetch(url, settings);
        // Return end JSON to not handle raw responses in each component
        const data = await response.json();
        if (response.ok) {
          return [null, data];
        }
        return [data.err, null];
      } catch (e) {
        alert(e);
      }
      return [null, null];
    },
  },
};
