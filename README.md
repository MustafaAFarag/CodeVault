NoteVault is a college community website that help share notes and prepare for exams/studying throughout all year long

This is a external interactive application where there will be users ( my college peers ) and administrater ( me and people i handpick )

We have no API or anything yet , so we will use Supabase

Project Requriments :

- Users of the app are two types ( User - Admin ). They need to be logged into the application to perform tasks
- New users can sign up through a form
- Users should be able to upload an avatar , and change their name and password
- User data should contain : Full Name ,email , nationality , country flag , year in college , age
- Leaderboard based on some system (still thinking)
- Notes that can be uploaded by all users ( for now then will be for verified )
- Users can rate the uploads
- Home Page where basic lectures and sheets for each subject will be displayed at
- Incentivize Early Adoption: Offer rewards or recognition to the first set of users who upload notes or reach certain milestones.
- Daily Challenges: Offer daily or weekly study challenges, such as “Review last week’s notes” or “Complete a practice quiz,” to keep students engaged.
- Custom Quizzes: Allow students to create and take quizzes based on their course material or shared notes, helping with regular revision.
- Streaks & Rewards: Encourage continuous study with streaks for completing daily challenges and offer rewards like badges or points.
- App needs dark mode ( not prio )

Feature Categories :
1 ) Dashboard with leaderboards
2 ) Homework
3 ) Exam Prepping
4 ) Finals - Midterms
5 ) To-Do List
6 ) Login / Sign-up
7 ) Account Settings
8 ) Authentication

----Home (/dashboard):

A dashboard overview with quick access to recent notes, upcoming quizzes, and a summary of recent activities.
A personalized greeting with the user's current streak and badges earned.
Notifications about new lectures or shared notes.

----Notes (/notes):

A page where students can browse, upload, and search for notes by subject, course, or date.
Options to filter by popularity, rating, or recency.
A section for users to see their own uploaded notes and manage them.

----Lectures (/lectures):

A page listing all available lecture materials, either by course or subject.
Integration with video lectures or slide presentations, if applicable.
A feature to bookmark or download lectures for offline viewing.

----QuizTime! (/quiztime): ( not prio )

A quiz hub where students can take quizzes based on their subjects.
A leaderboard showcasing top performers.
A history of taken quizzes with scores and badges earned.

----Settings (/settings):

User profile settings, including the ability to change the display name, email, and password.
Notifications and preferences management.
Account management, such as connecting or disconnecting from social accounts or deleting the account.
You could also consider adding a few more items depending on your project's needs:

----Community (/community): ( not prio )

A forum or chat space where students can discuss topics, ask questions, or form study groups.

----Resources (/resources):

Additional study resources like past papers, reference books, or recommended reading materials.

Tech Stack :
Routing => React Router
Styling => Tailwind CSS
Remote State Mangement => React Query
UI state management => If you think there is no UI state needed in the App => Context API , otherwise Redux
Form Management => React Hook Form
other tools => React icons / React hot toast / Recharts / date-fns / Supabase
