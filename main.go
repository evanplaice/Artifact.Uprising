package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Product struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price string `json:"price"`
	Image string `json:"image"`
}

type Products []Product

var products = Products{
	Product{ID: 0, Name: "Test1", Price: "5.99", Image: "test1.jpg"},
}

// API: returns a list of products
func listProducts(w http.ResponseWriter, r *http.Request) {
	log.Println("Listing Products")
	w.Header().Set("Content-Type", "application/json")

	// return the products listing encoded as JSON
	json.NewEncoder(w).Encode(products)
}

func main() {
	r := mux.NewRouter().StrictSlash(true)

	r.Path("/products").HandlerFunc(listProducts).Methods("GET")
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	log.Println("Listening...")
	http.ListenAndServe(":3000", r)
}
