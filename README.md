![Node.js version 14.5.0](https://img.shields.io/badge/Node.js%20version-14.5.0-success)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


### Initial setup

Use Node.js version 14.5.0
```
nvm use 14.5.0
```

Install dependencies
```
npm i
```



### Running the developments server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project tech and considerations

### NextJS
I have been wanting to revisit React for a while. Last i looked at it was over 3 years ago. Now seemed like a good time to have a go at it. While the core concepts of jsx and reactive states in React is familiar, there's a lot of structure in NextJS that's unfamiliar to me. My experience with React has primarily been class components and and the older lifecycle hooks. UseEffect I had i hard time wrapping my head around how to use most optimally.

#### MobX, Redux & global state management
I realized quickly that I had enough new stuff going on with NextJs and React so I chose to completely ignore global state for now.

### BEM, PostCSS & CSS modules
The past couple of years I been writing exclusively BEM and mainly PostCSS, so this was my go-to stack. It seems there are some logical complications between CSS module for scoped component styling and how BEM is utilized while nesting. I chose to stick with it, but I'm very aware that it would be more optimal with JS-style object naming conventions, since they can be easily extracted from the import.
For example:
```
import styles from './styles.module.css';
className={styles.blockElement}
```
Instead of
```
import styles from './styles.module.css';
className={styles['block__element']}
```
Initally I just postponed the dilemma by putting all the component styles in individual files and imported them in the global styles.
Later on I decided to move them to modules, but I still kept the BEM naming just to save some time. I think they would be better located along their .tsx components. They're scoped, so they don't really have anything to do away from the component.

### Components naming conventions
Personally I don't mind to much which convention is used, as long as everyone uses the same one. I figured I would try to mix and match a little different things here, which in hindsight is probably not the best idea.

I have often times used the Atomic methodology. I find the separation of smaller components from larger "molecules" or "organism" nice, but i also find it to lack further structure than just that. Another approach is splitting more complex components into "areas" like I have done with `beerlist/*.tsx`. Since a beerlist is 90% of the assignment this probably doesn't make a lot of sense here. Similarly I have created a folder for layouts (self explanatory) and strucural components . footer, header, navigation etc. I have also prefixed the header and footer components with "The", implying a singleton pattern.

As I mentioned in the CSS chapter, I regret not putting components in individual folders along their CSS modules. For example: `components/beerlist/BeerCard/BeerCard.tsx`


### Types 
Like I mentioned before the BeerList is the majority of the project. The Beer.ts file I auto-generated from the JSON response. I believe i used [http://json2ts.com/](http://json2ts.com/) but I can't quite remember.

I only have a single interface for component props. Ideally I think every component should have it. I guess this would fit nicely the in component folder structure along css modules. I was working with pretty simple props so I didn't really bother doing it for something quick like this.

Theres also a lot of schools when it comes to naming of interfaces and types in ts. I kind of like the C# way where interfaces are prefixed by an "I", but i believe thats for classes only. They main issue in TS comes when your component is called the same as the interface. Again, I'm not married to any specific school or method. As long as everyone in the team is on the same page it will work fine.

### Summary
I wouldn't say it was too big a mouthful to jump head on into NextJS, but with every new framework or tech there is a lot of refactoring and doing things the wrong way at first. Things just take longer time and along the way I lost my structure a bit. Had this been a larger project og something I would continue working on, refactoring would have been the next step. And as with all other things IT, the way things work on large scale projects is typically also very different from the basic tutorial examples, so I'm eager to see how NextJS looks in a large scale setup.