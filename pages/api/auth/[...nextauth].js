import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma';

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      session.user.username = user.username;
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
