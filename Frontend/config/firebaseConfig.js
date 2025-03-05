import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "foodapp-a5410.firebaseapp.com",
  databaseURL: "https://foodapp-a5410-default-rtdb.firebaseio.com",
  projectId: "foodapp-a5410",
  storageBucket: "foodapp-a5410.appspot.com",
  messagingSenderId: "912963440164",
  appId: "1:912963440164:web:ede18a07249118b80fd2b1"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);