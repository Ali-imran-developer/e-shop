import { apiClient } from "../config/api.config";

interface News {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

class NewsController {
  static getNews(): Promise<News[]> {
    return new Promise((resolve, reject) => {
      apiClient
        .get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ef2f2593b805491e94fc83a76c4290ae')
        .then((res) => {
          if (res?.status === 200 && Array.isArray(res?.data?.articles)) {
            resolve(res.data.articles);
          } else {
            reject(new Error('Invalid response format'));
          }
        })
        .catch((error) => {
          reject(error?.response?.data || error.message);
        });
    });
  }
}

export default NewsController;