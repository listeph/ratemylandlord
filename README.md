### Setup Instructions ###
1. Hopefully everyone already has a linux command line (ex: WSL if you're in Windows, because idk Command Prompt lol)
2. [Clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
3. cd into the cloned `ratemylandlord` folder
4. check Python installed by running `pip`, otherwise install python version ~3.6.5
5. `pip install -r requirements.txt` , this should replace manually doing: `pip install django djangorestframework factory_boy [... other listed dependences ...]`
6. check that you have npm installed by typing `npm` in your terminal
7. cd into the `rate_my_landlord/frontend` directory
8. run `npm install` which will download the dependencies listed in `frontend/package.json`
9. run `npm run dev` which will statically compile the React code
10. in a separate terminal, cd into the cloned `ratemylandlord` folder and into the `rate_my_landlord` directory
11. `python manage.py runserver` which starts the localhost site
12. follow given url to localhost, where you should see the site! (Check the `ratemylandlord/rate_my_landlord/api/urls.py` file for subpages. Right now for example you have to add '/home' at the end of the localhost url to see the LandlordView.)

### Additional Recommended Setup for Development ###
1. I think it's best to develop on VSCode! It has helpful extensions and is connected to Git
2. download the Prettier, Python, Django, React, Javascript extensions which are helpful for linting, consistent code styling, and debugging

![Screen Shot 2021-09-21 at 2 29 36 PM](https://user-images.githubusercontent.com/43322572/134227217-a21acb96-f103-4d58-ba37-9f87d74b46e2.png)

### Play Around! ###
1. you can test making frontend changes to `rate_my_landlord/frontend/src/components/App.js` and viewing in the provided localhost url
2. you can also play with our backend and view the model changes in `rate_my_landlord/api/models.py` and `rate_my_landlord/api/factory.py`, and view changes in [provided localhost url]/api/home where I have simply printed 50 instances of randomly generated landlord models

### Dev Instructions ###
1. Before making changes, make sure you have done `git pull origin main` to make sure you have the latest changes
2. When you want to make changes, please do `git checkout -b [new branch name here]`, so when you do `git push` push it pushes to a separate branch. Please read up on Git or watch a short tutorial if you don't already have experience 🥺 
3. To populate database with test data, run `python manage.py setup_test_data` as implemented in [PR #8](https://github.com/listeph/ratemylandlord/pull/8)

![Screen_Shot_2021-10-04_at_9 37 55_PM](https://user-images.githubusercontent.com/43322572/135953894-05e3f28d-b5dc-4688-af9a-232c96979e24.png)
 
 ### When Making Database Changes / Models.py Changes ###
1. `python manage.py makemigrations`
2. `python manage.py migrate`

 ### When Making React Changes ###
 1. run `npm run dev` from `rate_my_landlord/frontend` directory to statically recompile React code
