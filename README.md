# smart-replace

Searches a string by regex and lets you replace every occurrence by executing a matcher function.

## Usage

```js
import { smartReplace } from 'smart-replace';

const oldStr = 'Among us sus1 sus2 sus3 sus4';
const regex = /sus[0-9]+/g;
const newStr = await smartReplace(oldStr, regex, async (match) => {
    return "sussy!";
});

console.log(newStr); // Among us sussy! sussy! sussy! sussy!
```
