import axios from "axios";

export default axios.create({
  baseURL: "https://api.pokemontcg.io/v2",
  params: {
    key: "34dde953-df1e-48c2-8d91-bd8234aa9011",
  },
});
