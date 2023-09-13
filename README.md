## Nuxt 3, Primevue (Sakai Admin), Supabase Project
> "The primary focus of this project lies in the examination of a specific case study. In this case study, we delve into the intricate interplay of three key frameworks, namely Nuxt 3, Supabase, and Primevue. Our objective is to thoroughly analyze the utilization and synergy of these frameworks within a practical context, shedding light on their individual contributions and collective impact. By dissecting real-world scenarios and implementations, we aim to provide valuable insights and lessons learned from working with this powerful combination of technologies."

## Live Preview 

Visit [CRM App](https://v3.nuxtjs.org) website for a live preview.


## Tech Stack

* Nuxt 3 
* Supabase
* Primevue
  - Sakai Template or Apollo
* Pinia



### User Management

* Signin/Signup via Supabase
* Social Signin (e.g. google) via Supabase



### PrimeVue Theme
Sakai uses the free Saga, Arya and Vela themes which are distributed within PrimeVue, however it can be used with any PrimeVue theme as well such as material, tailwind and bootstrap as layout colors are derived from the theme used via CSS variables.

### SASS Variables
In case you'd like to customize the layout variables, open **_variables.scss** file under src/layout folder. The list is pretty short as majority of the variables are derived from the PrimeVue theme being used.


### Todos:
> Planning stage

#### Pages
* Profile
* Password recovery
* Lock Screen
* New Password
* Verification
* Access Denied
* Error Page


#### Supabase Table
* User roles and permissions (admin, regular user, etc. roles)


#### Components
* Breadcrumbs

