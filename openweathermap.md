# Аккаунт openweathermap.org
nick.katafol@gmail.com
Nick_016
548...

https://home.openweathermap.org/api_keys
key
1d299b7969f7973a569cfa11e2330b5d



# Пример запроса:
//explained in https://openweathermap.org/current

## получение погоды по координатам:
https://api.openweathermap.org/data/2.5/weather?lat=44.44&lon=10.00&appid=1d299b7969f7973a569cfa11e2330b5d
https://api.openweathermap.org/data/2.5/weather?lat=44.44&lon=10.00&appid=52804afd1b16e7c4065332860bf73876

## получение погоды по имени города:
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

## получение координат города по имени города, набранном на ЛЮБОМ языке:
https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&APPID=' + openweathermapApiKey
https://api.openweathermap.org/geo/1.0/direct?q=moscow&APPID=52804afd1b16e7c4065332860bf73876


