# Grammator
Grammator provides spelling and grammar checking capabilities to your application. Submit text and receive a JSON response with potential errors and suggested corrections.

Prerequis
-----
Docker must be present on your machine

Instalation
-----

To install or build using a script, simply type:
```
docker-compose build
```

Then to run the necessary containers ,type:
```
docker-compose up
```

Usage
-----
To perform a spell check ,type:

```
curl -d "text=<your text>&lang=en-US" -X POST http://localhost:5000/spell/check
```

To perform a spell check using txt files (recommended for long text) ,type:

```
curl  -F "filename=<path to the txt file>"  http://localhost:5000/spell/checkFile
```

To perform a full grammar check ,type:

```
curl -d "text=<your text>&lang=en-US" -X POST http://localhost:5000/check
```
