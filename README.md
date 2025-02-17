# Schedify

![Schedify](https://res.cloudinary.com/dhd52zju0/image/upload/v1739780349/11392d03-48a8-4b62-b40c-27347fc048b7.png)

**NOTE: This is the development environment configuration file.
It is regularly updated on a daily/weekly basis, so make sure to check for changes.**

## Schedify - Features & Functionalities

### 1. Task Management

- **Task Categories & Colors**: Users can set task categories and assign specific colors to them.
- **Recurring Tasks**: Users can set repeatable tasks, such as daily prayers, weekly meetings, etc.
- **Task Deletion**: Ability to delete tasks properly.

### 2. Scheduling Views

- **Daily Views**: Users can view their tasks in daily formats.
- **Time Slots**: Ability to schedule tasks in specific time slots.

### 3. Notifications & Reminders

- **Reminders for Tasks**: Users receive reminders before a task starts.
- **Push Notifications**: If push notifications are not yet implemented, consider adding them to keep users notified.

### 4. UI Enhancements

- **Responsive Design**: Ensure the app works well on different screen sizes (mobile, tablet, etc.).
- **Smooth Transitions**: Improve user experience by adding smooth UI animations.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**
- **Git** (for cloning the repository)

  -**Installation:**
  To get a local copy up and running, follow these simple steps:

1. **Clone the repo:**

   ```bash
   git clone https://github.com/mohdsaadshaikh/schedify.git

   ```

2. **Navigate to the project directory:**

   ```bash
   cd [project-directory]

   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in root directory and add these variables as shown below.
   - Want env file? contact me on [Muhammad Saad Shaikh](mailto:mohammadsaad925s4s@gmail.com). or whatsapp [Message me on WhatsApp](https://wa.me/923192340879)

```plaintext
NODE_ENV=development
AUTH_SECRET="your_auth_secret"
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

DATABASE_URL="postgresql://your_db_user:your_db_password@your_db_host/your_db_name?sslmode=require"

EMAIL_FROM=your_email@example.com
BREVO_HOST=smtp-relay.brevo.com
BREVO_PORT=587
BREVO_USER=your_brevo_user
BREVO_PASS=your_brevo_password

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `.env`: Environment variables.
- `.eslintrc.json`: ESLint configuration.
- `.github/`: GitHub workflows and configurations.
- `.next/`: Next.js build output.
- `app/`: Application source code.
- `auth.js`: Authentication logic.
- `authProviders.js`: Authentication providers.
- `components/`: React components.
- `hooks/`: Custom hooks.
- `lib/`: Library files.
- `middleware.js`: Middleware configuration.
- `prisma/`: Prisma ORM configuration.
- `public/`: Public assets.
- `schemas/`: Database schemas.
- `services/`: Service layer.
- `tailwind.config.js`: Tailwind CSS configuration.
- `vercel.json`: Vercel deployment configuration.

  **Contributing**

  Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
