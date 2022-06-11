# Li Tao's Portfolio website<hr>

This website is live at [http://www.leelee.cc](http://www.leelee.cc). You may go to this URL to have a full demo of the website.<br>

All assets and source codes are hosted at [https://github.com/taoli24/lee_site](https://github.com/taoli24/lee_site). <br>

This local version use sqlite as database for storing user and blog posts, in which it has one user (site owner) and 6 articles. <br>

You may create more articles if you log in with:

* Username: admin@test.com
* Password: 1234567890

The live version uses upgraded postgresql as database, it has been set up with different username and password.


## Purpose <hr>

The purpose of this website is to demonstrate and showcase skills, ability and experience to potential employers.



## DB Structure <hr>
#### users table
![users table](./docs/db_users_table.png)
#### posts table
![posts table](./docs/db_posts_table.png)

## Features and Functionality <hr>
#### Features
* Home page contains some personal info, skills and projects that I have worked in the past.
* Footer contains links to social platform and GitHub
* An interactive canvas element in the hero section on the home page
* Navigation hamburger animated using vanilla CSS and javascript
* Command line animation

#### Functionality
* On initial deployment of the website, the admin user will be set up using API
* Login page for website owner
* Some functions only available to admins such as post new blogs and make changes to blogs.
* Blog posts can be sorted using tags
* Syntax highlighted code snippets

## Sitemap <hr>

![Sitemap](./docs/Sitemap.png "Sitemap")

## Target audience <hr>
The target audience of the website are potential employers and whoever interested in the blogs content.


## Tech stack used in this project <hr>
 - Html5
 - CSS3
 - Javascript
 - Flask
 - Postgresql
 - Deployed on Heroku


## Screenshots <hr>

#### Home Page
![Header Section](./docs/screenshot_header_section.png)
![Project Section](./docs/screenshot_project_section.png)
![About Section](./docs/screenshot_about_section.png)
![Contact Section](./docs/screenshot_contact_section.png)
#### Blog list page
![Blog list](./docs/blog_post_list.png)
#### Login page
![Login](./docs/login.png)
#### Make new post page
![New post](./docs/new_post.png)
#### View blog
![View Blog](./docs/individual_blog.png)