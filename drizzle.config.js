/** @type {import ("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://interview_owner:Sni9KwvxEQ6c@ep-polished-lab-a5ev1nux.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require'
    }
}