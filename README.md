# .Pxl(Clicker Game)

## What is it?

An updated version of my first pxl-clicker project, fully remade with react with tons of new additions.

## Why?

I'm using this to learn React mainly. But I do hope to eventually launch a live site for this.

## Whats new/Overview?

- Fully updated UI
- New loading screen
- Updated assets
- A new type of battle system
- Updated inventory items and functionality
- Scalable to mobile(in progress)
- Better level scaling

## New UI & Battle System

### Look and feel
Compared to the orignal, ive gone with a more arcade-lite theme over the minimal styling before. It's a bit more complex but more readable, engaging and interactive. The inventory layout is done in an accordian style for selecting and getting info on items, and "energy" has been renamed to "bank" and moved into the inventory side-panel. Also all items have been fully animated within their respective tabs, along with the price/buy button.

<img height="400" alt="Screen Shot 2022-09-17 at 5 14 01 PM" src="https://user-images.githubusercontent.com/89004487/190876673-83b113a4-37b6-44f1-9ce7-4c1001917285.png">
<img height="400" alt="Screen Shot 2022-09-17 at 5 30 37 PM" src="https://user-images.githubusercontent.com/89004487/190877020-0307c552-033f-4573-9920-ff7179e82390.png">
<img height="400" alt="Screen Shot 2022-09-17 at 5 14 09 PM" src="https://user-images.githubusercontent.com/89004487/190876916-ad0c26c2-59fc-4b5d-870d-efafc27062d6.png">
<img height="400" alt="Screen Shot 2022-09-17 at 5 02 47 PM" src="https://user-images.githubusercontent.com/89004487/190876966-866e9cd4-e636-447e-b6b8-6a64156b2831.png">

### The Battle System
I wanted to add some rpg elements to make the game more engaging so I added a couple new elements.

#### The Action Bar(circle?)
Above both the player character and enemy character ive added a progress bar to denote a specific action when filled.
For the player. you get to use 1 of 4 type of special abilities
- An attack ability that does massive amounts of damage
- A healing ability to recover hp
- A Buff to raise player damager per click
- A debuff to the enemy damage or action bar progress speed

For the enemy, when their Action bar fills they get to do their attack back. Hence why the player has hp now, and the enemy has attack power.
Also, both bars do fill passively but the player can fill the bar far quicker by attacking(clicking) the enemy.

#### Level up system
Whenever you kill the enemy you gain xp and cells(the ingame currency). Gain enough xp and you level up, get enough cells you can buy upgrades. Every level raises you hp and base attack damage. But everytime you kill the enemy they also come back leveled up and slightly stronger as well. The plan is to keep this fairly linear, but with the enemy Hp going up beyond the players base attack power. So you can utilize the upgrades you purchase and plan how to use your special abilities.

<img height="300" alt="Screen Shot 2022-09-17 at 5 33 34 PM" src="https://user-images.githubusercontent.com/89004487/190877072-8a30c4bb-9937-47ac-989e-3ab2d50f083e.png">

<img height="400" alt="Screen Shot 2022-09-17 at 5 43 06 PM" src="https://user-images.githubusercontent.com/89004487/190877292-252dd48d-5c4b-41fb-9d0b-aacc01c2c343.png">

Things to do
- Get the calculations down to properly scale the leveling
- Make full descriptions for all abilities and upgrades
- create more assets for variety reasons
- Enemy sprite variety.









