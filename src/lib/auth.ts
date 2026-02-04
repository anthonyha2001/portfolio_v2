import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getSupabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
        // Only sync to Supabase if it's configured
        if (!supabaseUrl || !supabaseAnonKey) {
          console.log('Supabase not configured, skipping user sync');
          return true;
        }
        
        const supabase = getSupabase();
        
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
        // If Supabase is not configured, still allow login
        console.error('Auth sync error (continuing anyway):', error);
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
