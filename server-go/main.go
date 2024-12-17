package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	r.Get("/suggestions", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		q := r.URL.Query().Get("q")
		if len(q) < 2 {
			w.Write([]byte(fmt.Sprintf(`["%s", [["%ssmth"]]]`, q, q)))
			return
		}
		// resp, err := http.Get(fmt.Sprintf("https://clients1.google.com/complete/search?client=youtube&hl=en&ds=yt&q=%s", q))
		// if err != nil {
		// 	log.Fatalln(err)
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	return
		// }

		// body, err := io.ReadAll(resp.Body)
		// if err != nil {
		// 	log.Fatalln(err)
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	return
		// }

		// sb := strings.Replace(string(body), "window.google.ac.h(", "", 1)
		// w.WriteHeader(http.StatusOK)
		// w.Write([]byte(sb[:len(sb)-1]))
		w.Write([]byte(`["red",[["red hot chili peppers",0,[512,433]],["red sun in the sky",0,[512,433]],["red lipstick monster",0,[512,433,131]],["red flag",0,[512]],["red one trailer",0,[512,433,131]],["redrum",0,[512,433]],["red dead redemption 2 trailer",0,[512,433,131]],["red dead redemption 2",0,[512,433]],["red lights",0,[512]],["reddit stories",0,[512,433,131]],["redacted",0,[512,433,131,455]],["red",0,[512]],["red one",0,[512,433,131]],["red bull",0,[512,433]]],{"k":1,"q":"l8behgNufwW6WBLH2KDkzP7M1-s"}]`))
	})
	http.ListenAndServe(":8080", r)
}
