import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from './supabase';
import type { Database } from '../types/database';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      
      try {
        // Check if user exists
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.email)
          .maybeSingle();
        
        if (selectError) {
          console.error('Supabase select error:', selectError);
          return true; // Still allow sign in
        }
        
        if (!existingUser) {
          // Create new user
          const newUser: Database['public']['Tables']['users']['Insert'] = {
            email: user.email,
            name: user.name || null,
            google_id: account?.providerAccountId || null,
            role: 'client',
          };
          // Type assertion needed due to Supabase type inference issue
          const { error: insertError } = await (supabase
            .from('users') as unknown as {
              insert: (data: Database['public']['Tables']['users']['Insert']) => Promise<{ error: { message?: string; code?: string } | null }>;
            })
            .insert(newUser);
          
          if (insertError) {
            console.error('Supabase insert error:', insertError);
          } else {
            console.log('New user created:', user.email);
          }
        } else {
          console.log('Existing user signed in:', user.email);
        }
      } catch (error) {
        console.error('Auth sync error:', error);
      }
      
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/portal`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};
