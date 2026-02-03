import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from './supabase';

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
    async signIn({ user, account }) {
      console.log('SIGNIN CALLBACK:', { user: user?.email });
      
      // Sync user to Supabase
      if (user?.email && account?.providerAccountId) {
        try {
          // Check if user exists by email
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('id, email')
            .eq('email', user.email)
            .single();

          if (fetchError && fetchError.code !== 'PGRST116') {
            // PGRST116 is "not found" error, which is expected for new users
            console.error('Error checking user in Supabase:', fetchError);
          } else if (existingUser) {
            // User exists, log it
            console.log('Existing user signed in:', existingUser.email);
          } else {
            // User doesn't exist, insert new user
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert({
                email: user.email,
                name: user.name || null,
                google_id: account.providerAccountId,
                role: 'client',
              })
              .select()
              .single();

            if (insertError) {
              console.error('Error inserting user into Supabase:', insertError);
            } else {
              console.log('New user created in Supabase:', newUser.email);
            }
          }
        } catch (error) {
          // Catch any unexpected errors to prevent login failure
          console.error('Unexpected error syncing user to Supabase:', error);
        }
      }

      // Always return true so login succeeds even if Supabase sync fails
      return true;
    },
    async jwt({ token, user }) {
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
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
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

