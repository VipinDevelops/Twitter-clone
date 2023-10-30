<p align="center">
  <img src="https://logo.com/image-cdn/images/kts928pd/production/08207a1a4c3383abed17d2995786c44959ceaa91-1140x620.png?w=1080&q=72" alt="Twitter Clone Logo">
  ![image](https://github.com/VipinDevelops/twitter-clone/assets/99081689/05e2a3ec-e8a5-4100-8a02-ecf581881faf)

</p>

# Twitter Clone

A full-featured Twitter clone built with Next.js, Prisma, and PostgreSQL. This project offers a range of functionalities that replicate the core features of Twitter, including liking tweets, following users, replying to tweets, and receiving notifications. Users can also personalize their profiles with a bio, profile picture, and banner.

## Features

- **User Authentication**: Secure user registration and login functionality.
- **News Feed**: Scroll through a timeline of tweets from users you follow.
- **Tweet Creation**: Compose and post your tweets with optional media attachments.
- **Tweet Interaction**: Like and reply to tweets, view individual tweet threads.
- **User Following**: Follow other users to see their tweets in your timeline.
- **Profile Customization**: Upload a profile picture, banner image, and set a bio.
- **Notifications**: Get real-time notifications for likes, replies, and new followers.
- **Explore Page**: Discover new users and popular tweets.

## Demo

For a live demonstration of the project, visit our website: [Twitter Clone Demo](https://twitter-clone-4woe6lmf0-vipindevelops.vercel.app/users/1a7ca09e-6ce1-4d58-a460-09ba831d31ed)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/VipinDevelops/twitter-clone.git
   ```

2. Navigate to the project directory:
   ```
   cd twitter-clone
   ```
3. Set up your database and configure Prisma:
   - Create a PostgreSQL database.
   - Copy the `.env.example` file to `.env` and configure your database connection.
4. Run the migrations and seed the database:

   ```
   npx prisma migrate dev
   npx prisma db seed --preview-feature

   ```

5. Start the Developmenet Server:

```bash
npm run dev

```

## Technologies Used

- Next.js
- Prisma
- PostgreSQL
- Tailwind CSS

## Contact

- Email: VipinChaudhary@gmail.com
- Twitter: [VipinDevelops](https://twitter.com/VipinDevelops)
- LinkedIn: [VipinDevelops](https://www.linkedin.com/in/vipindevelops/)

Feel free to reach out for questions, feedback, or collaboration.

Happy coding! 🚀
