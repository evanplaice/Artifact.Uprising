package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter().StrictSlash(true)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	log.Println("Listening...")
	http.ListenAndServe(":3000", r)
}
