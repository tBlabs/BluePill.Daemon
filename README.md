TODO
- add operation timeouts (config set etc)
- remove `fluent parser`|  import it's package instead 

# BluePill.Daemon

(Serial/USB) Driver and HTTP host (REST+Socket) for "BluePill" development board.  
Cooperates with [this firmware](https://github.com/tBlabs/BluePill.Firmware)).

## Install 

- `cd {dir}`
- `npm i`
- `sudo chmod +x run.sh`

## Start (production mode)

- `cd {dir}`
- modify `run.sh` (set `port`, `serial` and `log`)
- `./run.sh`

| Param     | Usage                                           |
| --------- | ----------------------------------------------- |
| port      | HTTP port for REST calls and socket connections |
| serial    | USB or UART "BluePill" is connected to          |
| log       | Let it talk                                     |

## Development

`npm run serve`  
You can change startup params in `autorun` script (in `package.json` > `scripts` section). Remember to always restart `serve` tool after any changes in `package.json`.

## Stop

`Ctrl+C`

# Client API

There are two options to "talk" to BluePill. Via HTTP (REST API) or TCP (Socket).

## HTTP

| Action       | Method  | Url             | Example request | Example response | Side effects                          |
| ------------ | ------- | --------------- | --------------- | ---------------- | ------------------------------------- |
| Get IO value | GET     | /`addr`         | /4              | 123              | *none*                                |
| Set IO value | GET     | /`addr`/`value` | /4/123          | *HTTP 200 OK*    | Sends `update` to every socket client |

## SOCKET

### Client --> Host

| Action       | Event  | Args                       | Example                      | Side effects               |
| ------------ | ------ | -------------------------- | ---------------------------- | -------------------------- |
| Get IO value | `get`  | `addr` (address of IO)     | socket.emit('get',  4)       | *none*                     |
| Set IO value | `set`  | `addr`/`value` (new value) | socket.emit('set', 4, 123)   | `update` to every client   |

### Host --> Client

| Event           | Args          |
| --------------- | ------------- |
| `update`        |  addr, value  |
| `driver-error`  |  addr, value  |

# IO Addresses

| IO Name     | Addr |
| ----------- | ---- |
| Input1      | 0    | 
| Input2      | 1    | 
| Input3      | 2    | 
| Input4      | 3    | 
| Input5      | 4    | 
| Input6      | 5    | 
| Input7      | 6    | 
| Adc1        | 7    | 
| Adc2        | 8    | 
| Adc3        | 9    | 
| Adc4        | 10   | 
| RTC         | 11   | 
| Output1     | 12   | 
| Output2     | 13   | 
| Output3     | 14   | 
| Output4     | 15   | 
| Output5     | 16   | 
| Output6     | 17   | 
| Output7     | 18   | 
| Pwm1        | 19   | 
| Pwm2        | 20   | 
| Pwm3        | 21   | 
| Pwm4        | 22   | 
| Display1    | 23   | 
| Display1Dot | 24   |
  
# Signals  
  
## SIGINT  
  
Press `Ctrl+C` to kill server and driver.

# Testing on PC

- Connect "BluePill" board to USB (via FTDI converter or something)
- Run `run.sh` script (check it's args first)
- Open browser and hit `http://localhost:3000/12/0` to turn build in led on. Hit `http://localhost:3000/12/1` to turn it off.  
At `http://localhost:3000/11` RTC value can be found. Refresh page few times to see if it's growing.