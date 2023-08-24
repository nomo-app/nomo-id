# Sample App Frontend

This is a sample app frontend for the [sample app backend](https://g.fastprj.tech/nomo/nomo-id/-/tree/master/sample-app-backend). It is a [Next.js](https://nextjs.org/) app that uses [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

1. First, install the dependencies:

    ```bash
    npm install
    ```
  
2. Change the server address in the [useSocket.jsx](https://g.fastprj.tech/nomo/nomo-id/-/blob/master/sample-app-frontend/hooks/useSocket.jsx) file to the address of the [sample app backend](https://g.fastprj.tech/nomo/nomo-id/-/tree/master/sample-app-backend).

    ```javascript
    // currently hardcoded
    const server_address = '172.16.250.209:8095/backend';
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
