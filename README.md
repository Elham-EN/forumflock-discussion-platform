# 🌐 ForumFlock (Discussion Platform)

Welcome to **ForumFlock**, an energetic and goal-oriented web application I've developed with the aim of enhancing academic collaboration and fostering community among students. It serves as a specialized digital platform where students can delve deep into their study materials, engage with peers on course-related topics, exchange educational insights, and broaden their understanding through meaningful interactions.

## 🚀 Purpose and Goal:

ForumFlock is a platform I created to transform how students engage in academic discussions. Its goal is to break down barriers, foster community, and improve the overall learning experience.

Today, students often struggle to find suitable spaces for focused academic exchanges. Traditional forums can be overwhelming and off-topic, and it's easy for students to feel isolated, especially when studying remotely.

ForumFlock solves these problems. It's a dedicated space where students can join or create communities based on their interests. Features like topic posting, a voting system, and real-time chat keep discussions relevant, engaging, and interactive. Smart notifications ensure no one misses out on the conversation.

In short, ForumFlock is about using technology to make academic discussions easier, more accessible, and more productive for students everywhere.

## ✅ Features and Functionalities:

The ForumFlock Platform provides users with a variety of interactive features and functionalities. Upon creating an account and successful authentication, users can:

1. Join and Create Communities: Users can join existing communities based on their academic interests, or create new communities to engage like-minded individuals.
2. Voting System: The platform incorporates a voting system that allows users to upvote or downvote posts, giving feedback and helping highlight the most valuable content.
3. Topic Posting and Discussion: Users can post topics within their communities and engage in academic discussions. Other members can then comment on these posts, promoting interactive learning.
4. Search Capabilities: The platform offers robust search functionality, enabling users to locate specific communities or users easily.
5. Notifications: Users receive notifications about updates or activity within their communities, keeping them engaged and informed.
6. Real-Time Chat: Users can communicate with others through a real-time chat feature, promoting direct interaction and collaboration.

# :technologist: Technology Choices

1. **React.js & Next.js:** I chose React.js because of its component-based architecture, which allows for a smooth development process and easy testing. It also enables the creation of interactive UIs with ease. Next.js, a React framework, was used for its server-side rendering capability, providing SEO advantages and improved performance.
2. **TypeScript:** TypeScript was my choice for its static typing features. It helps catch errors during development, enforces good coding practices, and enhances code readability and maintainability.
3. **Chakra UI:** Chakra UI provides a simple, modular, and accessible component library. Its wide array of components and inbuilt accessibility simplify the process of building aesthetically pleasing interfaces without compromising user experience.
4. **Recoil State Management:** Recoil was decided for its efficiency in managing global state in a React application. Its atomic model of state management allows components to subscribe only to the data they need, improving performance.
5. **Firebase Services:** Firebase's wide range of services such as Firestore for a NoSQL cloud database, Auth for authentication, Cloud Functions for backend logic, Storage for storing user-generated content, and Firebase Cloud Messaging for notifications allowed me to build a feature-rich application without managing complex backend infrastructure. Firebase also aids in rapid development and deployment, with robust security and scalability.

# ⬇️ To run the application on localhost

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

Localhost
[http://localhost:3000/](http://localhost:3000/)
