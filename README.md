### Setup Instructions ###
1. Hopefully everyone already has a linux command line (ex: WSL if you're in Windows, because idk Command Prompt lol)
2. [Clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
3. cd into the cloned `ratemylandlord` folder
4. check Python installed by running `pip`, otherwise install python version ~3.6.5
5. `pip install -r requirements.txt` , this should replace manually doing: 
5.1 `pip install django djangorestframework factory_boy`
6. cd into the `rate_my_landlord` directory
7. `python manage.py runserver`
8. follow given url to localhost, where you should see the site!
8.5 Check the `ratemylandlord/rate_my_landlord/api/urls.py` file for subpages. Right now for example you have to add '/home' at the end of the localhost url to see the LandlordView.

### Additional Recommended Setup for Development ###
1. I think it's best to develop on VSCode! It has helpful extensions and is connected to Git
2. download the Prettier, Python, Django, React, Javascript extensions which are helpful for linting, consistent code styling, and debugging
![Screen Shot 2021-09-21 at 2 29 36 PM](https://user-images.githubusercontent.com/43322572/134227217-a21acb96-f103-4d58-ba37-9f87d74b46e2.png)

### Play Around! ###
1. you can [test making changes to `rate_my_landlord/api/views.py`](https://youtu.be/JD-age0BPVo?t=990) → saving will automatically update the page in the provided link (reload to see changes)
2. you can also [test making changes to the `urls.py` files](https://youtu.be/JD-age0BPVo?t=1030) to see how it changes the site

### Dev Instructions ###
1. Before making changes, make sure you have done `git pull origin main` to make sure you have the latest changes
2. When you want to make changes, please do `git checkout -b [new branch name here]`, so when you do `git push` push it pushes to a separate branch. Please read up on Git or watch a short tutorial if you don't already have experience 🥺 
 
 ### When Making Database Changes / Models.py Changes ###
1. `python manage.py makemigrations`
2. `python manage.py migrate`
