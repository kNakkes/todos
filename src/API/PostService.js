import axios from "axios";
import BASE_URL from "./BaseUrl";

export default class PostService {
  static async getAll() {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
