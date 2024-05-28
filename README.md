This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the Git repository:

```bash
git clone <Repository URL>
```

Then, navigate into the repository:

```bash
cd <Repository Name>
```

Install all necessary dependencies:

```bash
npm install
```

Create a .env file:

```bash
touch .env
```

Now, you can add any necessary environment variables to the .env file.
Finally, run the app:

```bash
npm run dev
```

## Prisma Setup

If you make changes to your schema in your database run the following commands
`prisma db pull`
then generate the prisma client
`prisma generate`
