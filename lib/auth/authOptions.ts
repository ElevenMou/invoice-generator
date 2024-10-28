import { Profile, Session, NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/mongodb/database";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        await connectToDatabase();
        const dbuser = await User.findOne({ email: token.email });
        if (user) {
          token.id = dbuser._id.toString();
          token.username = dbuser.username;
          token.image = dbuser.image;
          token.email = dbuser.email;
          token.name = dbuser.name;
        }
      } catch (error) {
        console.error(error);
      } finally {
        return token;
      }
    },
    async session({ token, session }) {
      try {
        if (token) {
          session.user.id = token.id;
          session.user.username = token.username;
          session.user.image = token.picture;
          session.user.email = token.email;
          session.user.name = token.name;
        }
      } catch (error) {
        console.error(error);
      } finally {
        return session;
      }
    },
    async signIn({ profile }: { profile?: Profile | undefined }) {
      try {
        await connectToDatabase();

        // Check if user exists in database
        const user = await User.findOne({
          email: profile?.email?.toLowerCase(),
        });
        // If user does not exist, create user in database
        if (!user) {
          const newUser = new User({
            email: profile?.email?.toLowerCase() ?? "",
            username: profile?.email?.split("@")[0].toLowerCase(),
            name: profile?.name ?? "",
            image: profile?.image ?? "",
          });
          await newUser.save();
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

export default authOptions;
