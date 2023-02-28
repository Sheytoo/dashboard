# DASHBOARD PROJECT


Project Dashboard at Epitech Strasbourg.

## Documentation
### Services
| ID | Name    | Label           |
|----|---------|-----------------|
| 1  | weather | Weather         |
| 2  | steam   | Steam           |
| 3  | crypto  | Crypto Currency |
| 4  | flight  | Flight          |

### Widgets
| ID | Name                  | Label                         | Params                                                                                  |
|----|-----------------------|-------------------------------|-----------------------------------------------------------------------------------------|
| 1  | current_weather_city  | Current weather for city      | city: string \| refresh_interval: number                                                |
| 2  | forecast_weather_city | Forecast weather for city     | city: string \| refresh_interval: number                                                |
| 3  | last_played_game      | Steam last game played        | steam_id: string \| refresh_interval: number                                            |
| 4  | lookup_steam_id       | Lookup steam id               | refresh_interval: number                                                                |
| 5  | current_crypto_price  | Current crypto currency price | crypto_currency: string \| currency: string \| days: number \| refresh_interval: number |
| 6  | flight_status         | Flight status for flight      | flight_number: string \| date: string \| refresh_interval: number                       |

## Requirements

- [Java](https://www.java.com/fr/) (>= v17)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) (Optional)

## Clone project

```bash
git clone https://github.com/Sheytoo/dashboard
```

## Install API

```bash
cd "dashboard/dashboard-api"
./gradlew clean build
```

### Database MySQL
_You can find all table creations and inserts in the file [db.sql](dashboard-api/db.sql)._

```bash
mysql [-h localhost] -u <user> -p<password>
source db.sql
```

### Configure app

- Open `application.properties` file in the project directory then edit it with your settings. You can change API Key.
- Open `messages.properties` to change messages.


### Running the project

```bash
./gradlew bootRun
```

### Documentation (Swagger)
The documentation can be find directly in the API using `/swagger-ui/` URL path.

## Install Frontend

```bash
cd "dashboard/dashboard-front"
yarn install
```

### Build

```bash
yarn build
```

### Running the project

```bash
yarn start
```

## Account for testing
_A full dataset for testing is available with this account._

- Email: nathan.blind-heitz@epitech.eu
- Password: test

---

## Authors

- [Nathan BLIND HEITZ](https://github.com/Sheytoo)
