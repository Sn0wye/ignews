import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '../../../services/prisma';

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
        const userExists = await prisma.user.findUnique({
          where: {
            email: email?.toString(),
          },
        });

        if (!userExists) {
          await prisma.user.create({
            data: {
              email: email!,
            },
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
