import "react-native-url-polyfill/auto";

import { Client } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("6af425cf002e0585ab27")
  .setPlatform("com.laminhein.bookapp");

export { client };
