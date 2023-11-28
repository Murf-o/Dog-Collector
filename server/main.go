package main

import (
	"sync"
	"net/http"
	"context"
	"fmt"
	"time"
	"log"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"github.com/gin-contrib/cors"
)

type accountLogin struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type userDog struct{
	Username string `json:"username"`
	Url string `json:"url"`
}

type accountUsername struct{
	Username string `json:"username"`
}

const database string = "DogCollector"
const loginCol string = "Logins"
const userDogCol string = "User-Dogs"

var rwMutex sync.RWMutex

func addLogin(client *mongo.Client, c *gin.Context){
	var newLogin accountLogin

	if err := c.BindJSON(&newLogin); err != nil{
		fmt.Println(err)
		return
	}
	coll := client.Database(database).Collection(loginCol)
	rwMutex.Lock()
	result, err := coll.InsertOne(context.Background(), newLogin)
	rwMutex.Unlock()
	if err != nil{
		fmt.Println(err)
		return
	}
	fmt.Println(result)
}

func authenticate(client *mongo.Client, c *gin.Context){
	var query accountLogin
	if err := c.BindJSON(&query); err != nil{
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	coll := client.Database(database).Collection(loginCol)
	var result accountLogin
	rwMutex.RLock()
	err := coll.FindOne(context.Background(), query).Decode(&result)
	rwMutex.RUnlock()
	if err != nil{
		c.IndentedJSON(http.StatusOK, gin.H{"authenticated": false})
		return
	}

	//success response
	c.IndentedJSON(http.StatusOK, gin.H{"authenticated": true})
}

func addDog(client *mongo.Client, c *gin.Context){
	var query userDog

	if err := c.BindJSON(&query); err != nil{
		fmt.Println(err)
    return
	}

	coll := client.Database(database).Collection(userDogCol)
	rwMutex.Lock()
	result, err := coll.InsertOne(context.Background(), query)
	rwMutex.Unlock()
	//Error adding dog
	if err != nil{
		fmt.Println(err)
		return
	}
	fmt.Println(result)
}

func getDogs(user string, client *mongo.Client, c *gin.Context){
	
	coll := client.Database(database).Collection(userDogCol)
	filter := bson.M{"username": user}
	log.Println(filter)
	rwMutex.RLock()
	cursor, err := coll.Find(context.Background(), filter)
	rwMutex.RUnlock()
	if err != nil{
		c.IndentedJSON(http.StatusOK, gin.H{"authenticated": false})
		return
	}
	
	var dogList []userDog
	if err := cursor.All(context.Background(), &dogList); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error reading data"})
    return
	}
	c.IndentedJSON(http.StatusOK, gin.H{"dogList": dogList})
}

func main() {
	dbPass := "NP8eOx75CH0tfvxM"
	uri := "mongodb+srv://murf:" + dbPass + "@dogcollector.bwhtgkg.mongodb.net/?retryWrites=true&w=majority"
	opt := options.Client().ApplyURI(uri)
	client, err := mongo.NewClient(opt)

	if err != nil{
		panic(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil{
		fmt.Println(err)
		return
	}
	defer cancel()
	err = client.Ping(ctx, readpref.Primary())
	if err != nil{
		fmt.Println(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")

	router := gin.Default()
	router.Use(cors.Default())
	router.POST("/add-login", func(c *gin.Context){
		go addLogin(client, c)
		c.IndentedJSON(http.StatusOK, gin.H{"message": "processing"})
		
	})
	router.POST("/authenticate", func(c *gin.Context){
		authenticate(client, c)
	})

	router.POST("/add-dog", func(c * gin.Context){
		go addDog(client, c)
		c.IndentedJSON(http.StatusOK, gin.H{"message": "processing"})
	})

	router.GET("/get-dogs/:username", func(c *gin.Context){
		user := c.Param("username")
		getDogs(user, client, c)
	})
	router.Run("localhost:8080")
}
