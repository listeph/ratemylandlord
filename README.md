### Setup Instructions ###
1. Hopefully everyone already has a linux command line (ex: WSL if you're in Windows, because idk Command Prompt lol)
2. [Clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
3. cd into the cloned `ratemylandlord` folder
4. check Python installed by running `pip`, otherwise install python version ~3.6.5
5. `pip install -r requirements.txt` , this should replace manually doing: `pip install django djangorestframework factory_boy [... other listed dependences ...]`
6. check that you have npm installed by typing `npm` in your terminal
7. cd into the `rate_my_landlord/frontend` directory
8. run `npm install` which will download the dependencies listed in `frontend/package.json`
9. run `npm run dev` from the `ratemylandlord/rate_my_landlord/frontend` directory, which will statically compile the React code
10. in a separate terminal, run `python manage.py runserver` from the `ratemylandlord/rate_my_landlord` directory, which will start the localhost site
11. follow given url to localhost, and append where you should see the site!

### Additional Recommended Setup for Development ###
1. I think it's best to develop on VSCode! It has helpful extensions and is connected to Git
2. download the Prettier, Python, Django, React, Javascript extensions which are helpful for linting, consistent code styling, and debugging

![Screen Shot 2021-09-21 at 2 29 36 PM](https://user-images.githubusercontent.com/43322572/134227217-a21acb96-f103-4d58-ba37-9f87d74b46e2.png)

### Dev Instructions ###
1. Before making changes, make sure you have done `git pull origin main` to make sure you have the latest changes
2. When you want to make changes, please do `git checkout -b [new branch name here]`, so when you do `git push` push it pushes to a separate branch.
3. You may need to run `pip install -r requirements.txt` (this should replace manually doing: `pip install django djangorestframework factory_boy [... other listed dependences ...]`) from the `ratemylandlord` directory if there are new dependencies. Likewise, you may need to run `npm install` from the `ratemylandlord/rate_my_landlord/frontend` directory.
4. Run the site as you would in Setup Instructions steps 9-11
5. You might also need to run `python manage.py makemigrations` and `python manage.py migrate` if there have been database changes -- or maybe not neccessary? not too sure about how this works with version control yettt, we'll see when you guys test
6. Made some custom commands to create / delete dummy data! To populate database with test data, run `python manage.py setup_test_data`. To delete all test data and start on a clean slate run `python manage.py empty_data`

### Play Around! ###
1. You can test making frontend changes to files within `ratemylandlord/rate_my_landlord/frontend/src/components`. The url pathways are defined with the Route components in `ratemylandlord/rate_my_landlord/frontend/src/components/HomePage.js`. So for instance, to see the contents of `SearchByNamePage.js`, you would visit `{localhosturl}/search`. The changes you make should automatically reflect in the local site after you save. If changes do not show up in the localhost url, try clearing cache (for ex on Mac, that is `Opt + CMD + E`).
2. You can also play with our backend and view our database structure `rate_my_landlord/api/models.py`. `rate_my_landlord/api/factory.py` is where we specified random data generation logic for a model. These factories are then used within our custom commands such as `python manage.py setup_test_data`, under `ratemylandlord/rate_my_landlord/api/management/commands`. You can test each of the backend functions in `ratemylandlord/rate_my_landlord/api/views.py` by going to their corresponding paths specified in `ratemylandlord/rate_my_landlord/api/urls.py`. For instance, to test the `GetAllLandlords` function, go to `{localhost url}/get-all-landlords`. When making database changes, run `python manage.py makemigrations` and `python manage.py migrate` to apply changes.
