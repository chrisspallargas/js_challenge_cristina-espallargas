## Technology decisions to reach the Main Goals

* Develop a simple build system for your application
  To get this goal I built a workspace using create React App, that will allow us to use React and webpack, React-router-dom (to deal with pages), and also sass to be able to use nesting in styles.

* Develop the “Add/Remove to Bag” and “Add/Remove to Wishlist” actions which work con client side only
  I decided to use local storage to save the selected products, and the favorite products, it will allow us to recover the state of the selections every moment even if the page is reloaded.
  I could have used Redux, but as it was a simple data structure so I decided for a simple way.

* Develop a product listing pagination with 6 products per page.
  As it was impossible to get the total number of products, and I wanted the user to be able to go to the last page, I did a complete data call to the api (all the products), instead of using the api parameters to filter the products. Once the app got all them, it will paint just the 6 products related to the current Page.
  I also decided to save the pagination state using URL params. This way, we can reload the page anytime without loosing the current page number.

* The bag in the header must be updated with the new quantities and the new total price
  I used props and state to ensure that everytime that we add a new product to the bag, or to the favorites list, the app will update the number by itself.



## Extra credit 

* Make the application responsive, in your own taste ( CSS )
  I designed the application using responsive technologies, so its totally adaptable to any kind of devices.

* Use CSS preprocessors
  As I said, I used sass to define the css styles.

* Use of linting tools
  While I was programming, I used ESLINT to get the most effective coding.

* Unit testing / E2E testing

* Performant code

