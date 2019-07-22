# Black Spotify
![Travis Build Status](https://api.travis-ci.org/osmarpetry/black-spotify.svg?branch=master)

Application developed during the year 2019. The application shows the music album from [Spotify](https://www.spotify.com).

My Lighthouse score is in the following image:

![Black Spotify Lighthouse Score](https://paper-attachments.dropbox.com/s_09FD78B46731843365377929C457B25A6A592DBA5A41C7B2079869D4726AC833_1562871054462_Screenshot_20190711_144201.png)

## What the project has

Today the project has:

- Hosting on Firebase
- Sentry for test tracking
- Redux
- CI/CD with Travis-CI
- Webpack
- Progressive Web App
- Android and iOS build from the [PWABuilder](https://www.pwabuilder.com/)
- React
-  [](https://developer.spotify.com/documentation/web-api/)[Spotify](https://developer.spotify.com/documentation/web-api/) [API](https://developer.spotify.com/documentation/web-api/)
- Cypress for the E2E tests
- Cucumber (BDD) for the Cypress
- Mocha and Chai for the Unit tests
## How to contribute to the project

To help, it is necessary to do the project setup, as instructed in the sub-topics below. However, it is necessary to first execute the fork of the application in the way is quoted in the following image:

![Fork button on Github](https://paper-attachments.dropbox.com/s_4C296FD04C70E1AA93F121DEEDBDB4413517CB63FFB0F178E10CA4F7986B7B6E_1561321377007_687474703a2f2f692e737461636b2e696d6775722e636f6d2f6c72346d6c2e706e67.png)



**Dependencies for installation**
You must have a version installed on your operating system, should chose the latest LTS version.

![Search for the latest NodeJS  LTS version- https://nodejs.org/en/](https://paper-attachments.dropbox.com/s_09FD78B46731843365377929C457B25A6A592DBA5A41C7B2079869D4726AC833_1562870681311_Screenshot_20190711_154433.png)


The code can be edited in any text editor, however we recommend using the Visual Studio Code. Because it has several extensions that aid in the development.

![Visual Studio Code](https://paper-attachments.dropbox.com/s_09FD78B46731843365377929C457B25A6A592DBA5A41C7B2079869D4726AC833_1562870720652_Screenshot_20190711_154513.png)


**Installation**
Should do the download of the code using git, the code should be the fork you made earlier. Use the following command:

    git clone https://github.com/YOUR_GITHUB_USER/black-spotify.git

Now navigate to the page and install the dependencies with the following command:

    npm install

Finally, you can upload the project with the following command:

    npm start

Then you will have access to the project in your browser, at the address: http://localhost:8080/

![Webapp Opened on Development mode](https://paper-attachments.dropbox.com/s_B62AB982EF8BE56D647018175B9CE263D48BDD2B5AF9F615F32F07617EE6AB42_1563322246089_home_1.jpg)


**Making PR to my branch**
Pull Request must be done by comparing the branch on your fork to my master branch. As you can see in the following image:

![Branch comparison from master to the fork](https://paper-attachments.dropbox.com/s_92657E8B9CBF146FAAFF1F5A42F8C9DCF1F011A1782383B18B4CB42984430344_1562858184741_pr-to-my-branch.png)


### Where I need help
Some things is not already done because need studies, to be done right. These things are:

- Get Spotify token on background of Cucumber to the E2E with Cypress tool
- Redux is always returning the last request you done, not the current you asked
- Must be more responsive. It already is, but can be done better
- Animations. Animations alwayis is welcome
- Bug report button on the bottom
- Staging and Homologation already exist, but is not working if CI/CD. Using the same project of Firebase if different domains
