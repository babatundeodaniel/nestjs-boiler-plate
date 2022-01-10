import axios from 'axios';
import fetch from 'node-fetch';

export class ExternalApiCalls {
  async postData(url: string, dataToPost: unknown): Promise<any> {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await axios.post(url, dataToPost, axiosConfig);
    const result = await response.data;
    console.log('response from Post Data function', result);

    return result;
  }

  async fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Error occured in Fetch data service call');
    }
  }
}
