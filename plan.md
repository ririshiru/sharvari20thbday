





The Figma layout has these sections (by Y position):

Section 1 (y:0-852): Hero - Background image, "BIRTHDAY" title, "20th" subtitle, celebrating text, emotional text, "You may ask..." + "Scroll to find out..."
Section 2 (y:852-1694): Intro transition - same bg zoomed, photo collage with "11" date text, landscape image, "DAY TIME PLAN" / "EVENING PLAN" labels
Section 3 (y:1694-2566): DAY TIME section - bg image, "DAY TIME" heading, day plan description, photo of venue, "PUNE CAMP", "SATTARI DESSERT SHOP", "CAMP BURGER", expense info
Section 4 (y:2566-3438): EVENING TIME - heading, photo collages, party description with gift registry text, "A HOUSE PARTY"
Section 5 (y:3438-4310): LOCK YOUR COLOR - color matching snack entry concept, image, catch text, "DIVASZZ YOU WILL MEET" floating names frame, input field, ACCEPT INVITATION button
Section 6 (y:4310-5182): More images + food photo + Terms & Conditions
Section 7 (y:5182-6054): "TOH AARAHE HO NAH??" (Are you coming or not??) + final photo
Now I'll build the complete site. Let me start with the CSS and then the full App.jsx.



ok now plan is we will do the development for this canvas size first--393x6054 then i'll test it on different devices how the size and the responsive will work
i will send screen shot that needs implemented and the assests are in folder and export typography as well from figma itself we will go step by step so i want you to remove everything you have added except the basic set up. we have 7 pages to develop and i will now send the screenshot of page one then when i send ss of second page it should be after first page in scrolling handle the flexas and all i can provide css classes or code i have dev of figma lemme know what's needed 


ok proceed with page two keeping in mind
-assets in folder to be used 
-typogragrpy should be exact- export css from figma if neeeded
-it's scrollable website so page will be one after other 
-the size we are developing for is 393x852
-excute just these 

context and place every assect how it is placed in reference to evrything in the screenshot












[page4reference.png](file;file:///Users/admin/Desktop/birthday20th/context/page4reference.png) [page4.png](file;file:///Users/admin/Desktop/birthday20th/context/page4.png) 

/* image 8 */

position: absolute;
width: 402px;
height: 872px;
left: -4px;
top: 2566px;

background: url(image.png);


/* image 10 */

position: absolute;
width: 280px;
height: 371px;
left: 60px;
top: 2816px;

background: url(image.png);


/* It’s my birthday, so you already know we have to do it big. Grab the prettiest, most scandalous dress in your closet and meet me at my place at 6:30 PM sharp! We are doing it all: fun games, an actual photoshoot, tons of food, a massive snack haul, and obviously a lot of dancing. P.S. If you want to get me a gift, I actually made a list of stuff I want! 🔗 VIEW MY GIFT REGISTRY HERE */

position: absolute;
width: 224px;
height: 142px;
left: 88px;
top: 2942px;

font-family: 'Glegoo';
font-style: normal;
font-weight: 700;
font-size: 10px;
line-height: 18px;
text-align: justify;

color: #6B6767;

text-shadow: 22px 22px 40px rgba(0, 0, 0, 0.25);


/* image 11 */

position: absolute;
width: 149.34px;
height: 162.43px;
left: 0px;
top: 2758px;

background: url(image.png);
transform: rotate(-23.62deg);


/* image 13 */

position: absolute;
width: 149.34px;
height: 162.43px;
left: 196px;
top: 2758px;

background: url(image.png);
transform: rotate(24.1deg);


/* image 12 */

position: absolute;
width: 169.3px;
height: 207.86px;
left: 98px;
top: 2755px;

background: url(image.png);
transform: rotate(91.09deg);


/* EVENING TIME */

position: absolute;
width: 315px;
height: 62px;
left: 38px;
top: 2608px;

font-family: 'Abhaya Libre ExtraBold';
font-style: normal;
font-weight: 800;
font-size: 65px;
line-height: 77px;
text-align: center;

color: #FFFFFF;

border: 1px solid #717171;


/* A HOUSE PARTY */

position: absolute;
width: 104px;
height: 52px;
left: 208px;
top: 3107px;

font-family: 'Abhaya Libre ExtraBold';
font-style: normal;
font-weight: 800;
font-size: 21px;
line-height: 25px;
text-align: right;

color: #FFA2EC;

border: 1px solid #CD1C1C;


/* image 15 */

position: absolute;
width: 290px;
height: 161px;
left: 56px;
top: 3229px;

background: url(image.png);


/* ⚠️ BUT THERE’S A CATCH... Your entry ticket into the party is a snack that matches the exact color of ANYTHING you are wearing. No matching snack, no entry. Choose your outfit (and your cravings) wisely. */

position: absolute;
width: 174px;
height: 128px;
left: 142px;
top: 3244px;

font-family: 'Glegoo';
font-style: normal;
font-weight: 700;
font-size: 10px;
line-height: 18px;
text-align: justify;
text-transform: uppercase;

color: #6B6767;

text-shadow: 22px 22px 40px rgba(0, 0, 0, 0.25);
