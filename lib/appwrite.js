import "react-native-url-polyfill/auto";

import { Client } from "react-native-appwrite";
import { Account } from "react-native-appwrite";
import { Avatars } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("6af425cf002e0585ab27")
  .setPlatform("com.laminhein.bookapp");

export const account = new Account(client);
export const avatar = new Avatars(client);
