### Project Description ###
Have you ever wanted a terrible landlord to get their karma? When they try to blame you for breaking their already broken washer? This is the website where you can do just that by leaving them the reviews they deserve. Users can leave ratings for their landlords in five different categories: safety measures / inspections, responsiveness / timely maintenance, transparency / trustworthiness, organization / cleanliness, and student-friendliness. In addition to writing reviews, a student can search for a landlord either by name or by filtering them by overall ratings scores. If the user cannot find the landlord they are looking for, they can also add one to the database using the Add Landlord form linked at the bottom of the search page.

We have a [separate automation test repo](https://github.com/mackstey28/selenium-ratemylandlord) created by Maxwell Tang.

### Project Organization ###
- Tech Stack: Django backend + React frontend
- Design Patterns: MVC backend, state behavioral design pattern and composition frontend
- Github serves both as our code repository and as a project management site using its built-in issues / tasks tracker
- forking and PR's for feature development
- coding standards enforced through: [automation tests](https://github.com/mackstey28/selenium-ratemylandlord), linting ([pylint](https://pylint.pycqa.org/en/latest/) + [eslint](https://eslint.org)) enforced in Github Actions, and Django Unit tests also enforced in Github Actions

### Setup Instructions ###
1. [Fork and clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repo and add this repo as upstream (as specified in the linked documentation)
2. cd into the cloned `ratemylandlord` folder
3. check Python installed by running `pip`, otherwise install python version ~3.6.5
4. `pip install -r requirements.txt` , this should replace manually doing: `pip install django djangorestframework factory_boy [... other listed dependences ...]`
5. check that you have npm installed by typing `npm` in your terminal
6. cd into the `rate_my_landlord/frontend` directory
7. run `npm install` which will download the dependencies listed in `frontend/package.json`
8. run `npm run dev` from the `ratemylandlord/rate_my_landlord/frontend` directory, which will statically compile the React code
9. in a separate terminal, run `python manage.py runserver` from the `ratemylandlord/rate_my_landlord` directory, which will start the localhost site
10. follow given url to localhost, where you should see the site

### Recommended Setup ###
1. Use VSCode
2. download the Prettier, Python, Django, React, Javascript extensions on VSCode which are helpful for linting, consistent code styling, and debugging

![Screen Shot 2021-09-21 at 2 29 36 PM](https://user-images.githubusercontent.com/43322572/134227217-a21acb96-f103-4d58-ba37-9f87d74b46e2.png)

### Dev Instructions ###
1. Before starting on any issue, please assign yourself to the issue on the issues list. Make a new issue if you want to propose your own issue to work on.
2. When creating a pull request from your fork, please link the issue with "Closes #[issue number]"

### Dev Tips ###
1. Before making changes, make sure you have done `git pull upstream main` to make sure you have the latest changes
2. You may need to run `pip install -r requirements.txt` (this should replace manually doing: `pip install django djangorestframework factory_boy [... other listed dependences ...]`) from the `ratemylandlord` directory if there are new dependencies. Likewise, you may need to run `npm install` from the `ratemylandlord/rate_my_landlord/frontend` directory.
3. Run the site as you would in Setup Instructions steps 9-11
4. You might also need to run `python manage.py makemigrations` and `python manage.py migrate` if there have been database changes -- or maybe not neccessary? not too sure about how this works with version control yettt, we'll see when you guys test
5. Made some custom commands to create / delete dummy data! To populate database with test data, run `python manage.py setup_test_data`. To delete all test data and start on a clean slate run `python manage.py empty_data`
6. You can test making frontend changes to files within `ratemylandlord/rate_my_landlord/frontend/src/components`. The url pathways are defined with the Route components in `ratemylandlord/rate_my_landlord/frontend/src/components/HomePage.js`. So for instance, to see the contents of `SearchByNamePage.js`, you would visit `{localhosturl}/search`. The changes you make should automatically reflect in the local site after you save. If changes do not show up in the localhost url, try clearing cache (for ex on Mac, that is `Opt + CMD + E`).
7. You can also play with our backend and view our database structure `rate_my_landlord/api/models.py`. `rate_my_landlord/api/factory.py` is where we specified random data generation logic for a model. These factories are then used within our custom commands such as `python manage.py setup_test_data`, under `ratemylandlord/rate_my_landlord/api/management/commands`. You can test each of the backend functions in `ratemylandlord/rate_my_landlord/api/views.py` by going to their corresponding paths specified in `ratemylandlord/rate_my_landlord/api/urls.py`. For instance, to test the `GetAllLandlords` function, go to `{localhost url}/get-all-landlords`. When making database changes, run `python manage.py makemigrations` and `python manage.py migrate` to apply changes.

### Beginner Tutorials For RateMyLandlord Development ###
https://drive.google.com/drive/u/0/folders/1-j3pl_c_45BNZmwJTDPTjvYWI8F7ugZ9
