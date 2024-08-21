import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user"; // Ensure this path and capitalization are correct
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      await connectToDB(); // Ensure the database connection is established

      if (session?.user?.email) {
        try {
          const sessionUser = await User.findOne({ email: session.user.email });

          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
          }
        } catch (error) {
          console.error("Error retrieving user from database:", error);
        }
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB(); // Ensure the database connection is established

        if (profile?.email) {
          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(/\s+/g, "").toLowerCase(),
              image: profile.picture,
            });
          }
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
