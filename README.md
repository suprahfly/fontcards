# Fontcards webapp
## Types
### Scalars
- API_KEY
- Color
- Url

### Objects
- Font
- Foundry
- Card
- Pair
- Content

### Enums
- Category
- Variant
- Source
- Subset

### Google API response:

```
alpha:      Sort the list alphabetically
date:       Sort the list by date added (most recent font added or updated first)
popularity: Sort the list by popularity (most popular family first)
style:      Sort the list by number of styles available (family with most styles first)
trending:   Sort the list by families seeing growth in usage (family seeing the most growth first)

kind:         The kind of object, a webfont object
family:       The name of the family
category:     The category of the font
subsets:      A list of scripts supported by the family
variants:     The different styles available for the family
version:      The font family version.
lastModified: The date (format "yyyy-MM-dd") the font family was modified for the last time.
files:        The font family files (with all supported scripts) for each one of the available variants.

{
   "kind": "webfonts#webfont",
   "family": "Anonymous Pro",
   "variants": [
    "regular",
    "italic",
    "700",
    "700italic"
   ],
   "subsets": [
    "greek",
    "greek-ext",
    "cyrillic-ext",
    "latin-ext",
    "latin",
    "cyrillic"
   ],
   "version": "v3",
   "lastModified": "2012-07-25",
   "files": {
    "regular": "http://themes.googleusercontent.com/static/fonts/anonymouspro/v3/Zhfjj_gat3waL4JSju74E-V_5zh5b-_HiooIRUBwn1A.ttf",
    "italic": "http://themes.googleusercontent.com/static/fonts/anonymouspro/v3/q0u6LFHwttnT_69euiDbWKwIsuKDCXG0NQm7BvAgx-c.ttf",
    "700": "http://themes.googleusercontent.com/static/fonts/anonymouspro/v3/WDf5lZYgdmmKhO8E1AQud--Cz_5MeePnXDAcLNWyBME.ttf",
    "700italic": "http://themes.googleusercontent.com/static/fonts/anonymouspro/v3/_fVr_XGln-cetWSUc-JpfA1LL9bfs7wyIp6F8OC9RxA.ttf"
   }
}
```
