// MVP:
Table Users {
  id int
  last_name string
  first_name string
  email string
  create_date timestamp
  country_code integer
  balance number
}
// something bein sold
Table Purchases {
  id int
  nft_id int
  create_date timestamp
  purchase_date timestamp
  buyer_id int
  seller_id int
  is_sold boolean
}

Table Favourites {
  id int
  user_id int
  nft_id int
}

Table Favourites_Users {
  id int
  user_id int
  favourite_id int
}

Table NFTs {
  id int
  special_ability int
  youth_training_skill int
  senior_training_skil int
  user_id int
  image_url string
  price number
  }
  
Table SpecialAbilities { 
  id int
  special_ability_name string
}



Table FootballManager_SpecialAbilities {
  id int
  nft_id int
  special_ability_id int
}




Ref: "Users"."id" < "NFTs"."user_id"



Ref: "FootballManager_SpecialAbilities"."nft_id" > "NFTs"."id"

Ref: "SpecialAbilities"."id" < "FootballManager_SpecialAbilities"."special_ability_id"


Ref: "Users"."id" < "Favourites"."user_id"

Ref: "NFTs"."id" < "Favourites"."nft_id"