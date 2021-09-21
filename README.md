### Setup Instructions ###
1. Hopefully everyone already has a linux command line (ex: WSL if you're in Windows, because idk Command Prompt lol)
2. [Clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
3. cd into the cloned `ratemylandlord` folder, and then cd into the `rate_my_landlord` directory
4. check Python installed by running `pip`, otherwise install python version ~3.6.5
5. `pip install django djangorestframework`
6. `python manage.py makemigrations`
7. `python manage.py migrate`
8. `python manage.py runserver`
9. follow given url to localhost, where you should see the site! 

### Setup Result Example ###
Running `python manage.py runserver` from command line:
- ![Screen Shot 2021-09-21 at 2 13 14 AM](https://user-images.githubusercontent.com/43322572/134120741-a5eb906e-99a6-49c2-a506-d4c29f275aa1.png)

Basic "Hello" page that shows up on localhost:
- ![Screen Shot 2021-09-21 at 2 12 32 AM](https://user-images.githubusercontent.com/43322572/134120738-d35ad6df-a352-4042-be28-48a13b3eeb6e.png)

`rate_my_landlord/api/views.py` and overall file structure in VSCode:
- ![Screen Shot 2021-09-21 at 2 13 29 AM](https://user-images.githubusercontent.com/43322572/134120742-e61049f0-8e31-4509-adc1-3446278373ee.png)

### Sources ###
I got my setup knowledge from this video, so feel free to watch it on your own: https://www.youtube.com/watch?v=JD-age0BPVo

### Play Around! ###
1. you can [test making changes to `rate_my_landlord/api/views.py`](https://youtu.be/JD-age0BPVo?t=990) → saving will automatically update the page in the provided link (reload to see changes)
2. you can also [test making changes to the `urls.py` files](https://youtu.be/JD-age0BPVo?t=1030) to see how it changes the site

### Additional Recommended Setup for Development ###
1. I think it's best to develop on VSCode! It has helpful extensions and is connected to Git
1.5 download the Prettier, Python, Django, React, Javascript extensions which are helpful for linting, consistent code styling, and debugging ![Screen Shot 2021-09-21 at 2 29 36 PM](https://user-images.githubusercontent.com/43322572/134227217-a21acb96-f103-4d58-ba37-9f87d74b46e2.png)

### Dev Instructions ###
When you want to make changes, please do `git checkout -b [new branch name here]`, so when you do `git push` push it pushes to a separate branch. Please read up on Git or watch a short tutorial if you don't already have experience 🥺 
 
