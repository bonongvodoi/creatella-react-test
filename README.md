Products Grid
====

Included Features
----
### Product
- products are displayed in a grid. **Done**
- give the user an option to sort the products in ascending order. Can sort by "size", "price" or "id". **Done**
- each product has :
  - a "size" field, which is the font-size (in pixels). We should display the faces in their correct size, to give customers a realistic impression of what they're buying. **Done**
  - a "price" field, in cents. This should be formatted as dollars like `$3.51`. **Done**
  - a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed. **Done**
- the product grid should automatically load more items as you scroll down. **Done**
- display an animated "loading..." message while the user waits for the data to load. **Done**
- when the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~". **Done**
### Ads
- after every 20 products we need to insert an advertisement from one of our sponsors. Use the same markup as the advertisement in the header shown in `public/index/html`, but make sure the `?r` query param is randomly generated each time an ad is displayed. **Done**
- Ads should be randomly selected, but a user must never see the same ad twice in a row. **Done**

How to start app
----
Install package via npm
```
npm install
```
Start app
```
npm start
```
