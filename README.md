# chirpchirp

Live Site: [chirpchirp](https://chirpchirp-capstone.herokuapp.com/)

chirpchirp is a full-stack clone of [Twitter](https://twitter.com/). Users can view chirps as well as send, edit, and delete their own. Users can also comment on other users chirps.

![Screen Shot 2022-09-12 at 10 30 32 AM](https://user-images.githubusercontent.com/61199533/189682004-028270d4-7fb0-40a7-aa9f-abf842d9ae68.png)


## Languages, Frameworks, Platforms and Libraries

### Languages
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Backend
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Hosting
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Wiki Links:
* [chirpchirp Wiki](https://github.com/apizarro23/chirpchirp/wiki)
* [Database Schema](https://github.com/apizarro23/chirpchirp/wiki/Database-Schema)
* [MVP Features List](https://github.com/apizarro23/chirpchirp/wiki/MVP-Feature-List)
* [User Stories](https://github.com/apizarro23/chirpchirp/wiki/User-Stories)

## Features
#### Login or Signup as a New User
![Screen Shot 2022-09-12 at 10 30 32 AM](https://user-images.githubusercontent.com/61199533/189683582-0b5bbdbb-78ee-4a81-9115-cb9b6afe59f1.png)

#### Chirp Feed with Create a New Chirp
![Screen Shot 2022-09-12 at 10 30 49 AM](https://user-images.githubusercontent.com/61199533/189683843-69ebcaf0-8ae9-4dc7-bf0a-b34c6b0af97d.png)

#### Chirp Details with Create a New Comment
<img width="1916" alt="Screen Shot 2022-09-12 at 10 32 02 AM" src="https://user-images.githubusercontent.com/61199533/189684034-99eac969-a51f-4388-93e4-320690de19a9.png">

#### Chirp Edit/Delete
![Screen Shot 2022-09-12 at 10 46 09 AM](https://user-images.githubusercontent.com/61199533/189684534-98050dcf-3c02-41a4-a9ce-bbefd7fa6705.png)
![Screen Shot 2022-09-12 at 10 47 25 AM](https://user-images.githubusercontent.com/61199533/189684839-47e2c0ff-f33c-4cc0-ab22-d74d07557850.png)

#### Comment Edit/Delete
![Screen Shot 2022-09-12 at 10 48 14 AM](https://user-images.githubusercontent.com/61199533/189685005-aa8ac7b3-64c4-4b09-bcd7-2b2121f6b8ff.png)
![Screen Shot 2022-09-12 at 10 48 36 AM](https://user-images.githubusercontent.com/61199533/189685099-c8c1c33a-69ad-4375-bd10-c09994959f76.png)

## Steps to clone locally:
1. Clone this repository:
```bash
git clone https://github.com/apizarro23/chirpchirp.git
```

2. Install backend dependencies:

```bash
pipenv install -r requirements.txt
```

3. Create a `.env` file based on the example with proper settings for development environment:
```
SECRET_KEY=INSERT_SECRET_KEY_HERE
DATABASE_URL=sqlite:///dev.db
```

4. Start pipenv, migrate database, seed database, and run Flask app:

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

5. Install frontend dependencies:

```bash
cd react-app/
npm install
npm start
```

6. Navigate to [localhost:3000](http://localhost:3000)


## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |
