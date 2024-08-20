import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Modify the session object here, if needed
      return session;
    },
    async signIn({ profile }) {
      // Handle sign-in logic here, return true or false to allow/disallow the sign-in
      try {
      } catch (error) {}
    },
  },
});

export { handler as GET, handler as POST };
