# ForumFlock (Discussion Platform)

I present **ForumFlock**, a vibrant, purpose-driven web application designed to foster academic collaboration and build community among students. This platform offers a unique avenue for students to discuss subject-specific topics, interact with peers, exchange academic insights, and engage in healthy intellectual debates.

## Purpose and Goal:

The primary goal of this platform is to enhance the overall learning experience by bridging the gap between students and the educational resources they need. It also aims to foster a sense of community, giving students a platform where they can actively participate in relevant discussions. It enables students to gain deeper insights into their respective courses, share resources, exchange ideas, and learn collaboratively. Moreover, the platform encourages the promotion of on-campus activities, fostering a more connected university life.

[Lastly, for non-technical evaluators, like HR or a recruiter, the text illustrates the problem-solving capabilities, communication skills, and an understanding of user needs to be showcased through this project.]

## Features and Functionalities:

The University Discussion Platform provides users with a variety of interactive features and functionalities. Upon creating an account and successful authentication, users can:

1. Join and Create Communities: Users can join existing communities based on their academic interests, or create new communities to engage like-minded individuals.
2. Voting System: The platform incorporates a voting system that allows users to upvote or downvote posts, giving feedback and helping highlight the most valuable content.
3. Topic Posting and Discussion: Users can post topics within their communities and engage in academic discussions. Other members can then comment on these posts, promoting interactive learning.
4. Search Capabilities: The platform offers robust search functionality, enabling users to locate specific communities or users easily.
5. Notifications: Users receive notifications about updates or activity within their communities, keeping them engaged and informed.
6. Real-Time Chat: Users can communicate with others through a real-time chat feature, promoting direct interaction and collaboration.

**Technology Choices:**

1. **React.js & Next.js:** I chose React.js because of its component-based architecture, which allows for a smooth development process and easy testing. It also enables the creation of interactive UIs with ease. Next.js, a React framework, was used for its server-side rendering capability, providing SEO advantages and improved performance.
2. **TypeScript:** TypeScript was my choice for its static typing features. It helps catch errors during development, enforces good coding practices, and enhances code readability and maintainability.
3. **Chakra UI:** Chakra UI provides a simple, modular, and accessible component library. Its wide array of components and inbuilt accessibility simplify the process of building aesthetically pleasing interfaces without compromising user experience.
4. **Recoil State Management:** Recoil was decided for its efficiency in managing global state in a React application. Its atomic model of state management allows components to subscribe only to the data they need, improving performance.
5. **Firebase Services:** Firebase's wide range of services such as Firestore for a NoSQL cloud database, Auth for authentication, Cloud Functions for backend logic, Storage for storing user-generated content, and Firebase Cloud Messaging for notifications allowed me to build a feature-rich application without managing complex backend infrastructure. Firebase also aids in rapid development and deployment, with robust security and scalability.

# To run the application on localhost

### Prerequisties

- Node.js v18 installed
- NPM v8.19.4

Git clone:

```
git@github.com:Elham-EN/forumflock-discussion-platform.git
```

Install its depedencies in its root folder:

```
npm install
```

Create .env.local and store your firebase credentials here

```
.env.local
```

To run the Next.js Server:

```
npm run dev
```

[http://localhost:3000/]
