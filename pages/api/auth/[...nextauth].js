import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "844640573338-sapsnsiuocmal1gll5a4ds4sel6rlv4f.apps.googleusercontent.com",
            clientSecret: "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",
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        })
    ],
    jwt: {
        encryption: true
    },
    secret: "secret token",
    //Callback here
    callbacks: {
        async jwt(token, account) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            return token;
        },
        redirect: async (url, _baseUrl) => {
            if (url === '/user') {
                return Promise.resolve('/')
            }
            return Promise.resolve('/')
        }
    }
});