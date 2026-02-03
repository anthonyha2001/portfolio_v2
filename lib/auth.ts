import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('=== SIGN IN CALLBACK ===');
      console.log('User:', user);
      console.log('Account:', account);
      console.log('Profile:', profile);
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('=== JWT CALLBACK ===');
      console.log('Token:', token);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('=== SESSION CALLBACK ===');
      console.log('Session:', session);
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('=== REDIRECT CALLBACK ===');
      console.log('URL:', url);
      console.log('Base URL:', baseUrl);
      return baseUrl + '/portal';
    },
  },
};

