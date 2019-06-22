package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

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

// API: returns a product that matches the input ID
func getProduct(w http.ResponseWriter, r *http.Request) {
	idstr := mux.Vars(r)["id"]
	log.Printf("Fetching Product: %#v", idstr)
	w.Header().Set("Content-Type", "application/json")

	// parse product id to a number
	id, err := strconv.Atoi(idstr)
	var product Product

	if err == nil {
		// match the product
		for i := range products {
			if products[i].ID == id {
				product = products[i]
			}
		}
	}

	// return resource-not-found if no match
	if product == (Product{}) {
		w.WriteHeader(404)
		return
	}

	// return the product details encoded as JSON
	json.NewEncoder(w).Encode(product)
}

func main() {
	r := mux.NewRouter().StrictSlash(true)

	r.Path("/products").HandlerFunc(listProducts).Methods("GET")
	r.Path("/product/{id:[0-9]+}").HandlerFunc(getProduct).Methods("GET")
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	log.Println("Listening...")
	http.ListenAndServe(":3000", r)
}
