import React from "react";
import ReactDOM from "react-dom/client"

//  const heading=React.createElement("h1",{},"hello world from react");
//     const root=ReactDOM.createRoot(document.getElementById("root"));
//     root.render(heading);

const Appcontainer=()=>{
   return(
     <div className="app-container">
          <Header/>
          <Body/>
     </div>
   );
}

const Header=()=>{
   return(
      <div className="header">
         <div className="logo-div">
            <img className="logo" src="https://img.magnific.com/premium-vector/food-logo-design-with-leaf-creative-concept-premium-vector_526458-2675.jpg?semt=ais_hybrid&w=740&q=80"></img>
         </div>
          

           <div className="nav-container">
            <ul>
               <li><h4>Home</h4></li>
                <li><h4>Cart</h4></li>
            </ul>
         </div>
       
      </div>
   );
}
const Body=()=>{
   return(
     <div className="body">
         <h5>search will come here</h5>
        
        {/* <div > */}
        <RestaurentCart resdata={data}/>
             
       
      {/* </div> */}
     </div>

   );
}
const RestaurentCart = (props) => {
  const restaurants =
    props.resdata.data.data.cards[1].card.card.gridElements.infoWithStyle
      .restaurants;

  return (
    <div className="restaurant-container">
      {restaurants.map((res) => {
        return (
          <div className="res-cart" key={res.info.id}>
            <div className="res-img-con">
              <img
                className="res-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJmtAev2vwGnmBe1lC7v8netdl01q4HO5wbBscjiYtA&s=10"
              />
            </div>

            <div className="res-info">
              <h3>{res.info.name}</h3>

              <h6>{res.info.cuisines.join(", ")}</h6>

              <h6>{res.info.costForTwo}</h6>

              <h6>⭐ {res.info.avgRating}</h6>

              <h6>{res.info.sla.slaString}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
};
const data = {
  success: true,
  message: "Restaurant List fetched successfully",

  data: {
    data: {
      cards: [
        {},

        {
          card: {
            card: {
              gridElements: {
                infoWithStyle: {
                  restaurants: [
                    {
                      info: {
                        id: "123456",
                        name: "Pizza Paradise",
                        cloudinaryImageId:
                          "rng/md/carousel/production/pizza123",
                        locality: "MG Road",
                        areaName: "Central District",
                        costForTwo: "₹400 for two",
                        cuisines: ["Pizza", "Italian", "Fast Food"],
                        avgRating: 4.3,
                        avgRatingString: "4.3",
                        totalRatingsString: "10K+ ratings",
                        veg: false,

                        sla: {
                          deliveryTime: 30,
                          lastMileTravel: 3.5,
                          slaString: "30 mins",
                        },

                        aggregatedDiscountInfoV3: {
                          header: "50% OFF",
                          subHeader: "UPTO ₹100",
                        },

                        
                      },
                    },
                    {
                      info: {
                        id: "123457",
                        name: "Pizza Hell",
                        cloudinaryImageId:
                          "rng/md/carousel/production/pizza123",
                        locality: "MG Road",
                        areaName: "Central District",
                        costForTwo: "₹400 for two",
                        cuisines: ["Pizza", "Italian", "Fast Food"],
                        avgRating: 4.3,
                        avgRatingString: "4.3",
                        totalRatingsString: "10K+ ratings",
                        veg: false,

                        sla: {
                          deliveryTime: 30,
                          lastMileTravel: 3.5,
                          slaString: "30 mins",
                        },

                        aggregatedDiscountInfoV3: {
                          header: "50% OFF",
                          subHeader: "UPTO ₹100",
                        },

                        
                      },
                     },
                      {
                      info: {
                        id: "123458",
                        name: "Pizza world",
                        cloudinaryImageId:
                          "rng/md/carousel/production/pizza123",
                        locality: "MG Road",
                        areaName: "Central District",
                        costForTwo: "₹400 for two",
                        cuisines: ["Pizza", "Italian", "Fast Food"],
                        avgRating: 4.3,
                        avgRatingString: "4.3",
                        totalRatingsString: "10K+ ratings",
                        veg: false,

                        sla: {
                          deliveryTime: 30,
                          lastMileTravel: 3.5,
                          slaString: "30 mins",
                        },

                        aggregatedDiscountInfoV3: {
                          header: "50% OFF",
                          subHeader: "UPTO ₹100",
                        },

                        
                      },
                     },
                  ],
                },
              },
            },
          },
        },
         
      ],
    },
  },
};
const root=ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Appcontainer/>);