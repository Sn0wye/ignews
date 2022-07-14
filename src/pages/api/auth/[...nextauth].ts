import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { db } from '../../../services/firebase';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user: { email } }) {
      try {
        const duplicatesQuery = query(
          collection(db, 'users'),
          where('email', '==', email)
        );
        const querySnapshot = await getDocs(duplicatesQuery);
        const [data] = querySnapshot.docs.map((doc) => doc.data());

        if (!data) {
          await addDoc(collection(db, 'users'), {
            email,
            ts: new Date(),
            id: nanoid(),
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
