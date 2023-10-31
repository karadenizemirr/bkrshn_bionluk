import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: "text", placeholder: "Email" },
                password: { label: 'Password', type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                try{
                    const login = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    })

                    const {ok,user} = await login.json()

                    if (ok) return user
                    return null
                }catch(err){
                    console.log(err)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60
    },
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            session.jwt = token.jwt
            session.user.id = token.id
            session.user.role = token.role
            return Promise.resolve(session)
        },

        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id,
                token.role = user.role
            }

            return Promise.resolve(token)
        }
    }
}

export default NextAuth(authOption)