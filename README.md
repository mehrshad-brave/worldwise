# Worldwise

Welcome to my first worldwise project 😅

- With this app, you can select, edit, delete, and add your zeroed locations directly from the map surface.

- I am using a fake API to show zeroed cities.


To use the Fake API, you must first install the requirements in Vite.

### install json-server
```
  npm install json-server
```

After installing the requirement, add this script to your vite.

```
    "server": "json-server --watch ... --port 1300"
```

- Pan attention
  Replace ... with the path to the data file.
  

I will provide you with some sample data to include in your data file.

```
{
  "cities": [
    {
      "cityName": "Lisbon",
      "country": "Portugal",
      "emoji": "🇵🇹",
      "date": "2027-10-31T15:59:59.138Z",
      "notes": "My favorite city so far!",
      "position": {
        "lat": 38.727881642324164,
        "lng": -9.140900099907554
      },
      "id": 73930385
    },
    {
      "cityName": "Madrid",
      "country": "Spain",
      "emoji": "🇪🇸",
      "date": "2027-07-15T08:22:53.976Z",
      "notes": "",
      "position": {
        "lat": 40.46635901755316,
        "lng": -3.7133789062500004
      },
      "id": 17806751
    }
  ]
}
```

After doing this, run the script in your terminal.

```
  npm run server
```

